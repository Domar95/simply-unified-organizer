import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { Observable, Subscription } from 'rxjs';

import { ProgrammingProjectGetResponse } from '@feature/records/models';
import { RecordsApiService } from '@feature/records/services';
import { ActivatedRoute, Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'suo-records-table',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatSortModule,
    MatIconModule,
  ],
  providers: [RecordsApiService],
  templateUrl: './records-table.component.html',
  styleUrl: './records-table.component.scss',
})
export class RecordsTableComponent {
  @Input({ required: true }) records$!: Observable<
    ProgrammingProjectGetResponse[] | 'loading'
  >;
  @Input() columns!: { key: string; label: string }[];

  @Output() refreshed: EventEmitter<void> = new EventEmitter<void>();

  columnKeys: string[] = [];
  loading: boolean = true;
  private recordsSubscription!: Subscription;

  dataSource: MatTableDataSource<ProgrammingProjectGetResponse> =
    new MatTableDataSource<ProgrammingProjectGetResponse>();

  constructor(
    private recordsApiService: RecordsApiService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  @ViewChild(MatSort, { static: false }) sort!: MatSort;

  ngOnInit(): void {
    this.recordsSubscription = this.records$.subscribe(
      (records: ProgrammingProjectGetResponse[] | 'loading') => {
        this.loading = records === 'loading';
        this.updateTable(records);
      }
    );
    this.columnKeys = this.getColumnKeys();
  }

  private getColumnKeys(): string[] {
    const columnKeys = this.columns.map((column) => column.key);
    columnKeys.push('actions');
    return columnKeys;
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy(): void {
    this.recordsSubscription.unsubscribe();
  }

  updateTable(records: ProgrammingProjectGetResponse[] | 'loading') {
    if (records === 'loading') {
      return;
    }
    this.dataSource.data = records;
  }

  async addRecord() {
    this.router.navigate(['new/programming-project'], {
      relativeTo: this.route,
    });
  }
  async deleteRecord(id: number) {
    await this.recordsApiService.deleteProgrammingProject(id);
    this.refreshed.emit();
  }

  async refreshRecords() {
    this.refreshed.emit();
  }
}
