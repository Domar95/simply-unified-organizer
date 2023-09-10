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

class ProgrammingProject(db.Model):
    
    __tablename__ = "programming_project"
    
    id = db.Column(db.Integer, primary_key=True)
    category_id = db.Column(db.Integer, db.ForeignKey('record_category.id'), nullable=False)
    name = db.Column(db.String(100), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
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