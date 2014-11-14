tictactoe
=========
### Introducing the unbeaten [Tic_Tac_Toe Master](http://sspread.github.io/tictactoe/)!

#### Featuring...

- Object-oriented JavaScript
- MVC design
- Sleek 1-page view
- Lightweight, client-side-only architecture
- Jasmine test suite
- Encouraging user messages before every match!

If you think you can beat the Master, give it a whirl! But know this: the Master has played every possible game on this board and has never lost.

#### Local Set-up

This app is is purely client-side so all you need is a browser.

##### Play

- Clone this repository.
- Open up index.html on your browser (localhost).

##### Test

- Clone this repository.
- Open up jasmine-standalone-2.0.2/SpecRunner.html on your browser (localhost).
- Check out the browser's console log to see the breakdown of a MasterTest that recursively blazes through every possible game sequence and logs the result.
- The spec file for the MasterTest is in jasmine-standalone-2.0.2/spec/specMaster.js
- The rest of the spec files are right next to it.

#### MasterTest Results

Of the 585 possible sequences (many terminate by win before the board runs out), there are:
- 410 wins
- 175 draws
- 0 losses

#### My Approach

In addition to working through a concentrated on practicing fundamental OOJS and MVC design, so I'll talk about it here. I ended up with two models: Master (AI) and Board. The Board held the grid coordinates and the logic for traversing them. Master was responsible for looking at the current state of the board and deciding on the best move. To select a move, the Master goes through a series of checking functions - beginning with rows, columns and diagonals and searching for win opportunities, then threats. If it hasn't found anything yet, it checks for potential traps before defaulting to the first available square. The order of these checks is important as the program returns the first coordinate that it likes and skips the other checks.

The JS Game object is the controller for this app. It establishes the event handlers and coordinates information between the two models and the view. It asks the Board if there's been a winning combination and keeps track of who's turn it is and the total number of moves. The controller keeps the player (on click) and master moving in the right order, then tells the view when and what to update.

The BoardView handles what you see. This was probably the most straightforward piece, but I still ended up refactoring substantially. The goal with this view was to make it dumb as rocks. It has no idea the other models exist. It's only job is to update the DOM.

Basic testing went pretty smooth because I was able to decouple the different parts of the game. I tested the Master, Board and Game without acknowledging the view. There were a few novel parts like mocking a click event and setting spies in Jasmine.

But ultimately, I wanted to test if my AI component really could never lose. To do this, I spent a full day trying to wrap my mind around a way to recursively check every board combination. Finally after going for a walk and then sitting down with a pen and paper, I mapped out a way to do it. The TestGame and MasterTest JS objects in the specMaster file accomplish this task. They work by taking a test game board and making a clone for every blank coordinate it contains. Then it moves the Player to each of the possible blank spaces (one in each board clone). It moves the Master and sends each one through the function recursively. The MasterTest recursion returns when a game is over, and saves the winner and layout to an array of TestGame objects. I ended up finding a single case where Master lost by running this test, and updated the AI accordingly.

Got an idea for a smarter Tic_Tac_Toe Master or better code design? I'd love to hear from you! A better AI might result in fewer overall possible sequences and a better win-to-draw ratio.



