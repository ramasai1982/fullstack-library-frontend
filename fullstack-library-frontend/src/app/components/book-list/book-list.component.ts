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
    this.listAllBooks();
  }

  listAllBooks(){
    this.bookService.getBooks().subscribe(
      (books) => {
      this.books = books;
    },
    (error: HttpErrorResponse) => {
      alert(error.message)
    }
  );
  }
}

