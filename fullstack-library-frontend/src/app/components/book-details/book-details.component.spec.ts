import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookDetailsComponent } from './book-details.component';
import { BookService } from 'src/app/services/book.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';


describe('BookDetailsComponent', () => {
  let component: BookDetailsComponent;
  let fixture: ComponentFixture<BookDetailsComponent>;
  let bookService: BookService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookDetailsComponent],
      imports: [HttpClientTestingModule], // Provides mock HttpClient
      providers: [
        BookService,
        {
          provide: ActivatedRoute, // Mock ActivatedRoute
          useValue: { snapshot: { paramMap: { get: (key: string) => '1' } } }
        }
      ]
    });
    fixture = TestBed.createComponent(BookDetailsComponent);
    component = fixture.componentInstance;
    bookService = TestBed.inject(BookService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
