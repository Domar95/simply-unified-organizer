from datetime import datetime, timezone
from flask import abort, request
from flask_jwt_extended import get_jwt_identity, jwt_required
from flask.views import MethodView
from pydantic import ValidationError
from typing import List

from src import db
from src.models.records.record_types.knowledge import Knowledge, KnowledgeSchema


class KnowledgeView(MethodView):
    @jwt_required()
    def post(self):
        data = request.get_json()
        data["created_at"] = data["updated_at"] = datetime.now(timezone.utc)
        data["user_id"] = get_jwt_identity()

        try:
            validated_data = KnowledgeSchema.model_validate(data)
        except ValidationError as e:
            error_details = e.errors()[0]
            field = error_details["loc"][0]
            error_message = error_details["msg"]
            abort(400, f"Validation error on field '{field}': {error_message}")

        record = Knowledge(
            id=validated_data.id,
            user_id=validated_data.user_id,
            name=validated_data.name,
            text=validated_data.text,
            created_at=validated_data.created_at,
            updated_at=validated_data.updated_at,
            importance=validated_data.importance,
            domain=validated_data.domain,
            link=validated_data.link,
            image=validated_data.image,
        )

        db.session.add(record)
        db.session.commit()

        validated_record = KnowledgeSchema.model_validate(record)
        return validated_record.model_dump(), 201

    @jwt_required()
    def get(self, id: str):
        current_user_id = get_jwt_identity()
        record: Knowledge = Knowledge.query.filter_by(
            id=id, user_id=current_user_id
        ).first_or_404(description="Could not find record with that ID...")

        validated_record = KnowledgeSchema.model_validate(record)
        return validated_record.model_dump()

    @jwt_required()
    def patch(self, id: str):
        current_user_id = get_jwt_identity()
        data = request.get_json()

        record: Knowledge = Knowledge.query.filter_by(
            id=id, user_id=current_user_id
        ).first_or_404(description="Could not find record with that ID...")

        updatable_fields = ["name", "text", "importance", "domain", "link", "image"]

        for field in updatable_fields:
            if field in data:
                setattr(record, field, data[field])

        record.updated_at = datetime.now(timezone.utc)

        try:
            validated_record = KnowledgeSchema.model_validate(record)
        except ValidationError as e:
            error_details = e.errors()[0]
            field = error_details["loc"][0]
            error_message = error_details["msg"]
            abort(400, f"Validation error on field '{field}': {error_message}")

        db.session.commit()

        return validated_record.model_dump()

    @jwt_required()
    def delete(self, id: str):
        current_user_id = get_jwt_identity()
        record: Knowledge = Knowledge.query.filter_by(
            id=id, user_id=current_user_id
        ).first_or_404(description="Could not find record with that ID...")

        db.session.delete(record)
        db.session.commit()

        return "", 204


class KnowledgeListView(MethodView):
    @jwt_required()
    def get(self):
        current_user_id = get_jwt_identity()
        records: List[Knowledge] = Knowledge.query.filter_by(
            user_id=current_user_id
        ).all()

        serialized_records = [
            KnowledgeSchema.model_validate(record).model_dump() for record in records
        ]
        return {"records": serialized_records}


knowledge_view = KnowledgeView.as_view("knowledge_view")
knowledge_list_view = KnowledgeListView.as_view("knowledge_list_view")
