// CSS
import "./App.css";

// REACT
import { useCallback, useEffect, useState } from "react";

// DATA
import { wordslist } from "./data/words";

// COMPONENTS
import StartScreen from "./components/StartScreen";
import Game from "./components/Game";
import GameOver from "./components/GameOver";

// SCREEN STAGE
const stages = [
  { id: 1, name: "start" },
  { id: 2, name: "game" },
  { id: 3, name: "end" },
];

const guessesQty = 3;

function App() {
  const [gameStage, setGameStage] = useState(stages[0].name);
  const [words] = useState(wordslist);

  const [pickedword, setPickedWord] = useState("");
  const [pickedCategory, setPickedCategory] = useState("");
  const [letters, setLetters] = useState([]);

  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [guesses, setGuesses] = useState(guessesQty);
  const [score, setScore] = useState(0);

  const pickWordAndCategory = () => {
    // PICK A RANDOM CATEGORY
    const categories = Object.keys(words);
    const category =
      categories[Math.floor(Math.random() * Object.keys(categories).length)];

    // PICK A RANDOM WORD
    const word =
      words[category][Math.floor(Math.random() * words[category].length)];

    return { word, category };
  };

  // START THE GAME
  const startGame = () => {
    // PICK WORD AND PICK CATEGORY
    const { word, category } = pickWordAndCategory();

    // CREATE AN ARRAY OF LETTERS
    let wordLetters = word.split("");
    wordLetters = wordLetters.map((l) => l.toLowerCase());

    //FILL STATES
    setPickedWord(word);
    setPickedCategory(category);
    setLetters(wordLetters);

    console.log(wordLetters);

    setGameStage(stages[1].name);
  };

  // PROCESS THE LETTER INPUT
  const verifyLetter = (letter) => {
    const normalizedLetter = letter.toLowerCase();

    //CHECK IF LETTER HAS ALREADY BEEN UTILIZED
    if (
      guessedLetters.includes(normalizedLetter) ||
      wrongLetters.includes(normalizedLetter)
    ) {
      return;
    }

    //PUSH GUESSED LETTER OR REMOVE A GUESS
    if (letters.includes(normalizedLetter)) {
      setGuessedLetters((actualGuessedLetters) => [
        ...actualGuessedLetters,
        normalizedLetter,
      ]);
    } else {
      setWrongLetters((actualWrongLetters) => [
        ...actualWrongLetters,
        normalizedLetter,
      ]);

      setGuesses((actualGuesses) => actualGuesses - 1);
    }
  };

  const clearLetterStates = () => {
    setGuessedLetters([]);
    setWrongLetters([]);
  };

  useEffect(() => {
    if (guesses <= 0) {
      // RESET ALL STATES
      clearLetterStates();

      setGameStage(stages[2].name);
    }
  }, [guesses]);

  // RESTARTS THE GAME
  const retry = () => {
    setScore(0);
    setGuesses(guessesQty);

    setGameStage(stages[0].name);
  };

  return (
    <div className="App">
      {gameStage === "start" && <StartScreen startGame={startGame} />}
      {gameStage === "game" && (
        <Game
          verifyLetter={verifyLetter}
          pickedword={pickedword}
          pickedCategory={pickedCategory}
          letters={letters}
          guessedLetters={guessedLetters}
          wrongLetters={wrongLetters}
          guesses={guesses}
          score={score}
        />
      )}
      {gameStage === "end" && <GameOver retry={retry} score={score} />}
    </div>
  );
}

export default App;
