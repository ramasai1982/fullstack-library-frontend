import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  books: Book[] = [];

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.loadAllBooks();
  }


  // Load all books initially
  loadAllBooks(){
    this.bookService.getBooks()
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
      .subscribe(
        (books) => {
        this.books = books;
      },
      (error: HttpErrorResponse) => {
        alert(error.message)
      });
  }
}

