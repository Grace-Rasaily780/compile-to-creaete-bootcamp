const express = require('express');
const app = express();
const port = 8000;

app.use(express.json());

app.get('/', (req, res) => {
    res.json({ message: 'Hello World' });
});

// CRUD

// BAD PRACTICE - DONT DO IT IN REAL LIFE
let books = [{ id: 1 , name: "Crime and Punishment", author: "Fedor dotosvrski", pages: 100 }, { id: 2 , name: "Letter to Mellisa", author: "Franz Fafka", pages: 100 }];

// READ 
app.get('/books', (req, res) => {
    res.status(200).json(books);
});

app.get('/books/:id', (req, res) => {
    const [ book ] = books.filter(book => book.id == req.params.id);
    if(book)  {
        res.status(200).json(book);
    } else {
        res.status(200).json({ message: "Soorry bro, book not found" });
    }
  
})

// CREATE

app.post('/books', (req, res) => {
    books.push(req.body);
    res.status(201).json({ message: "Bro book is created "});
});

// UPDATE

app.patch('/books/:id', (req, res) => {
    const [ book ] = books.filter(book => book.id == req.params.id);

    if(!book) {
        res.status(200).json({ message: "Soorry bro, book not found" });
    }

    book.name = req.body.name;
    book.author = req.body.author;
    book.pages = req.body.pages;

    res.status(200).json(book);
});

// DELETE 

app.delete('/books/:id', (req, res) => {
    const [ book ] = books.filter(book => book.id == req.params.id);

    if(!book) {
        res.status(200).json({ message: "Soorry bro, book not found" });
    }

    books = books.filter(book => book.id != req.params.id);
    console.log(books);
    res.status(200).json({ message: "Books deleted succesfully bro" });
});

app.listen(port, () => console.log(`${port} is running`));