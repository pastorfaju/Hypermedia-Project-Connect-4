# Hypermedia-Project---Connect-4
Design and development of a Connect 4 web game.
---

We've developed a fully functional Connect Four game using JavaScript, HTML and CSS. It is a single page application, which means that the user can transition between the main menu and the game screen without having to reload the browser page.

We've implemented two game modes:
- Player vs Player
- Player vs Computer

The game has real time updates for the scoreboard, turns and game state using notifications.


CODE STRUCTURE AND ARCHITECTURE
---
We've structured the HTML in two main screens:
#pantalla-configuracio: the initial screen for user input (names and game mode)
#pantalla-joc: the gameplay screen with the board and scoreboard.
The application toggles the .hidden CSS class to switch between these containers, preserving JavaScript state (score and names) without needing to reload the page.

The board container #taulell-visual is initialized empty. The grid cells are initialized in JavaScript to keep the HTML clean.
Buttons (.fila-botons) are placed above the grid columns to capture the user's clicks and move directly to the column indices of the array.


VISUAL ASPECTS AND DECORATION
---

- GRID: We've used the CSS Grid to create the board. Thanks to this, we can use repeat(7, 60px) to create exactly 7 columns of 60 pixels each instead of writing 60px, 60px... The 8px gap creates the blue space between the holes. Without this, the holes would touch each other, and we don't want that. These holes (.casella) are white/gray. This creates the illusion of a blue plastic board with holes in it.

- PIECES: For the pieces, we have used .fitxa-jugador1 and 2 instead of images. These have a radial-gradient simulating a 3d sphere. The box-shadow adds a slight drop shadow, making the piece look like its inside the board slot.

- BUTTONS: For the user interaction we use buttons. These are semi transparent unless the user moves their mouse over them, which makes them light up (opacity 1) and grow slightly. This signals the user where their piece will drop.

- HEADER: We use backgroud-clip: text that puts the background gradient inside the text letters. By making the text color transparent, we can see the gradient through the letters. The @keyframes shine moves the background position, creating a reflection animation across the title text.

This class:
.hidden {
  display: none !important;
}
is super important because it connects directly to the JavaScript. When we add this class to a div, it "vanishes" completely. We use this to swap the menu screen for the game screen.









