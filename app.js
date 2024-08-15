function generateID() {
    if (!localStorage.getItem("books")){
        return 1
    }
    return (JSON.parse(localStorage.getItem("books")).length)+ 1
}

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

function addBook(book) {
    const newBook = createBookElement(book);

    if (book.isComplete) {
        listSelesai.appendChild(newBook);
    } else {
        listBelumSelesai.appendChild(newBook);
    }
}

function saveDataToStorage() {
    localStorage.setItem('books', JSON.stringify(books));
}

function fetchDataFromStorage() {
    const storedBooks = JSON.parse(localStorage.getItem('books'));
    return storedBooks === null ? [] : storedBooks;
}

let books = fetchDataFromStorage();

function renderBooks() {
    listBelumSelesai.innerHTML = '';
    listSelesai.innerHTML = '';

    books.forEach(book => {
        addBook(book);
    });
}

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

inputPencarian.addEventListener('input', function () {
    const keyword = inputPencarian.value.trim().toLowerCase();
    const filteredBooks = books.filter(book =>
        book.title.toLowerCase().includes(keyword) || book.author.toLowerCase().includes(keyword)
    );
    renderBooks(filteredBooks);
});

btnTampilSemua.addEventListener('click', function () {
    renderBooks();
});

btnUrutkan.addEventListener('click', function () {
    books.sort((a, b) => a.title.localeCompare(b.title));
    renderBooks();
});

renderBooks();
