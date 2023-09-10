from src import db, ma
from datetime import datetime

class RecordCategory(db.Model):
    
    __tablename__ = "record_category"
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    description = db.Column(db.Text)
    programming_projects = db.relationship('programming_project', backref='record_category', lazy=True)
    
    def __str__(self):
        """
        User-friendly representation of category
        """
        pass

    def __repr__(self):
        """
        Developer-friendly representation of category
        """
        pass
    
class RecordCategorySchema(ma.Schema):
    class Meta:
        fields = ('id', 'name', 'created_at', 'updated_at', 'description')