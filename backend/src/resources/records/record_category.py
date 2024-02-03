from datetime import datetime
from flask_restful import Resource, reqparse, abort, fields, marshal_with
from src.models.records.record_category import RecordCategoryModel
from src import db

resource_fields = {
    "id": fields.Integer,
    "name": fields.String,
    "created_at": fields.DateTime,
    "updated_at": fields.DateTime,
    "description": fields.String,
}

category_post_args = reqparse.RequestParser()
category_post_args.add_argument(
    "name", type=str, help="Name of the category is required", required=True
)
category_post_args.add_argument(
    "description", type=str, help="Optional description of the category"
)

category_update_args = reqparse.RequestParser()
category_update_args.add_argument("name", type=str, help="Name of the category")
category_update_args.add_argument(
    "description", type=str, help="Optional description of the category"
)


class RecordCategoryResource(Resource):
    @marshal_with(resource_fields)
    def post(self, category_id: str):
        args = category_post_args.parse_args()
        result: RecordCategoryModel = RecordCategoryModel.query.filter_by(
            id=category_id
        ).first()
        if result:
            abort(409, message="Category with that ID already exists...")

        category: RecordCategoryModel = RecordCategoryModel(
            id=category_id,
            name=args["name"],
            created_at=datetime.utcnow(),
            updated_at=datetime.utcnow(),
            description=args["description"],
        )
        db.session.add(category)
        db.session.commit()
        return category, 201

    @marshal_with(resource_fields)
    def get(self, category_id: str):
        result: RecordCategoryModel = RecordCategoryModel.query.filter_by(
            id=category_id
        ).first_or_404(description="Could not find category with that ID...")
        return result

    @marshal_with(resource_fields)
    def patch(self, category_id: str):
        args = category_update_args.parse_args()
        result: RecordCategoryModel = RecordCategoryModel.query.filter_by(
            id=category_id
        ).first_or_404(description="Could not find category with that ID...")

        if args["name"]:
            result.name = args["name"]
        if args["description"]:
            result.description = args["description"]

        result.updated_at = datetime.utcnow()
        db.session.commit()
        return result

    def delete(self, category_id: str):
        result: RecordCategoryModel = RecordCategoryModel.query.filter_by(
            id=category_id
        ).first_or_404(description="Could not find category with that ID...")
        db.session.delete(result)
        db.session.commit()
        return "", 204
