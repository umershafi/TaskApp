import Card from "./card.js";
import Mover from "./mover.js";

export default class App {
  constructor() {
    //TODO
    
    // create Mover() instance
    this.move = new Mover();

    // add card from HTML form
    const form = document.getElementById('addCard');
    form.addEventListener('submit', this.handleAddCard.bind(this));
  }

  addCard(col, title, color) {
    //TODO
  
    // get the id of the task: todo, doing, done
    const colElem = document.getElementById(col);
    
    // create new card with passed in title and color
    let newCard = new Card(title, color);
    
    // add the card in the given task section
    newCard.addToCol(colElem, this.move);

    // return the card
    return newCard; 
  }

  handleAddCard(event) {
    // stop page from reloading
    event.preventDefault(); 

    // cancel a move when a card is added
    this.move.stopMoving();

    const title = document.getElementById('cardTitle').value;
    const color = document.getElementById('cardColor').value;

    // add card in todo section
    this.addCard("todo", title, color);

    //clear values in HTML form
    document.getElementById('cardTitle').value = '';
    document.getElementById('cardColor').value = '#ffffff';
  }

  //TODO
}
