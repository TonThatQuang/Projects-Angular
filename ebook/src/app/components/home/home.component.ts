import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookService } from '../../services/book.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule], 
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  items = [
    { image: '/img/carousel1.jpg' },
    { image: '/img/carousel2.jpg' },
    { image: '/img/carousel3.jpg' }
  ];
  
  currentIndex = 0;

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.items.length;
  }

  prevSlide() {
    this.currentIndex = (this.currentIndex - 1 + this.items.length) % this.items.length;
  }




  // sách theo danh mục
  ebooksNew: any[] = [];
  ebooksUpcoming: any[] = [];
  ebooksFeatured: any[] = [];
  ebooksCombo: any[] = [];

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.bookService.getBooksByCategory('new').subscribe(data => this.ebooksNew = data);
    this.bookService.getBooksByCategory('upcoming').subscribe(data => this.ebooksUpcoming = data);
    this.bookService.getBooksByCategory('featured').subscribe(data => this.ebooksFeatured = data);
    this.bookService.getBooksByCategory('combo').subscribe(data => this.ebooksCombo = data);
  }
  
}
