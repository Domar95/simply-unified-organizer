from flask import request
from flask.views import MethodView
from flask_jwt_extended import create_access_token

from src.models.users.user import (
    User,
    UserSchema,
)


class UserLogin(MethodView):
    def post(self):
        data = request.get_json()
        if not data or "username" not in data or "password" not in data:
            return {"error": "Missing username or password"}, 400

        username = data.get("username")
        password = data.get("password")

        user: User = User.query.filter_by(username=username).first()
        if not user or not user.check_password(password):
            return {"error": "Invalid credentials"}, 401

        validated_user = UserSchema.model_validate(user)
        access_token = create_access_token(identity=user.id)
        return {"access_token": access_token, "user": validated_user.model_dump()}


user_login_view = UserLogin.as_view("user_login_view")
