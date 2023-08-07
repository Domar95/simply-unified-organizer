from flask import Flask

app = Flask(__name__)

# run with 'flask run' from backend folder

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"