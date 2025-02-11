export interface RecordStrategy {
  getRecord(id: string): Promise<unknown>;
}

