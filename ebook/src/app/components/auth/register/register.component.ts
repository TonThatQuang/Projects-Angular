import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true, 
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  imports: [FormsModule] 
})
export class RegisterComponent {
  name = '';
  email = '';
  password = '';

  constructor(private authService: AuthService) {}

  register() {
    const user = { name: this.name, email: this.email, password: this.password };
    this.authService.register(user).subscribe(response => {
      alert('Đăng ký thành công!');
    }, error => {
      alert('Đăng ký thất bại!');
    });
  }
}
