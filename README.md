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
We have structured the HTML in two main screens:
#pantalla-configuracio: the initial screen for user input (names and game mode)
#pantalla-joc: the gameplay screen with the board and scoreboard.
The application toggles the .hidden CSS class to switch between these containers, preserving JavaScript state (score and names) without needing to reload the page.

The board container (continuo després)...


