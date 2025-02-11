import { Injectable } from '@angular/core';

import { KnowledgeStrategy, NoteStrategy, ProgrammingProjectStrategy, RecordStrategy } from './strategies';


@Injectable({
  providedIn: 'root'
})
export class RecordStrategyFactoryService {

  constructor(
    private programmingProjectStrategy: ProgrammingProjectStrategy,
    private knowledgeStrategy: KnowledgeStrategy,
    private noteStrategy: NoteStrategy
  ) { }

  getStrategy(category: string): RecordStrategy {
    switch (category) {
      case 'knowledge':
        return this.knowledgeStrategy;
      case 'note':
        return this.noteStrategy;
      case 'programming-project':
        return this.programmingProjectStrategy;
      default:
        throw new Error(`No strategy found for category: ${category}`);
    }
  }
}
