const createPtag = (value, className) => {
    let p = document.createElement('p');
    p.innerHTML = value;
    p.classList.add(className);
    return p
}

const createButton = (label, classNames, onClick, isImageRequired = false) => {
    let button = document.createElement('button');
    button.onclick = onClick;
    button.appendChild(document.createTextNode(label));
    classNames.forEach(item => button.classList.add(item));
    if (isImageRequired) { //Proceed button has an image, to handle images inside button
        let image = createImage("./assets/arrow-right.png", "next");
        button.appendChild(image);
    }
    return button;
}

const createImage = (src, alt = "", classNames = []) => {
    let image = document.createElement('img');
    image.src = src;
    image.alt = alt;
    classNames.forEach(item => image.classList.add(item));
    return image;
}

const createInput = (isChecked = false, onChange, type = 'radio', name = 'g', className = 'radio__input') => {
    let input = document.createElement('input');
    input.type = type;
    input.name = name;
    input.onchange = onChange;
    input.checked = isChecked;
    input.classList.add(className);
    return input;
}

const createLabel = (value, classNames = []) => {
    let label = document.createElement('label');
    label.innerHTML = value;
    classNames.forEach(item => label.classList.add(item));
    return label;
}

const createTextArea = (placeholder, classNames = [], onChange, rows = 4) => {
    let textArea = document.createElement('textarea');
    textArea.placeholder = placeholder;
    textArea.rows = rows;
    textArea.onchange = onChange;
    classNames.forEach(item => textArea.classList.add(item));
    return textArea;
}

const createDiv = (children = [], classNames = []) => {
    let div = document.createElement('div');
    classNames.forEach(item => div.classList.add(item));
    children.forEach(child => div.appendChild(child));
    return div;
}

export {
    createPtag,
    createButton,
    createImage,
    createInput,
    createLabel,
    createDiv,
    createTextArea
}