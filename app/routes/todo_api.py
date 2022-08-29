import datetime
from bson import ObjectId
from flask import Blueprint, request, jsonify
from app.helpers.response_maker import response_maker
from app.models.todo import Todo


todo_api = Blueprint("todo_api", __name__, template_folder="template")


@todo_api.route('/get_todo', methods=["POST"])
def get_todo():
    try:
        result = list()
        for todo in Todo.objects:
            result.append({"text": todo.text, "todo_id": str(todo._id)})
        print(result)
        return response_maker({"message": "Todo created successfully", "data": result}, 200)
    except Exception as e:
        print(e)
        return response_maker({"message": "Internal server error"}, 500)


@todo_api.route('/create', methods=["POST"])
def create():
    try:
        req = request.get_json()
        payload = {
            "text": req['text'],
            "createdAt": datetime.datetime.now(),
            "updatedAt": datetime.datetime.now(),
        }
        todo = Todo(**payload)
        todo.save()
        return response_maker({"message": "Todo created successfully"}, 201)
    except Exception as e:
        print(e)
        return response_maker({"message": "Internal server error"}, 500)


@todo_api.route('/update', methods=["POST"])
def update():
    try:
        req = request.get_json()
        payload = {
            "text": req['text'],
            "updatedAt": datetime.datetime.now()
        }
        todo = Todo.objects(_id=ObjectId(req['todo_id']))
        todo.update(**payload)
        return response_maker({"message": "Todo updated successfully"}, 201)
    except Exception as e:
        print(e)
        return response_maker({"message": "Internal server error"}, 500)


@todo_api.route('/delete', methods=["POST"])
def delete():
    try:
        req = request.get_json()
        todo = Todo.objects(_id=ObjectId(req['todo_id']))
        todo.delete()
        return response_maker({"message": "Todo delete successfully"}, 201)
    except Exception as e:
        print(e)
        return response_maker({"message": "Internal server error"}, 500)


@todo_api.route('/delete-all', methods=["POST"])
def delete_all():
    try:
        payload = {}
        todo = Todo.objects(**payload)
        todo.delete()
        return response_maker({"message": "All todo delete successfully"}, 201)
    except Exception as e:
        print(e)
        return response_maker({"message": "Internal server error"}, 500)
