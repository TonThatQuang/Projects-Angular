const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors());
app.use(express.json());


mongoose.connect('mongodb://127.0.0.1:27017/ebookdb', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));


const bookSchema = new mongoose.Schema({
  title: String,
  image: String,
  category: String
});
const Book = mongoose.model('Book', bookSchema, 'books');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String
});
const User = mongoose.model('User', userSchema, 'users'); 

// API Đăng ký
app.post('/auth/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
 
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email đã tồn tại' });
    }


    const hashedPassword = await bcrypt.hash(password, 10);


    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    res.json({ message: 'Đăng ký thành công' });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error });
  }
});





//  API ĐĂNG NHẬP
app.post('/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Tìm user theo email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Email không tồn tại' });
    }


    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Sai mật khẩu' });
    }

    const token = jwt.sign({ userId: user._id, name: user.name }, 'SECRET_KEY', { expiresIn: '1h' });

    res.json({ message: 'Đăng nhập thành công', token, user: { name: user.name, email: user.email } });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error });
  }
});





// API lấy tất cả sách 
app.get('/books', async (req, res) => {
  try {
    const books = await Book.find({});
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error });
  }
});



// API lấy sách theo danh mục
app.get('/books/category/:category', async (req, res) => {
  try {
    const category = req.params.category;
    const books = await Book.find({ category });

    if (!books.length) {
      return res.status(404).json({ message: "Không tìm thấy sách trong danh mục này" });
    }

    res.json(books);
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error });
  }
});





//  API lấy sách theo ID
app.get('/books/detail/:id', async (req, res) => {
  try {
    const bookId = req.params.id;
    const book = await Book.findById(bookId);

    if (!book) {
      return res.status(404).json({ message: "Không tìm thấy sách" });
    }

    res.json(book);
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error });
  }
});



// Chạy server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
