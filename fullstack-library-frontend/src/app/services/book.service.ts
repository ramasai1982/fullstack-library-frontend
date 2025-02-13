import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../models/book.model';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private apiUrl = 'http://localhost:8080/books'; // Spring Boot API

  constructor(private http: HttpClient) {}

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.apiUrl);
  }

  getBookById(id: number): Observable<Book> {
    return this.http.get<Book>(`${this.apiUrl}/${id}`);
  }

  searchBooks(title?: string, author?: string): Observable<Book[]> {
    let searchUrl = `${this.apiUrl}/search`;
    if (title) searchUrl += `?title=${title}`;
    if (author) searchUrl += `&author=${author}`;
    return this.http.get<Book[]>(searchUrl);
  }
}

