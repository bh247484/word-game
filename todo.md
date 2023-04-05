## TODO

### Tech Infra
- Refactor state to useReducer.
- Fully parameterize global options/config. Pass to board as props?
- Convert from NextJS to Vite react proj.

### Core Functionality
- Fully realize game loop. Trigger 'Level Clear' when time expires. Create 'Game Over' screen/comp.
- Log words spelled/scored in column.
- Create pointing system.
  - Multipliers
  - Longer words, don't just score higher but also clear bonus blocks
- Redemption, after gameOver if you can x,y,z with the letters remaining you have another chance


### Bonus Features
1. Make running tally/list of successfully scored words.
2. Add font customization/configuration.
3. Add old terminal style glow to letters.