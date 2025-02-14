import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Book } from '../models/book';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root' // This ensures the service is available application-wide
})
export class BookService {
  private apiUrl = environment.apiUrl; // Base URL for the backend API

  constructor(private http: HttpClient) {}

  /**
   * Fetch all books from the backend.
   * @returns Observable<Book[]> - List of books
   */
  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.apiUrl)
      .pipe(catchError(this.handleError)); // Handle any errors gracefully
  }

  /**
   * Fetch a specific book by ID.
   * @param id - The unique identifier of the book
   * @returns Observable<Book> - The requested book
   */
  getBookById(id: number): Observable<Book> {
    return this.http.get<Book>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError)); // Handle any errors
  }

  /**
   * Search for books by title and/or author.
   * Constructs a dynamic search URL based on parameters.
   * @param title - (Optional) The title of the book to search for
   * @param author - (Optional) The author of the book to search for
   * @returns Observable<Book[]> - List of books matching the criteria
   */
  searchBooks(title?: string, author?: string): Observable<Book[]> {
    let searchUrl = `${this.apiUrl}/search`;

    // Construct query parameters dynamically
    if (title && author) {
      searchUrl += `?title=${encodeURIComponent(title)}&author=${encodeURIComponent(author)}`;
    } else if (title) {
      searchUrl += `?title=${encodeURIComponent(title)}`;
    } else if (author) {
      searchUrl += `?author=${encodeURIComponent(author)}`;
    }

    return this.http.get<Book[]>(searchUrl)
      .pipe(catchError(this.handleError)); // Handle any errors
  }

  /**
   * Handle errors from HTTP requests.
   * Differentiates between client-side and server-side errors.
   * @param error - The HTTP error response
   * @returns Observable<never> - Throws an error observable
   */
  private handleError(error: HttpErrorResponse) {
    let errorMsg = 'An unknown error occurred';

    // Client-side error (e.g., network issue)
    if (error.error instanceof ErrorEvent) {
      errorMsg = `Client-side error: ${error.error.message}`;
    } 
    // Server-side error (e.g., API issue)
    else {
      errorMsg = `Server error (${error.status}): ${error.message}`;
    }

    console.error(errorMsg); // Log error to console
    return throwError(() => new Error(errorMsg)); // Throw observable error
  }
}


