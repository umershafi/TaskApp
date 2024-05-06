import Card from "./card.js";
import Mover from "./mover.js";

export default class App {
  constructor() {
    //TODO
    this.board = document.getElementById('board');
    this.todo = document.getElementById('todo');
    this.doing = document.getElementById('doing');
    this.done = document.getElementById('done');

    const form = document.getElementById('addCard');
    console.log(form);
    form.addEventListener('submit', this.handleAddCard.bind(this));
    
    
  }

  addCard(col, title, color) {
    //TODO
    // havent used this yet
    const template = document.querySelector(".template.card").cloneNode(true);

    // get the id of the task: todo, doing, done
    const colElem = document.getElementById(col);
    //console.log(colElem);
    
    // create new card with passed in title and color
    let newCard = new Card(title, color);
    console.log(newCard);
    
    // add the card in the given task section
    newCard.addToCol(colElem, null);
    // return the card
    return newCard; 
  }

  handleAddCard(event) {
    // stop page from reloading
    event.preventDefault(); 

    console.log(event);

    const title = document.getElementById('cardTitle').value;
    const color = document.getElementById('cardColor').value;

    console.log(title);
    console.log(color);

    // add card in todo section
    this.addCard("todo", title, color);

    //clear values in HTML form
    document.getElementById('cardTitle').value = '';
    document.getElementById('cardColor').value = '';

  }

  //TODO
}
