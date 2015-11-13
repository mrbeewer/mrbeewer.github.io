# We're Under Attack!
## A cooperative game where you must defend your castle from the attacking horde. You all win or you all lose!

### *Currently Under Development*

![We're Under Attack! Sample Image](http://i.imgur.com/7EuqCB0.png)

#### Technologies Used:
 * Phaser Framework 2.4.4 - http://phaser.io/
    * Animation and Image Control
    * Event Listeners
 * HTML5
    * **Very** Basic landing page
 * jQuery 2.1.4
    * DOM Appending
 * Javascript
    * Game Logic

#### Image Sources:
 * Map
    * Source: http://gmtools.uo1.net/
    * Free for use
 * Weapons, Knight, Castle
    * fantasy-tileset.png
    * Jerom - http://opengameart.org/content/32x32-fantasy-tileset
    * License - CC-BY-SA 3.0
 * Cards
    * GoldFrame.png
    * Mumu - http://opengameart.org/content/40x56-card-frames-without-the-art
    * License - CC0
 * Orc
    * orc.png
    * LordNeo - http://opengameart.org/content/orc-static-64x64
    * License - CC0

 * Buttons
    * button.Scavenge
    * pzUH - http://opengameart.org/content/medieval-game-button-pack
    * License - CC0


#### Approach:
 * Build the environment
  * Create cards/deck
  * Create monsters
  * Set up board
 * Keep track of monster info (type, location, HP)
 * Check that card can be used against selected monster
 * Reduce HP from attack, if 0, remove from board
 * At end of turn, add cards until hand is back to 6
 * Move all monsters inward (pre-defined locations)
  * If monster has reached castle, monster dies but destroys a tower
  * If all towers are gone, game over (LOSE)
  * If all monsters are gone, game over (WIN)
 * Add two new monsters in the outer ring
 * Repeat repeat repeat

#### Instructions:
  * **Defend your castle! If all 6 walls are down, you lose!!**
  * Click "Start The Game"
  * Choose 1 or 2 player(s)
  * Attacking
    * Cards can only attack within their ring and color!
    * Click "Attack"
    * Click the card to use
    * Click the enemy to attack
    * Repeat as necessary until HP goes to 0
  * Discard
    * Want to try for a better card? You can discard once per turn.
    * Click "Discard"
    * Click on the card to discard
  * Done
    * Can't attack anymore? Click "Done"
    * You will recieve cards up to a hand of 6
    * Monsters will move inwards by one ring!
    * Two new monsters will be added in the outer ring!
    * Push them back!!!
  * Repeat until you lose :)

#### Enhancements / Current Issues
  * A lot of simplifications to the game mechanics have been made due to the short development time. Coming soon: more monster types, more good guys, bricks/mortar to re-build!
  * Add of additional outer wall before the castle towers
  * Sounds / Animations
  * Display of the number of monsters left to Win
  * Ability to trade cards with team
  * BUGS
    * HP Text sometimes stays!
    * Shuffling in the discard pile untested
    * Positioning on board is strictly defined, random chance can cause a pile-up of monsters
    * Sprite values get lost somewhere? Weirdness
