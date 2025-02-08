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
    add_resources(api)

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


def add_resources(api: Api) -> None:
    from src.models.records.record_types.programming_project import (
        ProgrammingProjectModel,
    )
    from src.models.records.record_types.knowledge import Knowledge

    from src.resources.records.programming_project import (
        ProgrammingProjectResource,
        ProgrammingProjectListResource,
    )
    from src.resources.records.knowledge import KnowledgeResource, KnowledgeListResource

    api.add_resource(
        ProgrammingProjectListResource,
        "/records/programming-project",
    )
    api.add_resource(
        ProgrammingProjectResource,
        "/records/programming-project",
        "/records/programming-project/<int:record_id>",
    )

    api.add_resource(
        KnowledgeListResource,
        "/records/knowledge",
    )
    api.add_resource(
        KnowledgeResource,
        "/records/knowledge",
        "/records/knowledge/<id>",
    )
