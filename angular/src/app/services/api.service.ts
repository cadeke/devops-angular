import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  url : string = "http://localhost:58932/api/v1/"
  external : string = "https://v2.jokeapi.dev/joke/programming"

  constructor(private http: HttpClient) { }

  getData(category: string) {
    return this.http.get(this.url + category);
  }

  callExternalAPI(){
    return this.http.get(this.external);
  }

  logData(data){
    console.log(data);
  }
}
