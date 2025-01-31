import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Observable } from 'rxjs';

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
  questions$: Observable<QuestionBase<any>[]>;

  constructor(questionService: QuestionService) {
    // TODO: fetch questions dynamically
    this.questions$ = questionService.getKnowledgeRecordQuestions();
  }
}
