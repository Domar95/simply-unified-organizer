import { RecordsTableColumns } from '../models/records-table.model';

export const columns: { [key in string]: RecordsTableColumns } = {
  'programming-project': [
    { key: 'id', label: 'Id' },
    { key: 'name', label: 'Name' },
    { key: 'text', label: 'Text' },
    { key: 'created_at', label: 'Created At' },
    { key: 'updated_at', label: 'Updated At' },
    { key: 'importance', label: 'Importance' },
    { key: 'deadline', label: 'Deadline' },
    { key: 'used_technologies', label: 'Used Technologies' },
    { key: 'description', label: 'Description' },
    { key: 'extra', label: 'Extra' },
  ],
  knowledge: [
    { key: 'id', label: 'Id' },
    { key: 'name', label: 'Name' },
    { key: 'text', label: 'Text' },
    { key: 'created_at', label: 'Created At' },
    { key: 'updated_at', label: 'Updated At' },
    { key: 'importance', label: 'Importance' },
    { key: 'domain', label: 'Domain' },
    { key: 'link', label: 'Link' },
    { key: 'image', label: 'Image' },
  ],
  note: [
    { key: 'id', label: 'Id' },
    { key: 'name', label: 'Name' },
    { key: 'text', label: 'Text' },
    { key: 'created_at', label: 'Created At' },
    { key: 'updated_at', label: 'Updated At' },
    { key: 'description', label: 'Description' },
    { key: 'importance', label: 'Importance' },
    { key: 'type', label: 'Type' },
    { key: 'link', label: 'Link' },
  ],
};
