import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {
  title = '';
  author = '';

  @Output() searchEvent = new EventEmitter<{ title: string; author: string }>();

  search(): void {
    this.searchEvent.emit({ title: this.title, author: this.author });
  }
}
