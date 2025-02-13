import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})

export class SearchBarComponent {
  title: string = ''; // Search input for title
  author: string = ''; // Search input for author

  @Output() searchEvent = new EventEmitter<{ title: string; author: string }>();
  @Output() resetEvent = new EventEmitter<void>(); // New event emitter for reset

  // Emits a search event when user searches
  search(): void {
    this.searchEvent.emit({ title: this.title, author: this.author });
  }

  // Emits a reset event when "Reset" button is clicked
  reset(): void {
    this.title = ''; // Clears title input
    this.author = ''; // Clears author input
    this.resetEvent.emit(); // Notifies parent to reload all books
  }
}
