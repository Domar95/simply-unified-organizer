from datetime import datetime
from pydantic import BaseModel, Field
from typing import Optional
from uuid import UUID, uuid4

from src.models.records.base_record import BaseRecord
from src import db


class Note(BaseRecord):
    __tablename__ = "note"

    description = db.Column(db.Text)
    importance = db.Column(db.Integer)
    type = db.Column(db.Text)
    link = db.Column(db.Text)


class NoteSchema(BaseModel):
    id: Optional[int] = None
    uuid: UUID = Field(default_factory=uuid4)
    name: str
    text: Optional[str] = None
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

    description: Optional[str] = None
    importance: Optional[int] = None
    type: Optional[str] = None
    link: Optional[str] = None

    class Config:
        from_attributes = True
