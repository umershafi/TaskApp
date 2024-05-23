import Card from "./card.js";
import Mover from "./mover.js";

export default class App {
  constructor() {
    //TODO
    this.body = document.body;
    this.mode = document.querySelector('#mode');
    this.initializeMode();
    // create Mover() instance
    this.move = new Mover();

    // add card from HTML form
    const form = document.getElementById('addCard');
    form.addEventListener('submit', this.handleAddCard.bind(this));

    this.mode.addEventListener('click', this.handleMode.bind(this));
  }

  initializeMode() {
    console.log("set preference");

    const savedMode = localStorage.getItem('mode');
    console.log(savedMode);

    if (savedMode === 'dark') {
      this.body.classList.add('dark-mode');
      this.body.classList.remove('light-mode');
      localStorage.setItem('mode', 'dark');
      this.mode.innerHTML = `<button id="mode"><img src="icons/sun.svg" alt="dark mode"></button>`
    }
    else {
      this.body.classList.remove('dark-mode');
      this.body.classList.add('light-mode');
      localStorage.setItem('mode', 'light');
      this.mode.innerHTML = `<button id="mode"><img src="icons/moon.svg" alt="light mode"></button>`
    }
  }

  handleMode(event) {
    console.log(event);
    const lightMode = this.body.classList.contains('light-mode');
    console.log(lightMode)

    if (lightMode) {
      this.body.classList.add('dark-mode');
      this.body.classList.remove('light-mode');
      localStorage.setItem('mode', 'dark');
      this.mode.innerHTML = `<button id="mode"><img src="icons/sun.svg" alt="dark mode"></button>`
    }
    else {
      this.body.classList.remove('dark-mode');
      this.body.classList.add('light-mode');
      localStorage.setItem('mode', 'light');
      this.mode.innerHTML = `<button id="mode"><img src="icons/moon.svg" alt="light mode"></button>`
    }

    const savedMode = localStorage.getItem('mode');
    console.log(savedMode);
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
    //document.getElementById('cardColor').value = '#ffffff';
  }

  //TODO
}
