// Function to generate unique ID
function generateID() {
    if (!localStorage.getItem("books")){
        return 1
    }
    return (JSON.parse(localStorage.getItem("books")).length)+ 1
}

// Function to create book element
function createBookElement(book) {
    const { id, title, author, year, isComplete } = book;

    const bookItem = document.createElement('li');
    bookItem.classList.add('book-item');
    bookItem.setAttribute('data-id', id);

    const textContainer = document.createElement('div');
    textContainer.innerHTML = `<strong>${title}</strong> - ${author} (${year})`;
    bookItem.appendChild(textContainer);

    const actionContainer = document.createElement('div');

    const toggleButton = document.createElement('button');
    toggleButton.textContent = isComplete ? 'Belum Selesai Dibaca' : 'Selesai Dibaca';
    toggleButton.classList.add('btn-toggle');
    actionContainer.appendChild(toggleButton);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Hapus';
    deleteButton.classList.add('btn-delete');
    actionContainer.appendChild(deleteButton);

    bookItem.appendChild(actionContainer);

    return bookItem;
}

// Function to add book to respective list
function addBook(book) {
    const newBook = createBookElement(book);

    if (book.isComplete) {
        listSelesai.appendChild(newBook);
    } else {
        listBelumSelesai.appendChild(newBook);
    }
}

// Function to save books array to localStorage
function saveDataToStorage() {
    localStorage.setItem('books', JSON.stringify(books));
}

// Function to fetch books array from localStorage
function fetchDataFromStorage() {
    const storedBooks = JSON.parse(localStorage.getItem('books'));
    return storedBooks === null ? [] : storedBooks;
}

// Initialize books array from localStorage or empty array
let books = fetchDataFromStorage();

// Function to render all books
function renderBooks() {
    listBelumSelesai.innerHTML = '';
    listSelesai.innerHTML = '';

    books.forEach(book => {
        addBook(book);
    });
}

// Event listener for form submission
inputForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const title = inputTitle.value.trim();
    const author = inputAuthor.value.trim();
    const year = parseInt(inputYear.value.trim(), 10);
    const isComplete = inputStatus.value === 'selesai';

    if (!title || !author || isNaN(year)) {
        alert('Please fill in all fields correctly!');
        return;
    }

    const id = generateID();
    const newBook = { id, title, author, year, isComplete };
    books.push(newBook);

    saveDataToStorage();
    addBook(newBook);

    inputForm.reset();
    inputTitle.focus();
});

// Event delegation for toggle and delete buttons
document.addEventListener('click', function (e) {
    if (e.target.classList.contains('btn-toggle')) {
        const bookId = e.target.parentElement.parentElement.getAttribute('data-id');
        const index = books.findIndex(book => book.id === bookId);
        if (index !== -1) {
            books[index].isComplete = !books[index].isComplete;
            saveDataToStorage();
            renderBooks();
        }
    }

    if (e.target.classList.contains('btn-delete')) {
        const bookId = e.target.parentElement.parentElement.getAttribute('data-id');
        books = books.filter(book => book.id !== bookId);
        saveDataToStorage();
        renderBooks();
    }
});

// Event listener for search input
inputPencarian.addEventListener('input', function () {
    const keyword = inputPencarian.value.trim().toLowerCase();
    const filteredBooks = books.filter(book =>
        book.title.toLowerCase().includes(keyword) || book.author.toLowerCase().includes(keyword)
    );
    renderBooks(filteredBooks);
});

// Event listener for "Show All Books" button
btnTampilSemua.addEventListener('click', function () {
    renderBooks();
});

// Event listener for "Sort by Title" button
btnUrutkan.addEventListener('click', function () {
    books.sort((a, b) => a.title.localeCompare(b.title));
    renderBooks();
});

// Initial rendering of books on page load
renderBooks();
