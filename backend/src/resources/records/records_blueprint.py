from flask import Blueprint

from src.resources.records.knowledge import knowledge_view, knowledge_list_view
from src.resources.records.note import note_view, note_list_view
from src.resources.records.programming_project import (
    programming_project_view,
    programming_project_list_view,
)

records_bp = Blueprint("records", __name__, url_prefix="/records")


# Knowledge routes
records_bp.add_url_rule(
    "/knowledge/<string:id>",
    view_func=knowledge_view,
    methods=["GET", "PATCH", "DELETE"],
)
records_bp.add_url_rule(
    "/knowledge",
    view_func=knowledge_view,
    methods=["POST"],
)
records_bp.add_url_rule(
    "/knowledge",
    view_func=knowledge_list_view,
    methods=["GET"],
)


# Note routes
records_bp.add_url_rule(
    "/note/<string:id>",
    view_func=note_view,
    methods=["GET", "PATCH", "DELETE"],
)
records_bp.add_url_rule(
    "/note",
    view_func=note_view,
    methods=["POST"],
)
records_bp.add_url_rule(
    "/note",
    view_func=note_list_view,
    methods=["GET"],
)


# Programming project routes
records_bp.add_url_rule(
    "/programming-project/<string:id>",
    view_func=programming_project_view,
    methods=["GET", "PATCH", "DELETE"],
)
records_bp.add_url_rule(
    "/programming-project",
    view_func=programming_project_view,
    methods=["POST"],
)
records_bp.add_url_rule(
    "/programming-project",
    view_func=programming_project_list_view,
    methods=["GET"],
)
