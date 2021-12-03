import http from '/util/http.js';
import scrollToTop from '/util/scrollToTop.js';

//Example query to server
const localUrl = `${location.protocol}//${location.host}`;

http.getData(`${localUrl}/books/1`).then(response => {
    const res = JSON.parse(response)
    if (res.length > 0) {
        console.log(res);
    }
});
//End of example

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