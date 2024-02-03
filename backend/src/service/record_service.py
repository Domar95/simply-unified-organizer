from models.record import Record
from models.records.record_types.programming_project import ProgrammingProject

def get_all_records():
    records = [
        Record('1', 'record 1', 5, 'some description'),
        Record('2', 'record 2', 8, 'some description'),
        Record('3', 'record 3', 2, 'some description'),
             ]
    return records

def get_record(id):
    #return record by id
    record = Record('1', 'record 1', 5, 'some description')
    return record

def delete_record(record_type, record_id):
    record_exists = get_record_type(record_type).query

def get_record_type(record_type: str) -> object:
    record_types = {
        'programming_project': ProgrammingProject
    }

    return record_types.get(record_type)