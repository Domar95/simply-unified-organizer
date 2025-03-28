import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, Router } from '@angular/router';

import { DynamicFormComponent } from '@feature/records/components/ui-elements/dynamic-form/dynamic-form.component';
import { QuestionBase } from '@feature/records/models';
import { RecordStrategyFactoryService } from '@feature/records/services/record-strategy-factory.service';
import { RecordTitleService } from '@feature/records/services/record-title.service';
import { RecordStrategy } from '@feature/records/services/strategies';
import { NotificationService } from '@shared/services/notification.service';

@Component({
  selector: 'suo-edit-record-page',
  imports: [DynamicFormComponent, MatCardModule],
  providers: [RecordStrategyFactoryService],
  templateUrl: './edit-record-page.component.html',
  styleUrl: './edit-record-page.component.scss',
})
export class EditRecordPageComponent {
  strategy!: RecordStrategy;
  questions!: QuestionBase<string | number | Date>[];
  category!: string;
  title!: string;
  id!: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recordStrategyFactoryService: RecordStrategyFactoryService,
    private recordTitleService: RecordTitleService,
    private notificationService: NotificationService
  ) {}

  async ngOnInit(): Promise<void> {
    this.category = this.route.snapshot.paramMap.get('category') || '';
    const categoryTitle = this.recordTitleService.getTitle(this.category);
    this.title = `Edit ${categoryTitle} record`;
    this.strategy = this.recordStrategyFactoryService.getStrategy(
      this.category
    );

    this.id = this.route.snapshot.paramMap.get('id') || '';
    const record = await this.strategy.getRecord(this.id);
    this.questions = this.strategy.getQuestions(
      record as unknown as Record<string, string | number>
    );
  }

  async onFormSubmitted(data: any): Promise<void> {
    try {
      await this.strategy.updateRecord(this.id, data);
      this.notificationService.openSnackBar('Record updated successfully!');
      this.router.navigate(['/records', this.category]);
    } catch (error) {
      this.notificationService.openSnackBar(
        'Failed to update record. Try again later.'
      );
      throw error;
    }
  }

  onFormCancelled(): void {
    this.router.navigate(['/records', this.category]);
  }
}
