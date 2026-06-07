const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const Book = require('./models/book.model');
const User = require('./models/user.model');

mongoose.connect(process.env.MONGO_URI);

app.use(express.json());

async function authMiddleware(req, res, next) {
    try {
        const decoded = jwt.verify(req.headers.authorization.split(' ')[1], process.env.JWT_SECRET);
        req.user = decoded;
    next();
    } catch (e) {
        res.status(401).json({ message: e.message });
    }
}

app.post('/register', async (req, res) => {
    try {
        const passwordHash = await bcrypt.hash(req.body.password, 10);
        await User.create({
            username: req.body.username,
            password: passwordHash
        });
        res.status(201).json({ message: 'User created broo' });
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
});

app.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        const isAuth = await bcrypt.compare(req.body.password, user.password);
        if (isAuth) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
            res.status(200).json({ token });
        } else {
            res.status(401).json({ message: "Username or Password is incorrect broo" });
        }
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
})


app.get('/', authMiddleware, async (req, res) => {
    const { id } = req.user;
    const user = await User.findById(id);
    res.json({ message: `Hello ${user.username}` });
});


app.get('/check/:xyz', (req, res) => {
    res.send(req.params.xyz);
});

// CRUD


// READ 
app.get('/books', authMiddleware, async (req, res) => {
    const books = await Book.find();
    res.status(200).json(books);
});

app.get('/books/:id', authMiddleware,  async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        res.status(200).json(book);
    } catch (e) {
        res.status(200).json({ message: e.message });
    }
});

// CREATE

app.post('/books', authMiddleware, async (req, res) => {
    const book = new Book(req.body);
    await book.save();
    res.status(201).json({ message: "Bro book is created "});
});

// UPDATE

app.patch('/books/:id', authMiddleware, async (req, res) => {
    try {
        const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true} );
        res.status(200).json(book); 
    } catch (e)  {
        res.status(500).json({ message: e.message });
    }
});

// DELETE 

app.delete('/books/:id', authMiddleware, async (req, res) => {
    try {
        await Book.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Books deleted succesfully bro" });
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
});

app.listen(process.env.PORT, () => console.log(`${process.env.PORT} is running`));