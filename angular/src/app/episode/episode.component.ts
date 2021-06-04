import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-episode',
  templateUrl: './episode.component.html',
  styleUrls: ['./episode.component.css'],
})
export class EpisodeComponent implements OnInit {
  categoryName : string = "episodes";
  data: any;

  constructor(private apiSvc: ApiService) {}

  ngOnInit(): void {}

  async callApi() {
    this.data = await this.apiSvc.getAll(true, this.categoryName);
  }
}
