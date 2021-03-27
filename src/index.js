import mockApiCall from './api';
import { getCurrentPage, setCurrentPage, clearAppData, getAnswers, setAnswers } from './storage';
import { createPtag, createButton, createImage, createInput, createLabel, createDiv, createTextArea } from './htmlGenerators';

const QUESTIONS = require('./questions.json').questions;

window.onload = function () {
    const page = getCurrentPage();
    // checks if user was active on survery; if so load the data required for that page
    if (page) loadPageData(page); // handles the case of page refresh
    else {
        // data initialisation
        setCurrentPage(0);
        loadPageData(0);
        setAnswers({ 1: '10', 2: '10', 3: true, 4: "" })
    }
};

// Event listners for "back" and "next" button in the footer
document.getElementById("backButton").addEventListener("click", (event) => onClickNav(event, 'back'));
document.getElementById("nextButton").addEventListener("click", (event) => onClickNav(event, 'next'));
document.getElementById("submitButton").addEventListener("click", () => onClickSubmit());

// Event handler for navigation buttons
function onClickNav(event, direction) { // direction values : back || next
    event?.stopImmediatePropagation();
    const currentPage = getCurrentPage();
    const newPage = direction === 'back' ? currentPage - 1 : currentPage + 1;
    setCurrentPage(newPage); //sets the active page on storage
    loadPageData(newPage); // Load the required data dynamically based on the selected page
}

function onClickSubmit() {
    document.getElementById("submitLabel").innerHTML = '';
    document.getElementById("loaders").style.display = 'block';
    // Simulates an api call behaviour
    mockApiCall(getAnswers()).then(() => {
        loadPageData(5);
        document.getElementById("loaders").style.display = 'none'; // hides loader on success
    })
}


function toggleFooterVisibility(isVisible) {
    document.getElementsByClassName('footer')[0].style.display = isVisible ? 'flex' : 'none';
}

// handles experience button inputs
function onClickExperience(page, item, index, selector) {
    var list = document.getElementsByClassName(selector);
    // To update the style for selected button from the user experience tab
    for (var i = 0; i < list.length; i++) {
        if (i === index) list[i].classList.add('picker__button--active');
        else list[i].classList.remove('picker__button--active');
    }
    let answers = getAnswers() || {};
    answers[page] = item.value || item.points;
    setAnswers(answers); // Stores/updates the selected answer to the storage
}

// handles radio button and text area inputs
function onChangeInput(event, value, page) {
    let answers = getAnswers() || {};
    answers[page] = !event ? value : event.target.value;
    setAnswers(answers);
}

// Function which is responsible for loading contents dynamically based on the active page;
function loadPageData(page) {
    document.getElementById('container').innerHTML = '';

    if (page === 0) { // First page
        toggleFooterVisibility(false);
        const p1 = createPtag("Hi! 👋", 'greetings__main');
        const p2 = createPtag("Help us get some insights into the quality of our products", 'greetings__sub');
        const button = createButton('Proceed', ['button', 'button--next'], (event) => onClickNav(event, 'next'), true);
        button.style.width = '135px';
        const div = createDiv([p1, p2, button], ['greetings']);
        document.getElementById('container').appendChild(div);
        return;
    }

    if (page === 5) { // Last page
        toggleFooterVisibility(false);
        const image1 = createImage("./assets/BG.png");
        const image2 = createImage("./assets/check.png", "Thanks", ["tickImage"]);
        const innerDiv = createDiv([image1, image2], ["imageContainer"]);
        const label1 = createLabel("Thank you!", ["thanksContainer__text1"]);
        const label2 = createLabel("Thanks for helping us improve!", ["thanksContainer__text2"]);
        const div = createDiv([innerDiv, label1, label2], ["thanksContainer"]);
        document.getElementById('container').appendChild(div);
        clearAppData(); // clears entire stored data on reaching last page
        return;
    }

    let div;
    toggleFooterVisibility(true);
    const storedAnswers = getAnswers();
    const currentItem = QUESTIONS[page - 1]; // Gets the data for contents from questions.json
    const p1 = createPtag(currentItem.question, 'question');

    if (currentItem.type === 'rating') { // For user experience buttons
        let buttons = [];
        currentItem.options.forEach((item, index) => {
            let classNames = ['picker__button'];
            const value = item.value || item.points;
            if (storedAnswers?.[page] === value) classNames.push('picker__button--active');
            const newButton = createButton(item.text, classNames, () => onClickExperience(page, item, index, 'picker__button'));
            buttons.push(newButton);
        })
        const innerDiv = createDiv(buttons, ['picker']);
        div = createDiv([p1, innerDiv]);
    }

    if (currentItem.type === 'boolean') { // For radio buttons
        let content = [];
        currentItem.options.forEach((item) => {
            const input = createInput(storedAnswers?.[page] === item.value, () => onChangeInput(null, item.value, page))
            const label = createLabel(item.text);
            const innerDiv = createDiv([input, label], ['radios__button']);
            content.push(innerDiv);
        })
        div = createDiv([p1, ...content]);
    }

    if (currentItem.type === "text") {
        const textArea = createTextArea("Add your comments here", ["textArea"], (event) => onChangeInput(event, null, page));
        div = createDiv([p1, textArea]);
    }

    document.getElementById('container').appendChild(div);

    if (page === 4) { // show and hide submit based on the page
        document.getElementById("submitButton").style.display = 'block';
        document.getElementById("nextButton").style.display = 'none'
    } else {
        document.getElementById("submitButton").style.display = 'none';
        document.getElementById("nextButton").style.display = 'block'
    }
}

