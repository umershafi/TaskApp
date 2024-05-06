/* The text to use when description is empty */
const NO_DESCRIPTION_TEXT = "(No description)";

export default class Card {
  constructor(title, color) {
    //TODO
    this.title = title;
    this.color = color;
  
    this.element = document.createElement('article');
    this.element.classList.add('card');
    //console.log("title and color in constructor");

    this.element.innerHTML = `<h3 class="title">${this.title}</h3><p class="description">${NO_DESCRIPTION_TEXT}</p><textarea class="editDescription hidden"></textarea><div class="buttons"><button class="edit"><img src="icons/edit.svg" alt="Edit"></button><button class="startMove"><img src="icons/move.svg" alt="Move"></button><button class="delete"><img src="icons/delete.svg" alt="Delete"></button></div>`;
    this.element.style.backgroundColor = this.color;
    // delete card 
    const deleteCard = this.element.querySelector('.delete');
    deleteCard.addEventListener('click', this.handleDeleteCard.bind(this));
    // edit card
    const editCard = this.element.querySelector('.edit');
    editCard.addEventListener('click', this.handleEditCard.bind(this));
  }

  addToCol(colElem, mover) {
    //TODO
    colElem.appendChild(this.element);
  }

  setDescription(text) {
    //TODO
    let descriptionElem = this.element.querySelector('.description');
    //console.log(this.descriptionElem);
    descriptionElem.textContent = text || NO_DESCRIPTION_TEXT;
    //console.log(descriptionElem.textContent);
  }

  handleDeleteCard(event) {
    // remove the card from the board
    this.element.remove();
  }

  handleEditCard(event) {
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
