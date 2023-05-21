## TODO

### Core Functionality
- Separate scored words out per level.
- Longer words, don't just score higher but also clear bonus blocks
- Shuffle letter position for new look.
- Redemption, after gameOver if you can x,y,z with the letters remaining to get another chance
- Bonus for clearing the board (0 letters left in grid).

### Core Mechanics Tweaks
- Tweak level configs (timing, drip intensity, row num).
- Tweak point scoring, what's incentivized.

### Tech Infra
- Combine reducers into single reducer/state/store/context.

### Server Side Features
- Keep track of spelled words, as percentage of all words spelled.
  - Increment bigints for number of times word spelled, and number of all words spelled.


### Bonus Features
1. Add font customization/configuration.
2. Add old terminal style glow to letters.