import flask

from typing import List
from flask import request
from flask.views import MethodView
from datetime import datetime, timezone
from flask_jwt_extended import get_jwt_identity, jwt_required
from pydantic import ValidationError

from src.models.users.user import (
    User,
    UserSchema,
)
from src import db


class UserView(MethodView):
    def post(self):
        data = request.get_json()
        data["created_at"] = data["updated_at"] = datetime.now(timezone.utc)

        # Check if user with username already exists
        username = data.get("username")
        user: User = User.query.filter_by(username=username).first()
        if user:
            flask.abort(400, f"User with username '{username}' already exists...")

        # Check if user with email already exists
        email = data.get("email")
        user: User = User.query.filter_by(email=email).first()
        if user:
            flask.abort(400, f"User with email '{email}' already exists...")

        try:
            validated_data = UserSchema(**data)
        except ValidationError as e:
            error_details = e.errors()[0]
            field = error_details["loc"][0]
            error_message = error_details["msg"]
            flask.abort(400, f"Validation error on field '{field}': {error_message}")

        user = User(
            uuid=validated_data.uuid,
            created_at=validated_data.created_at,
            updated_at=validated_data.updated_at,
            username=validated_data.username,
            email=validated_data.email,
        )

        user.set_password(validated_data.password)

        db.session.add(user)
        db.session.commit()

        validated_user = UserSchema.model_validate(user)
        return validated_user.model_dump(), 201

    @jwt_required()
    def get(self):
        current_user_id = get_jwt_identity()
        user: User = User.query.filter_by(id=current_user_id).first_or_404(
            description="User not found"
        )

        validated_user = UserSchema.model_validate(user)
        return validated_user.model_dump()

    @jwt_required()
    def patch(self):
        current_user_id = get_jwt_identity()
        data = request.get_json()

        user: User = User.query.filter_by(id=current_user_id).first_or_404(
            description="User not found"
        )

        updatable_fields = [
            "username",
            "email",
            "password",
        ]

        for field in updatable_fields:
            if field in data:
                if field == "password":
                    user.set_password(data[field])
                else:
                    if field == "username":
                        username = data["username"]
                        existing_user: User = User.query.filter_by(
                            username=username
                        ).first()
                        if existing_user and existing_user.uuid != user.uuid:
                            flask.abort(
                                400,
                                f"User with username '{username}' already exists...",
                            )
                    if field == "email":
                        email = data["email"]
                        existing_user: User = User.query.filter_by(email=email).first()
                        if existing_user and existing_user.uuid != user.uuid:
                            flask.abort(
                                400,
                                f"User with email '{email}' already exists...",
                            )
                    setattr(user, field, data[field])

        user.updated_at = datetime.now(timezone.utc)

        try:
            validated_user = UserSchema.model_validate(user)
        except ValidationError as e:
            error_details = e.errors()[0]
            field = error_details["loc"][0]
            error_message = error_details["msg"]
            flask.abort(400, f"Validation error on field '{field}': {error_message}")

        db.session.commit()

        return validated_user.model_dump()

    # Admin only route
    @jwt_required()
    def delete(self):
        current_user_id = get_jwt_identity()
        user: User = User.query.filter_by(id=current_user_id).first_or_404(
            description="User not found"
        )
        db.session.delete(user)
        db.session.commit()
        return "", 204


# Delete later
class UserListView(MethodView):
    def get(self) -> List[User]:
        users: List[User] = User.query.all()

        serialized_users = [
            UserSchema.model_validate(user).model_dump() for user in users
        ]
        return {"users": serialized_users}


user_view = UserView.as_view("user_view")
user_list_view = UserListView.as_view("user_list_view")
