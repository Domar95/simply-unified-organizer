import logging

from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


def create_app(env=None) -> Flask:
    from src.config.config import config_by_name

    app = Flask(__name__)
    app.config.from_object(config_by_name[env or "test"])

    jwt = JWTManager(app)

    register_blueprints(app)

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


def register_blueprints(app: Flask) -> None:
    from src.resources.records.records_blueprint import records_bp

    app.register_blueprint(records_bp)

    from src.resources.users.users_blueprint import users_bp

    app.register_blueprint(users_bp)
