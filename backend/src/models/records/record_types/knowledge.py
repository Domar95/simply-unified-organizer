from bson import Binary, ObjectId
from datetime import datetime
from pydantic import BaseModel, ConfigDict, Field
from typing import Optional
from uuid import UUID, uuid4


class Knowledge(BaseModel):
    model_config = ConfigDict(arbitrary_types_allowed=True)

    id: Optional[ObjectId] = Field(None, alias="_id")
    uuid: UUID = Field(default_factory=uuid4)
    name: str
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

    importance: Optional[int] = None
    domain: Optional[str] = None
    link: Optional[str] = None
    image: Optional[str] = None

    def to_json(self):
        data = self.model_dump()
        data["created_at"] = data["created_at"].isoformat()
        data["updated_at"] = data["updated_at"].isoformat()
        data["id"] = str(data["id"])
        return data

    def to_bson(self):
        data = self.model_dump(by_alias=True, exclude_none=True)
        if "uuid" in data and isinstance(data["uuid"], UUID):
            # Convert the UUID to a BSON Binary with the STANDARD representation
            data["uuid"] = Binary.from_uuid(data["uuid"])
        return data
