import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  jwtToken : string;

  constructor(private http: HttpClient) { }

}
