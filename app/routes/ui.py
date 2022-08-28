from flask import render_template, Blueprint

ui_blueprint = Blueprint('ui_blueprint', __name__, template_folder="template")


@ui_blueprint.route("/todo", methods=["GET"])
def todo():
    return render_template("todo/todo.html")
