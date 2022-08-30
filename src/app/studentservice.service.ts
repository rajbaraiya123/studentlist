import { Injectable } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StudentserviceService {

  constructor(private http:HttpClient) { }
  
getproduct(value:string){
  // return this.http.get<any>('https://reqres.in/api/users?page=2')
  return this.http.get<any>('https://student-ba279-default-rtdb.firebaseio.com/'+value)
}


}
