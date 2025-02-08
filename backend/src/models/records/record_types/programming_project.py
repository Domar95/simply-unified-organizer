from src.models.records.base_record import BaseRecord
from src import db
from datetime import datetime
from pydantic import BaseModel, Field
from typing import Optional
from uuid import UUID, uuid4


class ProgrammingProject(BaseRecord):
    __tablename__ = "programming_project"

    importance = db.Column(db.Integer)
    deadline = db.Column(db.DateTime)
    used_technologies = db.Column(db.Text)
    description = db.Column(db.Text)
    extra = db.Column(db.Text)


class ProgrammingProjectSchema(BaseModel):
    id: Optional[int] = None
    uuid: UUID = Field(default_factory=uuid4)
    name: str
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

    importance: Optional[int] = None
    deadline: Optional[datetime] = None
    used_technologies: Optional[str] = None
    description: Optional[str] = None
    extra: Optional[str] = None

    class Config:
        from_attributes = True
