from flask import Blueprint

from src.resources.users.user import (
    user_view,
)
from src.resources.users.user_login import (
    user_login_view,
)

users_bp = Blueprint("users", __name__, url_prefix="/users")


users_bp.add_url_rule(
    "",
    view_func=user_view,
    methods=["POST", "GET", "PATCH", "DELETE"],
)

users_bp.add_url_rule(
    "/login",
    view_func=user_login_view,
    methods=["POST"],
)
