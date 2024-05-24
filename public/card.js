/* The text to use when description is empty */
const NO_DESCRIPTION_TEXT = "(No description)";

export default class Card {
  static idCounter = 0;
  constructor(title, color) {
    //TODO
    this.idNum = Card.idCounter++;
    this.title = title;
    this.color = color;
    this.column = null;

    // Load card data from local storage if available
    const cardData = localStorage.getItem(`card_${this.idNum}`);
    if (cardData) {
      const parsedData = JSON.parse(cardData);
      this.title = parsedData.title;
      this.color = parsedData.color;
      this.column = parsedData.column;
      this.descriptionElem;
    }

    this.saveToLocalStorage();
    
    // create a new card element
    this.element = document.createElement('article');
    this.element.classList.add('card');
    this.element.innerHTML = `<h3 class="title">${this.title}</h3><p class="description">${NO_DESCRIPTION_TEXT}</p><textarea class="editDescription hidden"></textarea><div class="buttons"><button class="edit"><img src="icons/edit.svg" alt="Edit"></button><button class="startMove"><img src="icons/move.svg" alt="Move"></button><button class="delete"><img src="icons/delete.svg" alt="Delete"></button></div>`;
    this.element.style.backgroundColor = this.color;
    // font color
    this.changeColor(this.color);
    // delete card 
    const deleteCard = this.element.querySelector('.delete');
    deleteCard.addEventListener('click', this.handleDeleteCard.bind(this));
    // edit card
    const editCard = this.element.querySelector('.edit');
    editCard.addEventListener('click', this.handleEditCard.bind(this));
    // move card
    this.moveCard = this.element.querySelector('.startMove');
    this.moveCard.addEventListener('click', this.handleMoveCard.bind(this));
  }

  saveToLocalStorage() {
    const cardData = {
      idNum: this.idNum,
      title: this.title,
      color: this.color,
      column: this.column,
      description: NO_DESCRIPTION_TEXT
    };
    localStorage.setItem(`card_${this.idNum}`, JSON.stringify(cardData));
  }


  changeColor(bgColor) {
    let hexColor = bgColor;
    // Check if the color is a named color
    if (!/^#[0-9A-F]{6}$/i.test(bgColor)) {
      // Convert named colors to hexadecimal values
      const tempElem = document.createElement('div');
      tempElem.style.color = bgColor;
      document.body.appendChild(tempElem);
      hexColor = window.getComputedStyle(tempElem).color;
      document.body.removeChild(tempElem);

      // Extract the RGB values from the string
      const rgbValues = hexColor.match(/\d+/g).map(Number);

      // Convert the RGB values to hexadecimal
      const hexValues = rgbValues.map(value => {
        const hex = value.toString(16); // Convert each RGB value to hexadecimal
        return hex.length === 1 ? '0' + hex : hex; // Ensure each hexadecimal value has two digits
      });

      // Combine the hexadecimal values to form the color code
      hexColor = '#' + hexValues.join('');
    }

    const r = parseInt(hexColor.slice(1, 3), 16);
    const g = parseInt(hexColor.slice(3, 5), 16);
    const b = parseInt(hexColor.slice(5, 7), 16);

    const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;

    const buttons = this.element.querySelectorAll('.buttons img');

    if (luminance < 128) {
      this.element.classList.add('dark');
      // change buttons to white
      buttons.forEach(button => {
        button.style.filter = 'invert(1)';
      });
    }
    else {
      this.element.classList.add('light');
    }

  }

  addToCol(colElem, mover) {
    //TODO
    this.col = colElem;
    this.col.appendChild(this.element);
    // passed in card object from App
    this.move = mover;
  }

  setDescription(text) {
    //TODO
    this.descriptionElem = this.element.querySelector('.description');
    this.descriptionElem.textContent = text || NO_DESCRIPTION_TEXT;
  }

  handleMoveCard() {
    // call to start card move
    this.move.startMoving(this.element);
  }

  handleDeleteCard() {
    // remove the card from the board
    this.element.remove();
    // cancel a move when a card is moving
    this.move.stopMoving();
  }

  handleEditCard() {
    let editDesc = this.element.querySelector(".editDescription");
    let desc = this.element.querySelector('.description');
    let descText = desc.textContent;

    // if the description is empty, set the text to empty
    if (descText === NO_DESCRIPTION_TEXT) {
      editDesc.value = "";
    } // otherwise set it to the current description
    else {
      editDesc.value = descText;
    }

    // remove current description
    desc.classList.add('hidden');
    // reveal text box
    editDesc.classList.remove('hidden');

    // highight text box and select all text
    editDesc.focus();
    editDesc.select();

    // when user clicks away from text box
    editDesc.addEventListener('blur', () => {
      this.setDescription(editDesc.value);

      // reveal current description
      desc.classList.remove('hidden');
      // remove text box
      editDesc.classList.add('hidden');
    })
  }

  //TODO
}
