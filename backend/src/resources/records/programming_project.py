from typing import List, Optional
from flask_restful import Resource, reqparse, fields, marshal_with
from datetime import datetime
from src.models.records.record_types.programming_project import ProgrammingProjectModel
from src import db

resource_fields = {
    "id": fields.Integer,
    "name": fields.String,
    "created_at": fields.DateTime,
    "updated_at": fields.DateTime,
    "importance": fields.Integer,
    "deadline": fields.DateTime,
    "used_technologies": fields.String,
    "description": fields.String,
    "extra": fields.String,
}

record_post_args = reqparse.RequestParser()
record_post_args.add_argument(
    "name", type=str, help="Name of the record is required", required=True
)
record_post_args.add_argument(
    "description", type=str, help="Optional description of the record"
)

record_post_args.add_argument("importance", type=int, help="Optional importance")
record_post_args.add_argument(
    "deadline", type=datetime.utcnow, help="Optional deadline"
)
record_post_args.add_argument(
    "used_technologies", type=str, help="Optional technologies used"
)
record_post_args.add_argument("extra", type=str, help="Optional extra")

record_patch_args = reqparse.RequestParser()
record_patch_args.add_argument("name", type=str, help="Optional name of record")
record_patch_args.add_argument(
    "description", type=str, help="Optional description of the record"
)
record_patch_args.add_argument("importance", type=int, help="Optional importance")
record_patch_args.add_argument(
    "deadline", type=datetime.utcnow, help="Optional deadline"
)
record_patch_args.add_argument(
    "used_technologies", type=str, help="Optional technologies used"
)
record_patch_args.add_argument("extra", type=str, help="Optional extra")


class ProgrammingProjectResource(Resource):
    @marshal_with(resource_fields)
    def post(self) -> ProgrammingProjectModel:
        args = record_post_args.parse_args()

        record: ProgrammingProjectModel = ProgrammingProjectModel(
            name=args["name"],
            created_at=datetime.utcnow(),
            updated_at=datetime.utcnow(),
            description=args["description"],
            importance=args["importance"],
            deadline=args["deadline"],
            used_technologies=args["used_technologies"],
            extra=args["extra"],
        )
        db.session.add(record)
        db.session.commit()
        return record, 201

    @marshal_with(resource_fields)
    def get(self, record_id: Optional[int] = None) -> ProgrammingProjectModel:
        result: ProgrammingProjectModel = ProgrammingProjectModel.query.filter_by(
            id=record_id
        ).first_or_404(description="Could not find record with that ID...")
        return result

    @marshal_with(resource_fields)
    def patch(self, record_id: int) -> ProgrammingProjectModel:
        # TODO add record_update_args
        args = record_patch_args.parse_args()
        result: ProgrammingProjectModel = ProgrammingProjectModel.query.filter_by(
            id=record_id
        ).first_or_404(description="Could not find record with that ID...")

        if args["name"]:
            result.name = args["name"]
        if args["description"]:
            result.description = args["description"]
        if args["importance"]:
            result.importance = args["importance"]
        if args["deadline"]:
            result.deadline = args["deadline"]
        if args["used_technologies"]:
            result.used_technologies = args["used_technologies"]
        if args["extra"]:
            result.extra = args["extra"]

        result.updated_at = datetime.utcnow()
        db.session.commit()
        return result

    def delete(self, record_id: int) -> str:
        result: ProgrammingProjectModel = ProgrammingProjectModel.query.filter_by(
            id=record_id
        ).first_or_404(description="Could not find record with that ID...")
        db.session.delete(result)
        db.session.commit()
        return "", 204


class ProgrammingProjectListResource(Resource):
    @marshal_with(resource_fields)
    def get(self) -> List[ProgrammingProjectModel]:
        result: List[ProgrammingProjectModel] = ProgrammingProjectModel.query.all()
        return result
