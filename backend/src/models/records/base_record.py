from src import db
from abc import abstractmethod
from datetime import datetime


class BaseRecord(db.Model):
    __abstract__ = True

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
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
