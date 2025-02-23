from flask import jsonify, request
from flask.views import MethodView
from flask_jwt_extended import create_access_token

from src.models.users.user import (
    User,
)


class UserLogin(MethodView):
    def post(self):
        data = request.get_json()
        username = data.get("username")
        password = data.get("password")

        user: User = User.query.filter_by(username=username).first()
        if user and user.check_password(password):
            access_token = create_access_token(identity=user.id)
            return jsonify(access_token=access_token)

        return jsonify({"error": "Invalid credentials"}), 401


user_login_view = UserLogin.as_view("user_login_view")
