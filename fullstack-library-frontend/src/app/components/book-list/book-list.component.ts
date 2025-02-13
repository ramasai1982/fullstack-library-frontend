import { Component, OnDestroy, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book.model';
import { HttpErrorResponse } from '@angular/common/http';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit, OnDestroy {

  books: Book[] = [];

  private ngUnsubscribe = new Subject<void>();

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.loadAllBooks();
  }

  ngOnDestroy(): void {
    // to avoid memory leakage
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }


  // Load all books initially
  loadAllBooks(){
    this.bookService.getBooks()
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(
      (books) => {
      this.books = books;
    },
    (error: HttpErrorResponse) => {
      alert(error.message)
    }
  );
  }

  // Handle search event from SearchBarComponent
  onSearch(searchParams: { title: string; author: string }): void {
    this.bookService.searchBooks(searchParams.title, searchParams.author)
    .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (books) => {
        this.books = books;
      },
      (error: HttpErrorResponse) => {
        alert(error.message)
      });
  }
}

