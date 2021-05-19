import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-external',
  templateUrl: './external.component.html',
  styleUrls: ['./external.component.css']
})
export class ExternalComponent implements OnInit {

  data : any;

  constructor(private apiSvc : ApiService) { 
    //this.apiSvc.callExternalAPI().subscribe(response => this.apiSvc.logData(response));
  }

  ngOnInit(): void {
  }

  callApi() {
    this.apiSvc.callExternalAPI().subscribe(response => this.setData(response));
    //console.log("Called API");
  }

  setData(data) {
    this.data = data;
  }

}
