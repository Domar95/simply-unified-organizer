import flask

from typing import List
from flask import request
from flask.views import MethodView
from datetime import datetime, timezone
from pydantic import ValidationError

from src.models.records.record_types.programming_project import (
    ProgrammingProject,
    ProgrammingProjectSchema,
)
from src import db


class ProgrammingProjectView(MethodView):
    def post(self) -> ProgrammingProject:
        data = request.get_json()
        data["created_at"] = data["updated_at"] = datetime.now(timezone.utc)

        try:
            validated_data = ProgrammingProjectSchema(**data)
        except ValidationError as e:
            error_details = e.errors()[0]
            field = error_details["loc"][0]
            error_message = error_details["msg"]
            flask.abort(400, f"Validation error on field '{field}': {error_message}")

        record = ProgrammingProject(
            uuid=validated_data.uuid,
            name=validated_data.name,
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

    def get(self, uuid: str) -> ProgrammingProject:
        record: ProgrammingProject = ProgrammingProject.query.filter_by(
            uuid=uuid
        ).first_or_404(description="Could not find record with that ID...")

        validated_record = ProgrammingProjectSchema.model_validate(record)
        return validated_record.model_dump()

    def patch(self, uuid: str) -> ProgrammingProject:
        data = request.get_json()

        record: ProgrammingProject = ProgrammingProject.query.filter_by(
            uuid=uuid
        ).first_or_404(description="Could not find record with that ID...")

        updatable_fields = [
            "name",
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
            flask.abort(400, f"Validation error on field '{field}': {error_message}")

        db.session.commit()

        return validated_record.model_dump()

    def delete(self, uuid: str) -> str:
        record: ProgrammingProject = ProgrammingProject.query.filter_by(
            uuid=uuid
        ).first_or_404(description="Could not find record with that ID...")
        db.session.delete(record)
        db.session.commit()
        return "", 204


class ProgrammingProjectListView(MethodView):
    def get(self) -> List[ProgrammingProject]:
        records: List[ProgrammingProject] = ProgrammingProject.query.all()

        serialized_records = [
            ProgrammingProjectSchema.model_validate(record).model_dump()
            for record in records
        ]
        return serialized_records


programming_project_view = ProgrammingProjectView.as_view("programming_project_view")
programming_project_list_view = ProgrammingProjectListView.as_view(
    "programming_project_list_view"
)
