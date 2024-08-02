import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  // deleteEmp(productId: number) {
  //   throw new Error('Method not implemented.');
  // }

  constructor(private http: HttpClient) { }
  private contactUrl = 'https://snf.backend.socialforumindia.com/contact'; // Replace with your actual API URL

  createFormData(formData: any): Observable<any> {
    return this.http.post(`${this.contactUrl}/contact-data`, formData);
  }

  getAllFormData(): Observable<any> {
    return this.http.get(`${this.contactUrl}/find`);
  }
  // deleteContactData(productId: any) {
  //   return this.http.delete(`${this.contactUrl}/delete/:id`, productId)
  // }
  deletedata(id: number) {
    return this.http.delete(`${this.contactUrl}/delete/${id}`)

  }
}
