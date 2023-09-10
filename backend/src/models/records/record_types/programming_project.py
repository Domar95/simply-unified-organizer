from src.models.records.base_record import BaseRecord
from src import db, ma
from datetime import datetime
'''
# ABC
id 
category_id
name
created_at
updated_at
'''

class ProgrammingProject(BaseRecord):
    
    __tablename__ = "programming_project"
    
    importance = db.Column(db.Integer)
    deadline = db.Column(db.DateTime)
    used_technologies  = db.Column(db.Text)
    description = db.Column(db.Text)
    extra = db.Column(db.Text)
    

class ProgrammingProjectSchema(ma.Schema):
    class Meta:
        fields = ('id', 'category_id', 'name', 'created_at', 'updated_at', 'importance', 'deadline', 'used_technologies', 'description', 'extra')   

if __name__ == '__main__':
    pass