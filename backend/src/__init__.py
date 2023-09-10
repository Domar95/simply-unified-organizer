from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
import os
from dotenv import load_dotenv

load_dotenv()

db = SQLAlchemy()

app = Flask(__name__)

app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("local_db_uri")

db.init_app(app)

#to solve the error related to the Cross-Origin Resource Sharing (CORS) policy implemented by web browsers to ensure security when making requests from one domain (origin) to another
CORS(app)


# run with 'flask run' from backend folder