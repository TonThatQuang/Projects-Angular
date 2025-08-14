import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../models/book.model';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private apiUrl = 'http://localhost:3000/books'; // Đúng endpoint

  constructor(private http: HttpClient) {}

  getBooksByCategory(category: string): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:3000/books/category/${category}`);
  }
  



  getBookById(id: string): Observable<any> {
    return this.http.get<any>(`http://localhost:3000/books/detail/${id}`);
  }
  getBooks(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl); 
  }
}
