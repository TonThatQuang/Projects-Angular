import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // 
import { ActivatedRoute } from '@angular/router';
import { BookService } from '../../services/book.service';
import { CartService } from '../../services/cart.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-detail',
  standalone: true, 
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
  imports: [CommonModule], 
})
export class ProductDetailComponent implements OnInit {
  book: any; 

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private cartService: CartService
  ) {}

  //lấy id
  ngOnInit(): void {
    const bookId = this.route.snapshot.paramMap.get('id'); 
    console.log('🔍 Book ID:', bookId); // 

    if (bookId) {
      this.bookService.getBookById(bookId).subscribe(data => {
        console.log('📚 Dữ liệu sách:', data); // 
        this.book = data;
      }, error => {
        console.error('❌ Lỗi khi lấy dữ liệu sách:', error);
      });
    }
  }


  addToCart() {
    this.cartService.addToCart(this.book);
  
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Đã thêm vào giỏ hàng!',
      text: `Cảm ơn bạn đã thích cuốn sách này , hãy đọc vui vẻ nhé`,
      showConfirmButton: false,
      timer: 1500
    });
  }
  
}
