import App from "./app.js";

const main = () => {
  let app = new App();

  /* You can add cards to the board here so you don't have to type them all in every time the page refreshes. Here are a few examples: */
  app.addCard("todo", "Write Card class", "red");
  app.addCard("todo", "Write Card class", "green");
  app.addCard("todo", "Write App class", "purple");
  app.addCard("todo", "second", "black");
  app.addCard("todo", "third", "brown");

  app.addCard("doing", "Write Card class", "yellow");
  app.addCard("doing", "Write App class", "orange");
  app.addCard("doing", "second", "pink");

  app.addCard("done", "second", "pink");

  let card = app.addCard("todo", "Test everything!", "pink");
  card.setDescription("Hopefully we've been testing throughout the process...");
};
main();
