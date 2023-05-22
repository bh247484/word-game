# What is it?

It's a word game built with React/Rails/Postgres. Think inverted tetris meets realtime scrabble.

https://github.com/bh247484/word-game/assets/57693937/344c955f-69be-49eb-a5ea-2373d3f37012

Letters appear in a grid. The player uses those letters to spell words. Words must be at least 3 letters long and appear in the game's dictionary. See the `Architecture` section below to learn more about how the dictionary is constructed/implemented. The words are scored based on letter rarity, word length, and a multiplier which compounds when multiple words are spelled in quick succession (combo style).

New rows of letters are added to the grid at configurable intervals. If the grid grows to be more than 10 rows long, the game is over. Outlast the clock and you move on to the next level, which is progressively more difficult.

# How to spin up locally
1. Have local Docker installation.
2. Run `make psql-up` in the root directory to start the postgres db.
3. Then `make rails-dev` to launch the rails server.
4. Finally `make vite-dev` to start the React app frontend at `http://localhost:5173`.

# Architecture

## Dictionary Binary Search

The dictionary used to check word validity is built using a combination of a Scrabble dictionary and the Unix "`words`" [dictionary file](https://en.wikipedia.org/wiki/Words_(Unix)).

I combined those line separated dictionary text files into a Json file that sorts and stores words by word length, alphabetizes them, and concatenates the results end to end as one giant string. The C# script I wrote to accomplish this can be found at `/dictionary-script/Program.cs` and the Json dictionary itself at `/vite-react-app/src/utils/searchAlgo/dictionary.json`.

The `binSearch.ts` file in the same directory performs the search itself each time a player submits a new word. The search scales well even with around 300,000 words in the dictionary.

Credit due to John Resig and his article series on JavaScript Dictionary Search. [This article](https://johnresig.com/blog/revised-javascript-dictionary-search/) in particular informed my approach.

## React App

State is handled by a few different reducers `gameConfigReducer.ts`, `gridReducer.ts`, and `scoreReducer.ts` all found in `/vite-react-app/src/reducers/`.  The `gridReducer` in particular contains some interesting/challenging logic that maps user input to the grid and clears letters when a word is successfully scored.

The "Game Board" component orchestrates app state, it's located here: `/vite-react-app/src/components/game-board/index.tsx`. It contains some interesting lifecycle and timing logic handled by a `useInterval` hook. Credit due to [this article](https://overreacted.io/making-setinterval-declarative-with-react-hooks/) by Dan Abramov on React interval setting.

## Rails/Postgres Backend

The dockerized rails app is configured to use a dockerized Postgres db instance and authorized to accept cors requests from the React app frontend.

The backend stores arcade style high scores with the `HighScore` model and `high_scores_controller` api endpoints.

I've also scaffolded an unimplemented `ScoredWord` model to track word score frequency. With enough data I can determine which words are uncommonly scored and awards those words additional points and notify the user if they've scored a word that has never been scored before.
