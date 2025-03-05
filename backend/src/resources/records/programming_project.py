from datetime import datetime, timezone
from flask import abort, request
from flask_jwt_extended import get_jwt_identity, jwt_required
from flask.views import MethodView
from pydantic import ValidationError
from typing import List

from src import db
from src.models.records.record_types.programming_project import (
    ProgrammingProject,
    ProgrammingProjectSchema,
)


class ProgrammingProjectView(MethodView):
    @jwt_required()
    def post(self):
        data = request.get_json()
        data["created_at"] = data["updated_at"] = datetime.now(timezone.utc)
        data["user_id"] = get_jwt_identity()

        try:
            validated_data = ProgrammingProjectSchema.model_validate(data)
        except ValidationError as e:
            error_details = e.errors()[0]
            field = error_details["loc"][0]
            error_message = error_details["msg"]
            abort(400, f"Validation error on field '{field}': {error_message}")

        record = ProgrammingProject(
            id=validated_data.id,
            user_id=validated_data.user_id,
            name=validated_data.name,
            text=validated_data.text,
            created_at=validated_data.created_at,
            updated_at=validated_data.updated_at,
            description=validated_data.description,
            importance=validated_data.importance,
            deadline=validated_data.deadline,
            used_technologies=validated_data.used_technologies,
            extra=validated_data.extra,
        )

        db.session.add(record)
        db.session.commit()

        validated_record = ProgrammingProjectSchema.model_validate(record)
        return validated_record.model_dump(), 201

    @jwt_required()
    def get(self, id: str):
        current_user_id = get_jwt_identity()
        record: ProgrammingProject = ProgrammingProject.query.filter_by(
            id=id, user_id=current_user_id
        ).first_or_404(description="Could not find record with that ID...")

        validated_record = ProgrammingProjectSchema.model_validate(record)
        return validated_record.model_dump()

    @jwt_required()
    def patch(self, id: str):
        current_user_id = get_jwt_identity()
        data = request.get_json()

        record: ProgrammingProject = ProgrammingProject.query.filter_by(
            id=id, user_id=current_user_id
        ).first_or_404(description="Could not find record with that ID...")

        updatable_fields = [
            "name",
            "text",
            "description",
            "importance",
            "deadline",
            "used_technologies",
            "extra",
        ]

        for field in updatable_fields:
            if field in data:
                setattr(record, field, data[field])

        record.updated_at = datetime.now(timezone.utc)

        try:
            validated_record = ProgrammingProjectSchema.model_validate(record)
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
        record: ProgrammingProject = ProgrammingProject.query.filter_by(
            id=id, user_id=current_user_id
        ).first_or_404(description="Could not find record with that ID...")

        db.session.delete(record)
        db.session.commit()

        return "", 204


class ProgrammingProjectListView(MethodView):
    @jwt_required()
    def get(self):
        current_user_id = get_jwt_identity()
        records: List[ProgrammingProject] = ProgrammingProject.query.filter_by(
            user_id=current_user_id
        ).all()

        serialized_records = [
            ProgrammingProjectSchema.model_validate(record).model_dump()
            for record in records
        ]
        return {"records": serialized_records}


programming_project_view = ProgrammingProjectView.as_view("programming_project_view")
programming_project_list_view = ProgrammingProjectListView.as_view(
    "programming_project_list_view"
)
