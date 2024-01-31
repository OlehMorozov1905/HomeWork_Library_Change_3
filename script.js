const addBook = document.getElementById('addBook');
const printBooks = document.getElementById('printBooks');
const result = document.getElementById('result');
const library = [];

addBook.onclick = function () {
    if (findBook(library, isbn.value) === -1) {
        const book = new Book(isbn.value, title.value, author.value, year.value);
        library.push(book);
    } else {
        alert(`Book with isbn = ${isbn.value} exists`);
    }
    isbn.value = title.value = author.value = year.value = '';
}

printBooks.onclick = function () {
    const list = document.createElement('ol');
    for (let i = 0; i < library.length; i++) {
        const text = document.createTextNode(library[i].toString());
        const li = document.createElement('li');
        li.appendChild(text);
        list.appendChild(li);
    }

    const oldestYear = Math.min(...library.map(book => book.year));
    const newestYear = Math.max(...library.map(book => book.year));

    const oldestBooksList = document.createElement('ol');
    for (let i = 0; i < library.length; i++) {
        if (library[i].year === oldestYear) {
            const text = document.createTextNode(library[i].toString());
            const li = document.createElement('li');
            li.appendChild(text);
            oldestBooksList.appendChild(li);
        }
    }

    const newestBooksList = document.createElement('ol');
    for (let i = 0; i < library.length; i++) {
        if (library[i].year === newestYear) {
            const text = document.createTextNode(library[i].toString());
            const li = document.createElement('li');
            li.appendChild(text);
            newestBooksList.appendChild(li);
        }
    }

    list.appendChild(document.createElement('li').appendChild(document.createTextNode('Oldest Books:')));
    list.appendChild(oldestBooksList);

    list.appendChild(document.createElement('li').appendChild(document.createTextNode('Newest Books:')));
    list.appendChild(newestBooksList);

    if (result.firstElementChild) {
        result.replaceChild(list, result.firstElementChild);
    } else {
        result.appendChild(list);
    }
}

function findBook(library, isbn) {
    for (let i = 0; i < library.length; i++) {
        if (library[i].isbn === isbn) {
            return i;
        }
    }
    return -1;
}

function Book(isbn, title, author, year) {
    this.isbn = isbn;
    this.title = title;
    this.author = author;
    this.year = +year;
    this.toString = function () {
        return `ISBN: ${this.isbn}, Title: ${this.title}, Author: ${this.author}, Year of publishing: ${this.year}`;
    }
}