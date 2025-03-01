import os

from typing import List, Type
from dotenv import load_dotenv

load_dotenv()


class BaseConfig(object):
    CONFIG_NAME = "base"
    DEBUG = False
    TESTING = False
    SQLALCHEMY_TRACK_MODIFICATIONS = False


class DevelopmentConfig(BaseConfig):
    CONFIG_NAME = "dev"
    DEBUG = True
    TESTING = False
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    JWT_SECRET_KEY = os.getenv("jwt_secret_key")
    SQLALCHEMY_DATABASE_URI = os.getenv("local_db_uri")


class TestingConfig(BaseConfig):
    CONFIG_NAME = "test"
    DEBUG = True
    TESTING = True
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    JWT_SECRET_KEY = os.getenv("jwt_secret_key")
    SQLALCHEMY_DATABASE_URI = os.getenv("local_db_uri")


class ProductionConfig(BaseConfig):
    CONFIG_NAME = "prod"
    DEBUG = False
    TESTING = False
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    JWT_SECRET_KEY = os.getenv("jwt_secret_key")
    SQLALCHEMY_DATABASE_URI = os.getenv("local_db_uri")


EXPORT_CONFIGS: List[Type[BaseConfig]] = [
    DevelopmentConfig,
    TestingConfig,
    ProductionConfig,
]

config_by_name = {cfg.CONFIG_NAME: cfg for cfg in EXPORT_CONFIGS}
