import { Component } from '@angular/core';
import { ApiService } from '@core/services/api.service';
import { Observable, lastValueFrom } from 'rxjs';

@Component({
  selector: 'suo-view-record',
  templateUrl: './view-record.component.html',
  styleUrls: ['./view-record.component.scss']
})
export class ViewRecordComponent {

  records: any;

  constructor(private apiService: ApiService) {
  }

  ngOnInit() {
    this.apiService.getRecords().subscribe(
      data => {
        this.records = data;
        console.log(this.records)
      },
      error => {
        console.log('Error fetching records:', error);
      }
    );
    // this.records = this.displayRecords()
    //console.log('123', this.records)
  }

  displayRecords() {
    const rec = this.apiService.getRecords()
    //const rec = this.apiService.getApiUrl()
    console.log(';', JSON.stringify(rec))
    return rec
  }

}
