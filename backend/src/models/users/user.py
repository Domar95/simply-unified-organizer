from typing import Optional
from pydantic import BaseModel, Field
from datetime import datetime, timezone
from sqlalchemy.dialects.postgresql import UUID as pgUUID
from uuid import UUID, uuid4
from werkzeug.security import generate_password_hash, check_password_hash

from src import db


class User(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    uuid = db.Column(pgUUID(as_uuid=True), unique=True, nullable=False, default=uuid4)
    created_at = db.Column(
        db.DateTime, nullable=False, default=datetime.now(timezone.utc)
    )
    updated_at = db.Column(
        db.DateTime, nullable=False, default=datetime.now(timezone.utc)
    )
    username = db.Column(db.String(64), nullable=False, unique=True)
    email = db.Column(db.String(128), nullable=False, unique=True)
    password = db.Column(db.String(256), nullable=False)
    note = db.relationship("Note", backref="user", lazy=True)
    programming_project = db.relationship(
        "ProgrammingProject", backref="user", lazy=True
    )

    def set_password(self, password):
        self.password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)


class UserSchema(BaseModel):
    id: Optional[int] = None
    uuid: UUID = Field(default_factory=uuid4)
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

    username: str
    email: str
    password: str

    class Config:
        from_attributes = True
