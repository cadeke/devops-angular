import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-external',
  templateUrl: './external.component.html',
  styleUrls: ['./external.component.css'],
})
export class ExternalComponent implements OnInit {
  data: any;

  constructor(private apiSvc: ApiService) {}

  ngOnInit(): void {}

  async callApi(category: string, flag: string) {
    this.data = await this.apiSvc.callExternalAPI(category, flag);
  }
}
