import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { Book } from '../../models/book.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin',
  standalone: true,
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  imports:[FormsModule, CommonModule]
})
export class AdminComponent implements OnInit {
  books: Book[] = [];
  newBook: Book = { title: '', image: '', category: '' };

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks() {
    this.adminService.getBooks().subscribe(data => {
      console.log('📚 Dữ liệu từ API:', data); // ✅ Kiểm tra dữ liệu có _id hay không
      this.books = data;
    });
  }
  

  addBook() {
    if (!this.newBook.title || !this.newBook.image || !this.newBook.category) {
      alert('Vui lòng nhập đầy đủ thông tin!');
      return;
    }

    this.adminService.addBook(this.newBook).subscribe(() => {
      alert('Thêm sách thành công!');
      this.loadBooks();
      this.newBook = { title: '', image: '', category: '' };
    });
  }

  deleteBook(id: string | undefined) {
    if (!id) {
      alert('Lỗi: Không tìm thấy ID sách!');
      return;
    }
  
    if (confirm('Bạn có chắc chắn muốn xóa sách này không?')) {
      this.adminService.deleteBook(id).subscribe(() => {
        alert('Xóa sách thành công!');
        this.loadBooks();
      });
    }
  }
  
}
