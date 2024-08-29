import logging
import os

from dotenv import load_dotenv
from flask import Flask
from flask_cors import CORS
from flask_marshmallow import Marshmallow
from flask_restful import Resource, Api
from flask_sqlalchemy import SQLAlchemy

load_dotenv()

app = Flask(__name__)

app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("local_db_uri")

api = Api(app)
db = SQLAlchemy()
ma = Marshmallow(app)

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

# run with 'flask run' from backend folder

from src.models.records.record_category import RecordCategoryModel
from src.models.records.record_types.programming_project import ProgrammingProjectModel
from src.resources.records.record_category import RecordCategoryResource
from src.resources.records.programming_project import (
    ProgrammingProjectResource,
    ProgrammingProjectListResource,
)


api.add_resource(RecordCategoryResource, "/category", "/category/<int:category_id>")

api.add_resource(
    ProgrammingProjectListResource,
    "/category/programming-project/records",
)
api.add_resource(
    ProgrammingProjectResource,
    "/category/programming-project/records",
    "/category/programming-project/records/<int:record_id>",
)
