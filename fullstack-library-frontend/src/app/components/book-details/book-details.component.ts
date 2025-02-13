import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book.model';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})

export class BookDetailsComponent implements OnInit {
  book: Book | null = null;
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (id) {
      this.bookService.getBookById(id).subscribe({
        next: (data) => {
          this.book = data;
        },
        error: (error) => {
          this.errorMessage = 'Book not found or an error occurred.';
          console.error('Error fetching book details:', error);
        }
      });
    }
  }
}

