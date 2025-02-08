import logging
import os

from dotenv import load_dotenv
from flask import Flask
from flask_cors import CORS
from flask_marshmallow import Marshmallow
from flask_restful import Resource, Api
from flask_sqlalchemy import SQLAlchemy

load_dotenv()

db = SQLAlchemy()
ma = Marshmallow()


def create_app() -> Flask:
    app = Flask(__name__)
    app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("local_db_uri")

    api = Api(app)
    add_resources(api, app)

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

    # create_api(app)

    return app


def add_resources(api: Api, app: Flask) -> None:
    from src.resources.records.programming_project import (
        programming_project_view,
        programming_project_list_view,
    )

    app.add_url_rule(
        "/records/programming-project/<int:id>",
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
