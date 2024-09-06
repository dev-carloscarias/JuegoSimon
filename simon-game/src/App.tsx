import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { GameService } from './services/GameService';
import { FirestoreService } from './services/FirestoreService';
import SimonButton from './components/SimonButton';
import ScoreTable from './components/ScoreTable';
import { Score } from './interfaces/score-interface';

const gameService = new GameService();
const firestoreService = new FirestoreService();

const App: React.FC = () => {
  const [score, setScore] = useState<number>(0);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>('');
  const [highScores, setHighScores] = useState<Score[]>([]);
  const [gameSequence, setGameSequence] = useState<string[]>([]);
  const [activeColor, setActiveColor] = useState<string | null>(null);
  const [isUserTurn, setIsUserTurn] = useState<boolean>(false);

  useEffect(() => {
    loadHighScores();
  }, []);

  const startGame = () => {
    gameService.resetGame();
    loadHighScores();
    setScore(0);
    setIsGameOver(false);
    setIsUserTurn(false);
    addNextColor();
  };

  const restartGame = () => {
    saveScore();
    startGame();
  };



  const addNextColor = () => {
    gameService.generateNextColor();
    setGameSequence([...gameService.getGameSequence()]);
    playSequence();
  };

  const playSequence = () => {
    const sequence = gameService.getGameSequence();
    let index = 0;
    setIsUserTurn(false);

    const interval = setInterval(() => {
      const color = sequence[index];
      setActiveColor(color);
      gameService.playColor(color);

      setTimeout(() => {
        setActiveColor(null);
      }, 500);

      index++;
      if (index >= sequence.length) {
        clearInterval(interval);
        setIsUserTurn(true);
      }
    }, 1000);
  };

  const handleUserInput = (color: string) => {
    if (!isUserTurn) return; 
  
    const currentSequence = gameService.getGameSequence();
    const userCurrentIndex = gameService.getUserSequenceLength();
  
    if (color === currentSequence[userCurrentIndex]) {
      gameService.playColor(color); 
      gameService.addUserColor(color);
  
      if (gameService.isUserSequenceComplete()) {
        setScore(score + 1);
        gameService.resetUserSequence();
        setIsUserTurn(false);
        addNextColor();
      }
    } else {
      setIsGameOver(true);
    }
  };

  const saveScore = async () => {
    if (userName.trim()) {
      await firestoreService.saveScore({ name: userName, score });
      loadHighScores();
    }
  };

  const loadHighScores = async () => {
    const scores = await firestoreService.getHighScores();
    setHighScores(scores);
  };

  return (
    <div style={styles.container}>
      <h1>Simon Game</h1>
      {isGameOver ? (
        <div style={styles.gameOver}>
          <p>¡Juego Terminado! Tu puntuación: {score}</p>
          <input 
            type="text" 
            placeholder="Ingresa tu nombre" 
            value={userName} 
            onChange={(e) => setUserName(e.target.value)} 
            style={styles.input}
          />
          <button onClick={restartGame} style={styles.button}>Reiniciar</button>
        </div>
      ) : (
        <div>
          <div style={styles.buttonsContainer}>
            {gameService.getColors().map(color => (
              <SimonButton
                key={color}
                color={color}
                onClick={() => handleUserInput(color)}
                active={color === activeColor}
              />
            ))}
          </div>
          <p>Puntuación: {score}</p>
          <button onClick={startGame} style={styles.button}>Iniciar Juego</button>
        </div>
      )}
      <ScoreTable scores={highScores} />
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    textAlign: 'center',
    fontFamily: 'Arial, sans-serif',
  },
  buttonsContainer: {
    display: 'flex',
    justifyContent: 'center',
    margin: '20px',
  },
  gameOver: {
    margin: '20px',
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    marginRight: '10px',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
  },
};


export default App;
