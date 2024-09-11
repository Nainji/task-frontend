import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  url: any = "http://localhost:3000/"
  constructor(private http: HttpClient) { }


  get(apiName: String) {
    return this.http.get(this.url + apiName)
  }
  post(apiName: String, body: any) {
    return this.http.post(this.url + apiName, body)
  }
  delete(apiName: String, id: String) {
    return this.http.delete(this.url + apiName + '/' + id)
  }
}
