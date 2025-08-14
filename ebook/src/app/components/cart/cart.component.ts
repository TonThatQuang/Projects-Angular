import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-cart',
  standalone: true, 
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  imports: [CommonModule, FormsModule] 
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartItems = this.cartService.getCartItems();
  }

  removeFromCart(index: number) {
    Swal.fire({
      title: 'Xác nhận xóa?',
      text: 'Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Xóa',
      cancelButtonText: 'Hủy'
    }).then((result) => {
      if (result.isConfirmed) {
        this.cartItems.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(this.cartItems)); 
  
        Swal.fire('Đã xóa!', 'Sản phẩm đã được xóa khỏi giỏ hàng.', 'success');
      }
    });
  }
  

  clearCart() {
    this.cartService.clearCart();
    this.cartItems = [];
  }

  

//tăng giảm sl
  increaseQuantity(index: number) {
    this.cartItems[index].quantity += 1;
    localStorage.setItem('cart', JSON.stringify(this.cartItems)); 
  }
  
  decreaseQuantity(index: number) {
    if (this.cartItems[index].quantity > 1) {
      this.cartItems[index].quantity -= 1;
    } else {
      this.removeFromCart(index); 
    }
    localStorage.setItem('cart', JSON.stringify(this.cartItems)); 
  }
  updateQuantity(index: number, newQuantity: number) {
    if (newQuantity < 1) {
      this.cartItems[index].quantity = 1; 
    } else {
      this.cartItems[index].quantity = newQuantity;
    }
  
    localStorage.setItem('cart', JSON.stringify(this.cartItems)); 
  }
    
}
