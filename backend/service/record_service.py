from models.record import Record

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
