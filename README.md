# Knucklebones recreation

This project is a recreation of the dice game [Knucklebones](https://cult-of-the-lamb.fandom.com/wiki/Knucklebones) from the [Cult of the Lamb](https://www.cultofthelamb.com/ "link to the official Cult of the Lamb website") and is currently in the pre-alpha stage of development. The ultimate goal is to correctly implement the rules of the game and to create a full-fledged web application that can be used to play versus both the AI and another person.

<details>
<summary>Current version: `pre-alpha v0.0.1`</summary>

[![pre-Alpha v0.0.1, Jan 2025](https://i.imgur.com/1iGccGp.png "pre-Alpha v0.0.1, Jan 2025")](https://i.imgur.com/1iGccGp.png "pre-Alpha v0.0.1, Jan 2025")

</details>

---

#### About the application

The fronted part of the application is built with [Vite](https://vitejs.dev/) and everything is written with vanilla [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript "JavaScript").


#### Running the project

Since the project is currently in such an early stage, the only way to play -- is to run the application locally. To do so, you will need to:
1. Install the packages using: `npm i`
2. Run the project using: `npm run dev` (or just `vite` )

After that the dev server will start and you can access it by the link provided in the console. It's usually the standard `localhost:5173`.

Remember that there might (an most likely _will_ ) be some visual bugs present, as well issues in terms of how scores are calculated, dice are placed, and so on.

---

#### Curent state of the project

As of January 2025, the project is in its pre-alpha stage of development. The latest version is `pre-alpha v0.0.1` that marks the first semi-finished and public version.

As of the latest version, the project includes a few base keyfeatures of the game:
- The boards and the visual representation of where the dice are placed on them, which also includes the visual representation of whose move it curently is;
- Scores combo system, that corresponds to the one from the original game, and which also includes the highlighting of the placed dice and represents which dice form which combo in a column;
- The elimination of the opponents dice from their board, if the dice with the same score is placed on current player's board;

The current TODO list for the features includes:
- [ ] Game over screen:
  - End screen for when one of the players have won, that displays who exactly has won and what is the final score;
- [ ] Start menu:
  - A start menu that allows the players to enter their name, and the functionality of which will be expanded later on;
- [ ] A game versus the AI:
  - A way for player to play versus the AI;
- [ ] Multiplayer functionality:
  - Multiplayer functionality that allows the players to setup certain rooms and play from different devices and networks, so that it would not be mandatory to use the same device;
- [ ] (possibly) An account system:
  - A system that supports the saving of the result of previous games, and "friends" system that would allow players to setup multiplayer games more quickly;

---

#### Disclaimer

I do not own the Knucklebones game I am aiming to recreate and never intend to. This is a fan-game and is not in any way an official version. The Knucklebones is the part of the [Cult of the Lamb](https://www.cultofthelamb.com/ "Cult of the Lamb") game, which was created by and belongs to [Massive Monster](https://massivemonster.co/).
