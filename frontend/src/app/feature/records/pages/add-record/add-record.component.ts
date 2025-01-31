import { ActivatedRoute } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

import { DynamicFormComponent } from '@feature/records/components/ui-elements/dynamic-form/dynamic-form.component';
import { QuestionBase } from '@feature/records/models';
import { QuestionService } from '@feature/records/services/question-service.service';

@Component({
  selector: 'suo-add-record',
  standalone: true,
  providers: [QuestionService],
  imports: [AsyncPipe, DynamicFormComponent, MatCardModule],
  templateUrl: './add-record.component.html',
  styleUrl: './add-record.component.scss',
})
export class AddRecordComponent {
  questions!: QuestionBase<any>[];
  category!: string;
  title!: string;

  constructor(
    private route: ActivatedRoute,
    private questionService: QuestionService
  ) {}

  ngOnInit(): void {
    this.category = this.route.snapshot.paramMap.get('category') || '';
    this.questions = this.getQuestions();
    this.title = this.getTitle();
  }

  private getQuestions(): QuestionBase<unknown>[] {
    switch (this.category) {
      case 'knowledge':
        return this.questionService.getKnowledgeRecordQuestions();
      case 'programming-project':
        return this.questionService.getProgrammingProjectQuestions();
      default:
        return [];
    }
  }

  private getTitle(): string {
    const categoryTitles: { [key: string]: string } = {
      'programming-project': 'Programming Project',
      knowledge: 'Knowledge',
    };

    return categoryTitles[this.category] || 'Title';
  }
}
