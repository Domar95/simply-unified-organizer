import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RecordTitleService {

  private titles: Record<string, string> = {
    'programming-project': 'Programming Project',
    'knowledge': 'Knowledge',
    'note': 'Note',
  };

  constructor() { }

  getTitle(category: string): string {
    return this.titles[category] || 'Unknown record type';
  }
}
