import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartItems: any[] = [];

  constructor(@Inject(PLATFORM_ID) private platformId: object) {
    if (isPlatformBrowser(this.platformId)) {
      // ✅ Kiểm tra nếu đang chạy trên trình duyệt mới sử dụng localStorage
      this.cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
    }
  }

  addToCart(book: any) {
    const existingItem = this.cartItems.find(item => item._id === book._id);
  
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.cartItems.push({ ...book, quantity: 1 });
    }
  
    this.saveCart(); 
  }

  getCartItems() {
    return this.cartItems;
  }

  removeFromCart(index: number) {
    this.cartItems.splice(index, 1);
    this.saveCart();
  }

  clearCart() {
    this.cartItems = [];
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('cart'); 
    }
  }

  private saveCart() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('cart', JSON.stringify(this.cartItems)); 
    }
  }
}
