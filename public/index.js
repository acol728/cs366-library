import http from '/util/http.js';
import scrollToTop from '/util/scrollToTop.js';

const localUrl = `${location.protocol}//${location.host}`;

function getStars(num) {
    const value = Math.floor(num);
    let stars = '';
    for (let i = 0; i < value; i++) {
        stars += '&starf;'
    }
    for (let i = value; i < 5; i++) {
        stars += '&star;'
    }
    return stars;
}

function loadBook(bookid) {
    http.getData(`${localUrl}/discover/book/${bookid}`).then(response => {
        const res = JSON.parse(response)
        if (res.length > 0) {
            const book = res[0];
            document.getElementById("bookModalTitle").innerHTML = `${book.title} <span id="bookModalLanguageCode">${book.language_code}</span>`;
            document.getElementById("bookModalISBN13").innerHTML = book.isbn13;
            document.getElementById("bookModalPublisherInformation").innerHTML = `Publisher: ${book.publisher}, ${book.publication_date}`;
            document.getElementById("bookModalAuthors").innerHTML = book.authors;
            document.getElementById("bookModalSubject").innerHTML = book.subject;
            document.getElementById("bookModalPages").innerHTML = `${book.num_pages} pages`;
            document.getElementById("bookModalRating").innerHTML = getStars(book.average_rating);
            document.getElementById("bookModalRatingCount").innerHTML = `${book.average_rating} from ${book.ratings_count} reviews`;
            document.getElementById("bookModalStock").innerHTML = `${book.item_count} in stock`;
            if (book.item_count > 0) {
                document.getElementById("bookModalCartButton").classList.add('bookModalCartButton');
                document.getElementById("bookModalCartButton").classList.remove('bookModalCartButtonInactive');
            } else {
                document.getElementById("bookModalCartButton").classList.add('bookModalCartButtonInactive');
                document.getElementById("bookModalCartButton").classList.remove('bookModalCartButton');
            }
            document.getElementById("bookModal").style.display = 'flex';
        }
    });
}

function closeBookModal() {
    document.getElementById("bookModal").style.display = 'none';
}

function loadSearchResults(res) {
    clearSearchResults();
    const resultArea = document.getElementById("resultArea");
    res.forEach((book) => {
        let bookEntry = document.createElement('div');
        bookEntry.classList.add('bookResult');
        bookEntry.setAttribute('data-book-id', book.book_id);

        let bookTitle = document.createElement('div');
        bookTitle.classList.add('bookTitle');
        let titleText = document.createTextNode(book.title);
        bookTitle.append(titleText);
        bookEntry.append(bookTitle);

        let bookInformationContainer = document.createElement('div');
        bookInformationContainer.classList.add('bookInformationContainer')
        let bookInformation = document.createElement('div');
        let bookRating = document.createElement('div');
        let information = document.createTextNode(`${book.authors}, ${book.subject}`);
        bookInformation.append(information);
        bookRating.innerHTML = `${book.average_rating} <span>${getStars(book.average_rating)}</span>`;
        bookInformationContainer.append(bookInformation);
        bookInformationContainer.append(bookRating);
        bookEntry.append(bookInformationContainer);

        bookEntry.addEventListener('click', () => {
            loadBook(book.book_id);
        });
        resultArea.append(bookEntry);
    });
}

function clearSearchResults() {
    document.getElementById("resultArea").innerHTML = '';
}

function getSearchInput() {
    const text = document.getElementById("searchInput").value;
    const sort = document.getElementById("sortInput").value;
    const subject = document.getElementById("subjectInput").value;
    const dateStart = document.getElementById("dateStart").value;
    const dateEnd = document.getElementById("dateEnd").value;
    const minRating = document.getElementById("ratingInput").value;
    const available = document.getElementById("availableInput").checked ? 1 : 0;
    const pageMin = document.getElementById("pageStart").value;
    const pageMax = document.getElementById("pageEnd").value;

    http.getData(`${localUrl}/discover/search?text=${text}&sort=${sort}&subject=${subject}&datestart=${dateStart}&dateend=${dateEnd}&minrating=${minRating}&available=${available}&pagemin=${pageMin}&pagemax=${pageMax}`).then(response => {
        const res = JSON.parse(response);
        if (res.length > 0) {
            document.getElementById("noResult").style.display = 'none';
            document.getElementById("resultArea").style.display = 'flex';
            loadSearchResults(res);
        } else {
            clearSearchResults();
            document.getElementById("noResult").style.display = 'inline-block';
            document.getElementById("resultArea").style.display = 'none';
        }
    }).catch(() => {
        clearSearchResults();
        document.getElementById("noResult").style.display = 'inline-block';
        document.getElementById("resultArea").style.display = 'none';
    });
}

document.getElementById('searchButton').addEventListener('click', getSearchInput);
document.getElementById('filterButton').addEventListener('click', getSearchInput);
document.getElementById('searchInput').addEventListener('change', getSearchInput)
document.getElementById('bookCloseButton').addEventListener('click', closeBookModal);

function switchPage(e) {
    const pageId = e.target.getAttribute("data-page");
    const buttons = document.getElementsByClassName("navElement");
    for (let i = 0; i < buttons.length; i++) {
        if (buttons[i].getAttribute("data-page") == pageId) {
            buttons[i].classList.add("navActive");
        } else {
            buttons[i].classList.remove("navActive");
        }
    }
    const pages = document.getElementsByTagName("section");
    for (let i = 0; i < pages.length; i++) {
        pages[i].classList.remove('sectionActive');
    }
    document.getElementById(pageId).classList.add('sectionActive');
    scrollToTop();
}

const navElements = document.getElementsByClassName("navElement");
for(var i = 0; i < navElements.length; i++) {
    navElements[i].addEventListener('click', switchPage);
}

const ratingInput = document.getElementById('ratingInput');
ratingInput.addEventListener('change', () => {
    const value = Math.floor(ratingInput.value);
    let stars = '';
    for (let i = 0; i < value; i++) {
        stars += '&starf;'
    }
    for (let i = value; i < 5; i++) {
        stars += '&star;'
    }
    document.getElementById('ratingInputResult').innerHTML = `${ratingInput.value} <span style="font-size: 14pt">${stars}</span>`
});

const signInForm = document.getElementById('signInForm');
const registerForm = document.getElementById('registerForm');
const signInButton = document.getElementById('signInButton')
const registerButton = document.getElementById('registerButton')
signInButton.addEventListener('click', () => {
    signInButton.classList.add('underline');
    registerButton.classList.remove('underline');
    registerForm.classList.add('accountFormInactive');
    signInForm.classList.remove('accountFormInactive');
})
registerButton.addEventListener('click', () => {
    registerButton.classList.add('underline');
    signInButton.classList.remove('underline');
    signInForm.classList.add('accountFormInactive');
    registerForm.classList.remove('accountFormInactive');
})

scrollToTop();