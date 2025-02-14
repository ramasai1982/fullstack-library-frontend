import { Component, OnInit, OnDestroy } from '@angular/core';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit, OnDestroy {
  
  books: Book[] = []; // Holds the list of books fetched from the backend
  displayMessageNotFound: string = "No books available in the library."; // Stores a message when no books are found

  private ngUnsubscribe = new Subject<void>(); // Used to manage subscription cleanup and prevent memory leaks

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.loadAllBooks(); // Load all books when the component initializes
  }

  // Lifecycle hook to clean up subscriptions when the component is destroyed
  ngOnDestroy(): void {
    this.ngUnsubscribe.next(); // Emits a signal to unsubscribe from active observables
    this.ngUnsubscribe.complete(); // Completes the observable to free resources
  }

  /**
   * Fetch all books from the backend.
   * If an error occurs, display an alert message.
   */
  loadAllBooks(): void {
    this.bookService.getBooks()
      .pipe(takeUntil(this.ngUnsubscribe)) // Automatically unsubscribe on component destruction
      .subscribe(
        (books) => { 
          this.books = books;
        },
        (error: HttpErrorResponse) => {
          alert(error.message); // Display an alert if there's an error fetching books
        }
      );
  }

  /**
   * Handles search queries from the SearchBarComponent.
   * Updates the book list based on the search parameters.
   * If no books match, an appropriate message is displayed.
   */
  onSearch(searchParams: { title: string; author: string }): void {
    this.books = []; // Clear the current book list before searching
    this.bookService.searchBooks(searchParams.title, searchParams.author)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (books) => {
          this.books = books;

          // If no books match the search criteria, set a message for the user
          if (this.books.length === 0) {
            const authorText = searchParams.author ? `author ${searchParams.author}` : "";
            const titleText = searchParams.title ? `title ${searchParams.title}` : "";

            if (authorText && titleText) {
              this.displayMessageNotFound = `No book found for your query with ${authorText} and ${titleText}.`;
            } else if (authorText || titleText) {
              this.displayMessageNotFound = `No book found for your query with ${authorText}${titleText}.`;
            } else {
              this.displayMessageNotFound = "No books available in the library.";
            }
          }
        },
        (error: HttpErrorResponse) => {
          alert(error.message); // Display an error alert if the API request fails
        }
      );
  }

  resetSearch(): void {
    this.loadAllBooks(); // Reloads all books
    this.displayMessageNotFound = ''; // Clears the "No books found" message
  }
}
