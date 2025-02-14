import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookListComponent } from './book-list.component';
import { BookService } from '../../services/book.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from "@angular/router/testing";
import { ActivatedRoute, provideRouter, Router, RouterModule, ROUTES } from '@angular/router';

describe('BookListComponent', () => {
  let component: BookListComponent;
  let fixture: ComponentFixture<BookListComponent>;
  let bookService: BookService;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookListComponent],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ], // Mock HTTP client
      providers: [BookService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(BookListComponent);
    component = fixture.componentInstance;
    bookService = TestBed.inject(BookService);
  });

  it('should load books on init', () => {
    const mockBooks = [{ id: 1, title: 'Test Book', author: 'Test Author', isbn: '1234567890', publicationYear: 2020, description: 'Test Description' }];
    spyOn(bookService, 'getBooks').and.returnValue(of(mockBooks));

    component.ngOnInit();
    fixture.detectChanges();

    expect(component.books.length).toBe(1); // Expect one book
    expect(component.books[0].title).toBe('Test Book'); // Ensure book data is correct
  });
});
