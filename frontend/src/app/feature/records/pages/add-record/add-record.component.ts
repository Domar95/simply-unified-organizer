import { ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

import { DynamicFormComponent } from '@feature/records/components/ui-elements/dynamic-form/dynamic-form.component';
import { QuestionBase } from '@feature/records/models';
import { QuestionService } from '@feature/records/services/question-service.service';
import { RecordsApiService } from '@feature/records/services';
import { NotificationService } from '@shared/services/notification.service';

@Component({
  selector: 'suo-add-record',
  standalone: true,
  providers: [QuestionService, RecordsApiService],
  imports: [DynamicFormComponent, MatCardModule],
  templateUrl: './add-record.component.html',
  styleUrl: './add-record.component.scss',
})
export class AddRecordComponent {
  questions!: QuestionBase<any>[];
  category!: string;
  title!: string;

  constructor(
    private route: ActivatedRoute,
    private questionService: QuestionService,
    private recordsApiService: RecordsApiService,
    private notificationService: NotificationService

  ) { }

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

    return `Add new ${categoryTitles[this.category]} record` || 'Title';
  }

  async onFormSubmitted(data: any): Promise<void> {
    let response: any;
    switch (this.category) {
      case 'knowledge':
        response = await this.recordsApiService.addKnowledgeRecord(data);
        this.notificationService.openSnackBar('Record added successfully!');
        console.log('Knowledge record added:', response);
        return;
      case 'programming-project':
        response = await this.recordsApiService.addProgrammingProject(data);
        this.notificationService.openSnackBar('Record added successfully!');
        console.log('Programming project record added:', response);
        return;
      default:
        return;
    }
  }
}
