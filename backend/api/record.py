from service.record_service import get_all_records, get_record
import json
from flask import jsonify

def get_all_records():
    return get_all_records()


@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route("/records", methods=['GET'])
def records_api():
    # record = get_record()
    # response = jsonify(name = record.name,
    #     importance = record.importance,
    #     description = record.description)
    # response = json.dumps({"result": record}), 200
    records = get_all_records()
    serialized_records = [record.__dict__ for record in records]
    return jsonify(serialized_records)
    # response = [jsonify(name = record.name,
    #         importance = record.importance,
    #         description = record.description) for record in records]
    # response = jsonify(results=record, status_code=200)
    #response.status_code = 200 # or 400 or whatever
    #return response
    # return [
    #     jsonify(
    #     name = record.name,
    #     importance = record.importance,
    #     description = record.description)
    #     for record in records]