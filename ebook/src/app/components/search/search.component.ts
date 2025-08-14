import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookService } from '../../services/book.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; 

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, RouterModule], 
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchQuery: string = '';
  searchResults: any[] = [];

  constructor(private route: ActivatedRoute, private bookService: BookService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.searchQuery = params.get('query') || '';
      this.searchBooks();
    });
  }

  searchBooks() {
    this.bookService.getBooks().subscribe(data => {
      this.searchResults = data.filter(book =>
        book.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    });
  }
}
