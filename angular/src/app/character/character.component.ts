import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.css']
})
export class CharacterComponent implements OnInit {

  data : any;

  constructor(private apiSvc : ApiService) { 
    this.apiSvc.getData("characters").subscribe(response => this.apiSvc.logData(response));
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
