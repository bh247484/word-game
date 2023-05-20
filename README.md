# What is it?

It's a word game. Think inverted tetris meets realtime scrabble.


https://github.com/bh247484/word-game/assets/57693937/6b72a82b-6465-4a03-bc09-8ddb3a762588

Letters appear in a grid. The player uses those letters to spell words. Words be at least 3 letters long and appear in the game's dictionary. See `Architecture` section below to learn more about how the dictionary is constructed/implemented. The words are scored based on letter rarity, word length, and a multiplier which compounds when multiple words are spelled in quick succession (combo style).

New rows of letters are added to the grid at configurable intervals. If the grid grows to be more than 10 rows long, the game is over. Outlast the clock and you move on to the next level, which is progressively more difficult.

# How to spin up locally
1. Have local Docker installation.
2. Run `make vite-dev` in the root directory after cloning the repo.
3. Visit `http://localhost:5173/`.

# Architecture

## Dictionary Binary Search

The dictionary used to check word validity is built using a combination of a Scrabble dictionary and the built in unix "`words`" [dictionary file](https://en.wikipedia.org/wiki/Words_(Unix)).

I combined those line separated dictionary text files into a Json file which organizes words by word length, alphabetizes them, and concatenates them end to end as one giant string. The C# script I wrote to accomplish this can be found at `/asp-api/dictionary-script/Program.cs` and the Json dictionary itself at `/vite-react-app/src/utils/searchAlgo/dictionary.json`.

The `binSearch.ts` file in the same directory performs the search itself each time a player submits a new word. The search scales well even with around 300,000 words in the dictionary.

Credit due to John Resig and his article series on JavaScript Dictionary Search. [This article](https://johnresig.com/blog/revised-javascript-dictionary-search/) in particular informed my approach.

## React App

State is handled by a few different reducers `gameConfigReducer.ts`, `gridReducer.ts`, and `scoreReducer.ts` all found in `/vite-react-app/src/reducers/`.  The `gridReducer` in particular has some interesting/challenging logic in it to map user input to the grid and clear letters when a word is successfully scored.

The "Game Board" is the most important component where state is largely orchestrated, it's located here: `/vite-react-app/src/components/game-board/index.tsx`. There is some interesting lifecycle and timing logic there handled by a `useInterval` hook. Credit due to [this article](https://overreacted.io/making-setinterval-declarative-with-react-hooks/) by Dan Abramov on React interval setting.

## ASP Backend

The backend is not yet implemented. I wanted to focus on the core game mechanics first. I plan to create db table (and attendant api) to store high scores (arcade style) as well as word score frequency. That way, with enough data, I can determine which words are "uncommon" and awards those additional points and also notify the user if they've scored a word that has never been scored before.

I already configured the app to run the ASP.NET backend and a Postgres database with docker. Config in `/docker-compose.yaml` and the Dockerfiles it references.
