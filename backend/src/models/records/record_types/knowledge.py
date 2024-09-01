from bson import ObjectId
from datetime import datetime
from pydantic import BaseModel, ConfigDict, Field
from typing import Optional


class Knowledge(BaseModel):
    model_config = ConfigDict(arbitrary_types_allowed=True)

    id: Optional[ObjectId] = Field(None, alias="_id")
    category_id: int
    name: str
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

    importance: int
    domain: str
    link: str
    image: str

    def to_json(self):
        data = self.model_dump()
        data["created_at"] = data["created_at"].isoformat()
        data["updated_at"] = data["updated_at"].isoformat()
        data["id"] = str(data["id"])
        return data

    def to_bson(self):
        data = self.model_dump(by_alias=True, exclude_none=True)
        return data
