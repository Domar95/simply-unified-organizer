import os
from pymongo import MongoClient


def get_database():
    CONNECTION_STRING = os.getenv("mongo_db_uri")

    # Create a new client and connect to the server
    client = MongoClient(CONNECTION_STRING)

    return client["records"]
