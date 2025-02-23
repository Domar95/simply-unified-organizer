from src import db
from abc import abstractmethod
from datetime import datetime, timezone
from sqlalchemy.dialects.postgresql import UUID
from uuid import uuid4


class BaseRecord(db.Model):
    __abstract__ = True

    id = db.Column(
        UUID(as_uuid=True), primary_key=True, unique=True, nullable=False, default=uuid4
    )
    user_id = db.Column(UUID(as_uuid=True), db.ForeignKey("users.id"), nullable=False)
    name = db.Column(db.Text, nullable=False)
    text = db.Column(db.Text)
    created_at = db.Column(
        db.DateTime, nullable=False, default=datetime.now(timezone.utc)
    )
    updated_at = db.Column(
        db.DateTime, nullable=False, default=datetime.now(timezone.utc)
    )

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
