function generateID() {
    return '_' + Math.random().toString(36).substr(2, 9);
}

export function createInputElement(type, id, placeholder) {
    const input = document.createElement('input');
    input.type = type;
    input.id = id;
    input.placeholder = placeholder;
    input.required = true; // Example: make input fields required
    return input;
}

export function createSelectElement(id, options) {
    const select = document.createElement('select');
    select.id = id;

    options.forEach(option => {
        const optionElement = document.createElement('option');
        optionElement.value = option.value;
        optionElement.textContent = option.text;
        select.appendChild(optionElement);
    });

    select.required = true; // Example: make select field required
    return select;
}

export function createButtonElement(type, textContent) {
    const button = document.createElement('button');
    button.type = type;
    button.textContent = textContent;
    return button;
}

export function createBook(id, title, author, year, isComplete) {
    return {
        id: generateID(), // Generate unique ID
        title,
        author,
        year: parseInt(year), // Convert year to number
        isComplete
    };
}
