import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BookService } from './book.service';
import { Book } from '../models/book';

describe('BookService', () => {
  let service: BookService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Use mock HTTP client
      providers: [BookService]
    });

    service = TestBed.inject(BookService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should retrieve books from API', () => {
    const mockBooks: Book[] = [
      { id: 1, title: 'Book One', author: 'Author One', isbn: '1234567890', publicationYear: 2020, description: 'Sample Book' }
    ];

    service.getBooks().subscribe(books => {
      expect(books.length).toBe(1); // Expect one book
      expect(books).toEqual(mockBooks); // Ensure book data matches mock response
    });

    const req = httpMock.expectOne('http://localhost:8080/books');
    expect(req.request.method).toBe('GET'); // Ensure GET request
    req.flush(mockBooks); // Respond with mock data
  });

  afterEach(() => {
    httpMock.verify(); // Ensure all requests were handled
  });
});

