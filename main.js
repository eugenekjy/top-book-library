let myLibrary = [];

//book contructor
function Book(title, author, pages, read, id) {
    if (!new.target) {
        throw Error("you must use the 'new constructor");
    }
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
  displayBooks();
}

// function to display all books

function displayBooks() {
    const booksContainer = document.querySelector('#booksContainer');
    const emptyState = document.querySelector('#emptyState');
    
    // Clear existing Books 
    booksContainer.innerHTML = '';

    if(myLibrary.length === 0) {
        emptyState.style.display = 'block';
        return;
    }

     emptyState.style.display = 'none';

    myLibrary.forEach(function(book) {
        const bookCard = document.createElement('div');
        bookCard.classList.add('book-card');
        bookCard.classList.add(`${book.read ? 'read' : 'not-read'}`);
        bookCard.innerHTML = `
            <div class="book-title">${book.title}</div>
            <div class="book-author">by ${book.author}</div>
            <div class="book-pages">${book.pages} pages</div>
            <div class="book-status ${book.read ? 'status-read' : 'status-not-read'}">
                ${book.read ? '✓ Read' : '○ Not Read'}
            </div>
            <div class="book-actions">
                <button class="btn btn-toggle">Mark Read</button>
                <button class="btn btn-remove">Remove</button>
            </div>
            `;
        booksContainer.appendChild(bookCard);
    });
}



addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 310, true);
addBookToLibrary("Harry Potter", "J.K. Rowling", 400, false);
addBookToLibrary("To Kill a Mockingbird", "Harper Lee", 324, false);
addBookToLibrary("The Great Gatsby", "F. Scott Fitzgerald", 180, false);
addBookToLibrary("Pride and Prejudice", "ane Austen", 279, true);



console.log(myLibrary);

