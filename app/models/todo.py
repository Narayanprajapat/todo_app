from mongoengine import Document, StringField, DateTimeField, ObjectIdField
from .db_connect import connect


class Todo(Document):
    _id = ObjectIdField()
    text = StringField(required=True)
    createdAt = DateTimeField()
    updatedAt = DateTimeField()
