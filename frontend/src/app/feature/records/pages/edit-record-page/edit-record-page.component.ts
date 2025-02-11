import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';

import { DynamicFormComponent } from '@feature/records/components/ui-elements/dynamic-form/dynamic-form.component';
import { QuestionBase } from '@feature/records/models';
import { RecordStrategyFactoryService } from '@feature/records/services/record-strategy-factory.service';
import { RecordTitleService } from '@feature/records/services/record-title.service';
import { RecordStrategy } from '@feature/records/services/strategies';

@Component({
  selector: 'suo-edit-record-page',
  standalone: true,
  imports: [DynamicFormComponent, MatCardModule],
  providers: [RecordStrategyFactoryService],
  templateUrl: './edit-record-page.component.html',
  styleUrl: './edit-record-page.component.scss'
})
export class EditRecordPageComponent {
  strategy!: RecordStrategy;
  questions!: QuestionBase<string | number | Date>[];
  title!: string;

  constructor(
    private route: ActivatedRoute,
    private recordStrategyFactoryService: RecordStrategyFactoryService,
    private recordTitleService: RecordTitleService
  ) { }

  async ngOnInit(): Promise<void> {
    const category = this.route.snapshot.paramMap.get('category') || '';
    this.title = this.recordTitleService.getTitle(category);
    this.strategy = this.recordStrategyFactoryService.getStrategy(category)

    const id = this.route.snapshot.paramMap.get('id') || '';
    const record = await this.strategy.getRecord(id)
    this.questions = this.strategy.getQuestions(record as unknown as Record<string, string | number>);
  }

  onFormSubmitted(data: any) {
    console.log(data);
  }
}
