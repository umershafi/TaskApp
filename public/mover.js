/* Text to add to the move here button */
const MOVE_HERE_TEXT = "— Move here —";

export default class Mover {
  constructor() {
    this.selectCard = null;

    this.handleMoveHere = this.handleMoveHere.bind(this);
  }

  startMoving(card) {
    //TODO
    this.stopMoving();

    this.selectCard = card;
    // give the card the CSS class 'moving'
    this.selectCard.classList.add('moving');

    // add move here buttons after each title card
    const columnTitle = document.querySelectorAll('.columnTitle');
    columnTitle.forEach(title => {
      // create button element
      const moveHereBtn = document.createElement('button');
      moveHereBtn.textContent = MOVE_HERE_TEXT;
      moveHereBtn.classList.add('moveHere');
      // create an eventhandler for each button
      moveHereBtn.addEventListener('click', this.handleMoveHere);
      title.after(moveHereBtn);
    });

    // add buttons after each card
    const cards = document.querySelectorAll('.card:not(.template)');
    cards.forEach(card => {
      // create button element
      const moveHereBtn = document.createElement('Button');
      moveHereBtn.textContent = MOVE_HERE_TEXT;
      moveHereBtn.classList.add('moveHere');
      // create an eventhandler for each button
      moveHereBtn.addEventListener('click', this.handleMoveHere);
      card.after(moveHereBtn);
    });
  }

  handleMoveHere(event) {
    // insert card to the Move Here button clicked
    event.currentTarget.before(this.selectCard);

    this.stopMoving();
  }

  stopMoving() {
    //TODO
    if (this.selectCard) {
      this.selectCard.classList.remove('moving');
      this.selectCard = null;
    }

    // remove buttons after a move is canceled
    let moveHereBtn = document.querySelectorAll('.moveHere');
    moveHereBtn.forEach(button => {
      button.remove()
    })
  }

  //TODO
}
