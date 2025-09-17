let myLibrary = [];
const booksContainer = document.querySelector('#booksContainer');

//book contructor
class Book {
    constructor (title, author, pages, read, id) {
        this.id = crypto.randomUUID();
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
}

function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
  displayBooks();
}

// function to display all books

function displayBooks() {
    booksContainer.innerHTML = '';

    if (myLibrary.length === 0) {
        document.querySelector('#emptyState').style.display = 'block';
        return;
    }
    document.querySelector('#emptyState').style.display = 'none';

    myLibrary.forEach(book => {
        const bookCard = document.createElement('div');
        bookCard.classList.add('book-card', book.read ? 'read' : 'not-read');
        bookCard.dataset.id = book.id; // store book id for delegation

        const titleEl = document.createElement('div');
        titleEl.classList.add('book-title');
        titleEl.textContent = book.title;

        const authorEl = document.createElement('div');
        authorEl.classList.add('book-author');
        authorEl.textContent = `by ${book.author}`;

        const pagesEl = document.createElement('div');
        pagesEl.classList.add('book-pages');
        pagesEl.textContent = `${book.pages} pages`;

        const statusEl = document.createElement('div');
        statusEl.classList.add('book-status', book.read ? 'status-read' : 'status-not-read');
        statusEl.textContent = book.read ? '✓ Read' : '○ Not Read';

        const actionsEl = document.createElement('div');
        actionsEl.classList.add('book-actions');

        const toggleBtn = document.createElement('button');
        toggleBtn.classList.add('btn', 'btn-toggle');
        toggleBtn.textContent = 'Mark Read';

        const removeBtn = document.createElement('button');
        removeBtn.classList.add('btn', 'btn-remove');
        removeBtn.textContent = 'Remove';

        actionsEl.append(toggleBtn, removeBtn);

        bookCard.append(titleEl, authorEl, pagesEl, statusEl, actionsEl);
        booksContainer.appendChild(bookCard);
    });
}

// Single listener for all button clicks inside booksContainer
booksContainer.addEventListener('click', function(e) {
    const bookCard = e.target.closest('.book-card');
    if (!bookCard) return; // clicked outside a card

    const bookId = bookCard.dataset.id;
    const book = myLibrary.find(b => b.id === bookId);
    if (!book) return;

    if (e.target.classList.contains('btn-toggle')) {
        // Toggle read status
        book.read = !book.read;
        displayBooks();
    } else if (e.target.classList.contains('btn-remove')) {
        // Remove book
        myLibrary = myLibrary.filter(b => b.id !== bookId);
        displayBooks();
    }
});

//Modal functions
function openModal() {
    document.querySelector('.modal').style.display ='block';
    document.querySelector('#title').focus();
}

function closeModal() {
    document.querySelector('.modal').style.display = 'none';
    document.querySelector('#bookForm').reset();
}

// Form submission handler
   const bookForm = document.querySelector('#bookForm');
   bookForm.addEventListener('submit', function(event) {
    event.preventDefault();

    //get form data
    const title = document.querySelector('#title').value.trim();
    console.log(title);
    const author = document.querySelector('#author').value.trim(); 
    const pages = parseInt(document.querySelector('#pages').value);
    const read = document.querySelector('#read').checked;

    // validation
    if (title && author && pages > 0) {
        addBookToLibrary(title, author, pages, read);
    }
    //close modal reset
    closeModal();
   })

// add escape key
document.addEventListener('keydown', function(e) {
    console.log(e.key);

    if (e.key === 'Escape') {
        closeModal();
    }
});
// Add some sample books for demonstration
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 310, true);
addBookToLibrary("Harry Potter", "J.K. Rowling", 400, false);
addBookToLibrary("To Kill a Mockingbird", "Harper Lee", 324, false);
addBookToLibrary("The Great Gatsby", "F. Scott Fitzgerald", 180, false);
addBookToLibrary("Pride and Prejudice", "ane Austen", 279, true);



