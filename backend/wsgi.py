from flask import Flask, jsonify

app = Flask(__name__)

# run with 'flask run' from backend folder

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

class Record():

    def __init__(self, id, name, importance, description):
        self.id = id, #UUID
        self.name = name
        self.importance = importance
        self.description = description


def get_all_records():
    records = [
        Record('1', 'record 1', 5, 'some description'),
        Record('2', 'record 2', 8, 'some description'),
        Record('3', 'record 3', 2, 'some description'),
             ]
    return records

def get_record():
    record = Record('1', 'record 1', 5, 'some description')
    return record

@app.route("/records")
def records_api():
    record = get_record()
    response = jsonify(name = record.name,
            importance = record.importance,
            description = record.description)
    records = get_all_records()
    response = [jsonify(name = record.name,
            importance = record.importance,
            description = record.description) for record in records]
    response = jsonify(results=records, status_code=200)
    #response.status_code = 200 # or 400 or whatever
    return response
    # return [
    #     jsonify(
    #     name = record.name,
    #     importance = record.importance,
    #     description = record.description)
    #     for record in records]