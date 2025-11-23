# Hypermedia-Project---Connect-4
Design and development of a Connect 4 web game - Pol Pastor and Gerard Gou
---

We've developed a fully functional Connect Four game using JavaScript, HTML and CSS. It is a single page application, which means that the user can transition between the main menu and the game screen without having to reload the browser page.

We've implemented two game modes:
- Player vs Player.
- Player vs Computer.

The game has real time updates for the scoreboard, turns and game state using notifications.


CODE STRUCTURE AND ARCHITECTURE
---
We've structured the HTML in two main screens:
#pantalla-configuracio: the initial screen for user input (names and game mode).
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


GAME CODE AND AI IMPLEMENTATION
---
We use an array of arrays (matriu) to represent the grid.
- taulell[0][0] is the top left corner.
- taulell[5][6] is the bottom right corner.

The values are 0 for an empty space, 1 for the player 1 (red) and 2 for the player 2 (yellow/AI).

Function executarMoviment(col): Starts from bottom (5) up to (0). When it finds the first empty spot, it places the piece. Once that spot is occupied, it updates the taulell array and checks if its a winning move (verificarVictoria).


AI LOGIC:
Inside jugadaIA(), we have defined a function called simularTirada(jugador). This is an auxiliar function that temporarily places a piece in every possible column, checks if that causes a win, and then removes the piece. The user does not see this.
If that move wins, it returns the winning column where the piece must be placed. If not, it returns -1 as a mode of saying that there was no winning move found in all possible options.

The AI has 4 types of plays which are ordered by priority:
1. Winning Move (movimentGuanyador): The AI calls simularTirada for itself (player2). If there's a move that results in 4-in-a-row, it takes it immediately and stops thinking (simularTirada(2) !== -1).
2. Defense Move (movimentBloqueig): The AI calls simularTirada as if it was the player. Works the same as the winning move move but on the player pieces. That way, if it finds a spot where the player would win, AI steals that spot and blocks them.
3. Center Move (centre): In Connect Four, the center column is the most valuable because it has the most possible winning combinations. If no one is about to win, the AI tries to take the center. We put a 30% chance of the AI to ignore the center so it isn't impossible for the player to win (Math.random() > 0.3).
4. Random Move: If no one is about to win, and the center was full (or skipped with the randomness), the AI just picks a random column.

verificarVictoria is the win detection function. It checks if the last move (f, c) created a line of 4.
for this we use comprovarDireccio which returns:

function comprovarDireccio(deltaFila, deltaCol) { ... }
return comprovarDireccio(0, 1) ||  // Horizontal
       comprovarDireccio(1, 0) ||  // Vertical
       comprovarDireccio(1, 1) ||  // Diagonal (Top-Left to Bottom-Right)
       comprovarDireccio(1, -1);   // Diagonal (Bottom-Left to Top-Right)
       
Instead of writing 4 separate loops, this function takes a vector (direction). (0,1) means to look at the same row, newt column and (1,1) means to look at the next row, next column. The code counts consecutive pieces moving forward in that direction, then counts backward in the opposite direction. If the total count is equal or higher than 4, it's a win.

