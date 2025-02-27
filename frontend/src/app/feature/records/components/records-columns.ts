import { RecordsTableColumns } from '../models/records-table.model';

const defaultColumns: RecordsTableColumns = [
  { key: 'name', label: 'Name' },
  { key: 'text', label: 'Text' },
  { key: 'updated_at', label: 'Updated At' },
];

export const columns: { [key: string]: RecordsTableColumns } = {
  'programming-project': [
    ...defaultColumns,
    { key: 'importance', label: 'Importance' },
    { key: 'deadline', label: 'Deadline' },
    { key: 'used_technologies', label: 'Used Technologies' },
    { key: 'description', label: 'Description' },
    { key: 'extra', label: 'Extra' },
  ],
  knowledge: [
    ...defaultColumns,
    { key: 'importance', label: 'Importance' },
    { key: 'domain', label: 'Domain' },
    { key: 'link', label: 'Link' },
    { key: 'image', label: 'Image' },
  ],
  note: [
    ...defaultColumns,
    { key: 'description', label: 'Description' },
    { key: 'importance', label: 'Importance' },
    { key: 'type', label: 'Type' },
    { key: 'link', label: 'Link' },
  ],
};
