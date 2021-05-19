import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-episode',
  templateUrl: './episode.component.html',
  styleUrls: ['./episode.component.css']
})
export class EpisodeComponent implements OnInit {

  data : any;

  constructor(private apiSvc : ApiService) { 
    this.apiSvc.getData("episodes").subscribe(response => this.apiSvc.logData(response));
  }

  ngOnInit(): void {
  }

  callApi(input : string) {
    this.apiSvc.getData(input).subscribe(response => this.setData(response));
    //console.log("Called API");
  }

  setData(data) {
    this.data = data;
  }

}
