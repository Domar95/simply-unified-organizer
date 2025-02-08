from src import db
from abc import abstractmethod
from datetime import datetime
from sqlalchemy.dialects.postgresql import UUID
from uuid import uuid4


class BaseRecord(db.Model):
    __abstract__ = True

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    uuid = db.Column(UUID(as_uuid=True), unique=True, nullable=False, default=uuid4)
    name = db.Column(db.String(100), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    @abstractmethod
    def __str__(self):
        """
        User-friendly representation of record
        """
        pass

    @abstractmethod
    def __repr__(self):
        """
        Developer-friendly representation of record
        """
        pass
