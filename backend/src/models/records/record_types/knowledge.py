from datetime import datetime
from pydantic import BaseModel, Field
from typing import Optional
from uuid import UUID, uuid4

from src.models.records.base_record import BaseRecord
from src import db


class Knowledge(BaseRecord):
    __tablename__ = "knowledge"

    importance = db.Column(db.Integer)
    domain = db.Column(db.Text)
    link = db.Column(db.Text)
    image = db.Column(db.Text)


class KnowledgeSchema(BaseModel):
    id: UUID = Field(default_factory=uuid4)
    user_id: UUID
    name: str
    text: Optional[str] = None
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

    importance: Optional[int] = None
    domain: Optional[str] = None
    link: Optional[str] = None
    image: Optional[str] = None

    class Config:
        from_attributes = True
