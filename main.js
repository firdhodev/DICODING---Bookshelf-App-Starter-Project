// main.js

let books = [];
const STORAGE_KEY = 'BOOKSHELF_APPS';

document.addEventListener('DOMContentLoaded', () => {
    const savedBooks = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (savedBooks) {
        books = savedBooks;
        renderBooks();
    }

    document.getElementById('bookForm').addEventListener('submit', (e) => {
        e.preventDefault();
        addBook();
    });

    document.getElementById('searchBookForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const searchQuery = document.getElementById('searchBookTitle').value.toLowerCase();
        renderBooks(searchQuery);
    });
});

function saveBooks() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
}

function renderBooks(searchQuery = '') {
    const incompleteBookshelf = document.getElementById('incompleteBookshelf');
    const completeBookshelf = document.getElementById('completeBookshelf');
    
    incompleteBookshelf.innerHTML = '';
    completeBookshelf.innerHTML = '';

    const filteredBooks = books.filter(book => book.title.toLowerCase().includes(searchQuery));

    filteredBooks.forEach(book => {
        const bookElement = document.createElement('div');
        bookElement.className = 'book-card';
        bookElement.dataset.bookid = book.id;
        bookElement.dataset.testid = 'bookItem';
        
        bookElement.innerHTML = `
            <h3 data-testid="bookItemTitle">${book.title}</h3>
            <p data-testid="bookItemAuthor">Penulis: ${book.author}</p>
            <p data-testid="bookItemYear">Tahun: ${book.year}</p>
            <div>
                <button data-testid="bookItemIsCompleteButton" onclick="toggleComplete(${book.id})">
                    ${book.isComplete ? 'Belum selesai dibaca' : 'Selesai dibaca'}
                </button>
                <button data-testid="bookItemDeleteButton" onclick="deleteBook(${book.id})">Hapus Buku</button>
            </div>
        `;

        if (book.isComplete) {
            completeBookshelf.appendChild(bookElement);
        } else {
            incompleteBookshelf.appendChild(bookElement);
        }
    });
}

function addBook() {
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const year = parseInt(document.getElementById('year').value);
    const isComplete = document.getElementById('isComplete').checked;
    const newBook = {
        id: new Date().getTime(),
        title,
        author,
        year,
        isComplete
    };

    books.push(newBook);
    saveBooks();
    renderBooks();
    document.getElementById('bookForm').reset();
}

function toggleComplete(bookId) {
    const book = books.find(b => b.id === bookId);
    if (book) {
        book.isComplete = !book.isComplete;
        saveBooks();
        renderBooks();
    }
}

function deleteBook(bookId) {
    books = books.filter(book => book.id !== bookId);
    saveBooks();
    renderBooks();
}
