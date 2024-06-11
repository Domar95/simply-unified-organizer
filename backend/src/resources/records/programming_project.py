from flask_restful import Resource, reqparse, fields, marshal_with
from datetime import datetime
from src.models.records.record_types.programming_project import ProgrammingProjectModel
from src import db
from src.resources.utils import abort_if_category_id_is_invalid

resource_fields = {
    "id": fields.Integer,
    "name": fields.String,
    "created_at": fields.DateTime,
    "updated_at": fields.DateTime,
    "category_id": fields.Integer,
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

record_post_args.add_argument(
    "category_id", type=int, help="ID of associated category is required", required=True
)

record_post_args.add_argument("importance", type=int, help="Optional importance")
record_post_args.add_argument(
    "deadline", type=datetime.utcnow, help="Optional deadline"
)
record_post_args.add_argument(
    "used_technologies", type=str, help="Optional technologies used"
)
record_post_args.add_argument("extra", type=str, help="Optional extra")

class ProgrammingProjectResource(Resource):
    @marshal_with(resource_fields)
    def post(self):
        args = record_post_args.parse_args()

        abort_if_category_id_is_invalid(args["category_id"])

        record: ProgrammingProjectModel = ProgrammingProjectModel(
            name=args["name"],
            created_at=datetime.utcnow(),
            updated_at=datetime.utcnow(),
            description=args["description"],
            category_id=args["category_id"],
            importance=args["importance"],
            deadline=args["deadline"],
            used_technologies=args["used_technologies"],
            extra=args["extra"],
        )
        db.session.add(record)
        db.session.commit()
        return record, 201

    @marshal_with(resource_fields)
    def get(self, record_id: int):
        result: ProgrammingProjectModel = ProgrammingProjectModel.query.filter_by(
            id=record_id
        ).first_or_404(description="Could not find record with that ID...")
        return result

    @marshal_with(resource_fields)
    def patch(self, record_id: int):
        args = record_update_args.parse_args()
        result: ProgrammingProjectModel = ProgrammingProjectModel.query.filter_by(
            id=record_id
        ).first_or_404(description="Could not find record with that ID...")

        abort_if_category_id_is_invalid(args["category_id"])

        if args["name"]:
            result.name = args["name"]
        if args["description"]:
            result.description = args["description"]
        if args["category_id"]:
            result.category_id = args["category_id"]
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

    def delete(self, record_id: int):
        result: ProgrammingProjectModel = ProgrammingProjectModel.query.filter_by(
            id=record_id
        ).first_or_404(description="Could not find record with that ID...")
        db.session.delete(result)
        db.session.commit()
        return "", 204
