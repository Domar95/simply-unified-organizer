import flask

from bson import ObjectId, errors
from datetime import datetime, timezone
from flask import request
from flask_restful import Resource
from pydantic import ValidationError
from pymongo import ReturnDocument

from src.db_connections.mongo_db.pymongo_get_database import get_database
from src.models.records.record_types.knowledge import Knowledge

db = get_database()
collection = db["knowledge"]


class KnowledgeResource(Resource):
    def post(self):
        raw_record = request.get_json()
        raw_record["created_at"] = raw_record["updated_at"] = datetime.now(timezone.utc)

        try:
            record = Knowledge(**raw_record)
        except ValidationError as e:
            error_details = e.errors()[0]
            field = error_details["loc"][0]
            error_message = error_details["msg"]
            flask.abort(400, f"Validation error on field '{field}': {error_message}")

        result = collection.insert_one(record.to_bson())
        record.id = ObjectId(str(result.inserted_id))

        return record.to_json(), 201

    def get(self, id: str):
        try:
            object_id = ObjectId(id)
        except (TypeError, errors.InvalidId):
            flask.abort(
                400,
                f"Invalid 'id' format. Must be a valid ObjectId: 24-character hex string",
            )

        result = collection.find_one({"_id": object_id})
        if not result:
            flask.abort(404, f"Record not found: {object_id}")

        return Knowledge(**result).to_json()

    def put(self, id: str):
        try:
            object_id = ObjectId(id)
        except (TypeError, errors.InvalidId):
            flask.abort(
                400,
                f"Invalid 'id' format. Must be a valid ObjectId: 24-character hex string",
            )

        try:
            record = Knowledge(**request.get_json())
        except ValidationError as e:
            error_details = e.errors()[0]
            field = error_details["loc"][0]
            error_message = error_details["msg"]
            flask.abort(400, f"Validation error on field '{field}': {error_message}")

        record.updated_at = datetime.now(timezone.utc)

        updated_doc = collection.find_one_and_update(
            {"_id": object_id},
            {"$set": record.to_bson()},
            return_document=ReturnDocument.AFTER,
        )

        if updated_doc:
            return Knowledge(**updated_doc).to_json()
        else:
            flask.abort(404, f"Record not found: {object_id}")

    def delete(self, id: str):
        try:
            object_id = ObjectId(id)
        except (TypeError, errors.InvalidId):
            flask.abort(
                400,
                f"Invalid 'id' format. Must be a valid ObjectId: 24-character hex string",
            )

        deleted_record = collection.find_one_and_delete(
            {"_id": object_id},
        )

        if deleted_record:
            return Knowledge(**deleted_record).to_json()
        else:
            flask.abort(404, f"Record not found: {object_id}")


class KnowledgeListResource(Resource):
    def get(self):
        results = list(collection.find())
        records = []
        for result in results:
            result["_id"] = str(result["_id"])
            records.append(result)
        return records
