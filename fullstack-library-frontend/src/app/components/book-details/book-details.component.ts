import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book.model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit, OnDestroy {
  book: Book | null = null; // Holds the book details retrieved from the backend
  errorMessage: string = ''; // Stores error messages in case of failure

  private ngUnsubscribe = new Subject<void>(); // Used to handle component cleanup and prevent memory leaks

  constructor(
    private route: ActivatedRoute, // Allows access to route parameters (e.g., book ID from URL)
    private bookService: BookService // Service to fetch book details from backend API
  ) {}

  ngOnInit(): void {
    // Get the 'id' parameter from the route URL
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (id) {
      // Fetch book details from the backend using the book ID
      this.bookService.getBookById(id)
      .pipe(takeUntil(this.ngUnsubscribe)) // Automatically unsubscribes when component is destroyed
      .subscribe({
        next: (book) => {
          this.book = book; // Assign the retrieved book data to the component
        },
        error: (error) => {
          this.errorMessage = 'Book not found or an error occurred.'; // Display error message
          console.error('Error fetching book details:', error); // Log error details
        }
      });
    }
  }

  // Lifecycle hook to clean up subscriptions when the component is destroyed
  ngOnDestroy(): void {
    this.ngUnsubscribe.next(); // Emits a value to signal unsubscription
    this.ngUnsubscribe.complete(); // Completes the observable to free resources
  }
}


