import React, { useState, useEffect } from 'react';
import './App.css'

function GuessTheNumberGame() {
  
  const [randomNumber, setRandomNumber] = useState(null);
  const [guess, setGuess] = useState('');
  const [turnsLeft, setTurnsLeft] = useState(10);
  const [feedback, setFeedback] = useState('');
  const [guessedNumbers, setGuessedNumbers] = useState([]);
  const [gameOver, setGameOver] = useState(false);

  const startNewGame = () => {
    setRandomNumber(Math.floor(Math.random() * 100) + 1);
    setGuess('');
    setTurnsLeft(10);
    setFeedback('');
    setGuessedNumbers([]);
    setGameOver(false);
  };

  useEffect(() => {
    startNewGame();
  }, []);

  const handleGuess = () => {
    if (gameOver) return;

    const numericGuess = parseInt(guess, 10);
    if (isNaN(numericGuess) || numericGuess < 1 || numericGuess > 100) {
      setFeedback('Please enter a valid number between 1 and 100.');
      return;
    }

    setGuessedNumbers([...guessedNumbers, numericGuess]);
    setTurnsLeft(turnsLeft - 1);

    if (numericGuess === randomNumber) {
      setFeedback(`Congratulations! You guessed the number ${randomNumber} correctly!`);
      setGameOver(true);
    } else if (numericGuess < randomNumber) {
      setFeedback('Your guess is too low!');
    } else {
      setFeedback('Your guess is too high!');
    }

    if (turnsLeft === 1) {
      setFeedback(`Sorry, you've run out of turns. The correct number was ${randomNumber}.`);
      setGameOver(true);
    }
  };

  const handleInputChange = (event) => {
    setGuess(event.target.value);
  };

  return (
    <div>
      <h1>Guess the Number Game</h1>
      <p>Guess a number between 1 and 100. You have {turnsLeft} turns left.</p>

      <input
        type="number"
        value={guess}
        onChange={handleInputChange}
        disabled={gameOver}
      />
      <button onClick={handleGuess} disabled={gameOver}>
        Submit Guess
      </button>

      <p>{feedback}</p>

      {guessedNumbers.length > 0 && (
        <div>
          <h3>Your Guesses:</h3>
          <ul>
            {guessedNumbers.map((num, index) => (
              <li key={index}>{num}</li>
            ))}
          </ul>
        </div>
      )}

      {gameOver && (
        <div>
          <p>Game Over! Would you like to play again?</p>
          <button onClick={startNewGame}>Start New Game</button>
        </div>
      )}
    </div>
  );
}

export default GuessTheNumberGame;