let myLibrary = [];

const theTitle = document.getElementById('title');
const theAuthor = document.getElementById('author');
const thePages = document.getElementById('pages');
const theRead = document.getElementById('read');
const theSubmit = document.getElementById('submit');
const theOutput = document.getElementById('output');
const form = document.querySelector('form');

form.addEventListener('submit', function(e){
    e.preventDefault();
    location.reload();
});
window.addEventListener('load', (e) => {
    e.preventDefault();
    display();
  });

function Book(title, author, pages, id){
    this.title = title
    this.author = author
    this.pages = pages
    this.id = id

}
function addBook(book){
    myLibrary = getBooks();
    myLibrary.push(book);
    localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
}
function getBooks(){
    if(localStorage.getItem('myLibrary') === null) {
        myLibrary = [];
    }else{
       myLibrary = JSON.parse(localStorage.getItem('myLibrary'));
    }
    return myLibrary;
}
function addBookToLibrary() {
    const id = Date.now();
    const title = theTitle.value;
    const author = theAuthor.value;
    const pages = thePages.value;
    const book = new Book(title, author, pages, id);
    addBook(book);
    clear();
    location.reload();
}
function clear(){
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('pages').value = '';
}
function display(){
    getBooks();
    myLibrary.forEach((book) => {
        const row = document.createElement('tr');
    row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.pages}</td>
        <td class="myId">${book.pages}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
    `;
    theOutput.appendChild(row);
    });
    theOutput.addEventListener('click', (e) => {
        removeBookFromUI(e.target);
        removeBooks(e.target.parentElement.previousElementSibling.textContent);
    });
}
function removeBookFromUI(b){
    if(b.classList.contains('delete')) {
        b.parentElement.parentElement.remove();
    }
}
function removeBooks(id){
    const myLibrary = getBooks();

    myLibrary.forEach((book, index) => {
        if(book.id === id){
            myLibrary.splice(index, 1);
        }
    });

    localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
}
theOutput.addEventListener('click', (e) => {
    removeBookFromUI(e.target);
    removeBooks(e.target.parentElement.previousElementSibling.textContent);
});