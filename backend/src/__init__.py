import logging
import os

from dotenv import load_dotenv
from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

load_dotenv()

db = SQLAlchemy()


def create_app() -> Flask:
    app = Flask(__name__)
    app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("local_db_uri")

    add_resources(app)

    # Initialize logging
    logging.basicConfig(level=logging.INFO)
    logger = logging.getLogger(__name__)

    try:
        db.init_app(app)
        with app.app_context():
            db.create_all()
        logger.info("Database connected and tables created successfully.")
    except Exception as e:
        logger.error(f"Failed to connect to the database: {e}")

    # to solve the error related to the Cross-Origin Resource Sharing (CORS) policy implemented by web browsers to ensure security when making requests from one domain (origin) to another
    CORS(app)

    return app


def add_resources(app: Flask) -> None:
    from src.resources.records.programming_project import (
        programming_project_view,
        programming_project_list_view,
    )

    app.add_url_rule(
        "/records/programming-project/<string:uuid>",
        view_func=programming_project_view,
        methods=["GET", "PATCH", "DELETE"],
    )
    app.add_url_rule(
        "/records/programming-project",
        view_func=programming_project_view,
        methods=["POST"],
    )
    app.add_url_rule(
        "/records/programming-project",
        view_func=programming_project_list_view,
        methods=["GET"],
    )

    from src.resources.records.knowledge import knowledge_view, knowledge_list_view

    # TODO: update to use uuid once migrated to postgres
    app.add_url_rule(
        "/records/knowledge/<string:id>",
        view_func=knowledge_view,
        methods=["GET", "PUT", "DELETE"],
    )
    app.add_url_rule(
        "/records/knowledge",
        view_func=knowledge_view,
        methods=["POST"],
    )
    app.add_url_rule(
        "/records/knowledge",
        view_func=knowledge_list_view,
        methods=["GET"],
    )

    from src.resources.records.note import note_view, note_list_view

    app.add_url_rule(
        "/records/note/<string:uuid>",
        view_func=note_view,
        methods=["GET", "PATCH", "DELETE"],
    )
    app.add_url_rule(
        "/records/note",
        view_func=note_view,
        methods=["POST"],
    )
    app.add_url_rule(
        "/records/note",
        view_func=note_list_view,
        methods=["GET"],
    )

    from src.resources.users.user import (
        user_view,
        user_list_view,
    )

    app.add_url_rule(
        "/users/<string:uuid>",
        view_func=user_view,
        methods=["GET", "PATCH", "DELETE"],
    )
    app.add_url_rule(
        "/users",
        view_func=user_view,
        methods=["POST"],
    )
    app.add_url_rule(
        "/users",
        view_func=user_list_view,
        methods=["GET"],
    )
