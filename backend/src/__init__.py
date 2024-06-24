from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
import os
from dotenv import load_dotenv
from flask_marshmallow import Marshmallow
from flask_restful import Resource, Api

load_dotenv()

app = Flask(__name__)

app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("local_db_uri")

api = Api(app)
db = SQLAlchemy()
ma = Marshmallow(app)

db.init_app(app)

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

with app.app_context():
    db.create_all()


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
