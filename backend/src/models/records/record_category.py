from src import db, ma
from datetime import datetime


class RecordCategoryModel(db.Model):
    __tablename__ = "record_category"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    description = db.Column(db.Text)

    def __str__(self):
        """
        User-friendly representation of category
        """
        return f"Category {self.name}"

    def __repr__(self):
        """
        Developer-friendly representation of category
        """
        return (
            f"Type: {self.__tablename__}, id: {self.id}, created at {self.created_at}"
        )


class RecordCategorySchema(ma.Schema):
    class Meta:
        fields = ("id", "name", "created_at", "updated_at", "description")
