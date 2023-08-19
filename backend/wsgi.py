from flask import Flask
from flask_cors import CORS

app = Flask(__name__)

#to solve the error related to the Cross-Origin Resource Sharing (CORS) policy implemented by web browsers to ensure security when making requests from one domain (origin) to another
CORS(app)


# run with 'flask run' from backend folder