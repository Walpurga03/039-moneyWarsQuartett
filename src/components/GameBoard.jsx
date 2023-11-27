// Importieren der notwendigen Abhängigkeiten und Komponenten
import React, { useState, useEffect, useCallback } from 'react';
import cardsData from '../data/cardsData'; // Daten für die Spielkarten
import { shuffleCards, dealCards } from '../logic/GameLogic'; // Spiellogik-Funktionen
import CardDisplay from './CardDisplay'; // Komponente zur Anzeige der Spielkarten
import "../styles/GameBoard.css"; // Stil-Datei für das GameBoard


const GameBoard = () => {
  // Definition der Zustände für die Spielkarten der Spieler und des Computers sowie für den Unentschieden-Stapel
  const [playerCards, setPlayerCards] = useState([]);
  const [computerCards, setComputerCards] = useState([]);
  const [drawPile, setDrawPile] = useState([]);
  const [isComputerCardRevealed, setIsComputerCardRevealed] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('de'); // Standardmäßig Englisch

  const toggleLanguage = () => {
    setCurrentLanguage(currentLanguage === 'en' ? 'de' : 'en');
  };

  const startGame = () => {
    setIsGameStarted(true);
  };

  
  const updateCardStacks = useCallback((result) => {
    let updatedPlayerCards = [...playerCards];
    let updatedComputerCards = [...computerCards];
    let updatedDrawPile = [...drawPile];
  
    if (result === 'win') {
      // Der Spieler gewinnt und erhält die oberste Computerkarte und den Unentschieden-Stapel
      updatedPlayerCards.push(computerCards[0], playerCards[0], ...updatedDrawPile);
      updatedComputerCards.shift(); // Entfernt die oberste Computerkarte
      updatedPlayerCards.shift(); // Entfernt die oberste Spielerkarte
      updatedDrawPile = [];
    } else if (result === 'lose') {
      // Der Computer gewinnt und erhält die oberste Spielerkarte und den Unentschieden-Stapel
      updatedComputerCards.push(playerCards[0], computerCards[0], ...updatedDrawPile);
      updatedComputerCards.shift(); // Entfernt die oberste Computerkarte
      updatedPlayerCards.shift(); // Entfernt die oberste Spielerkarte
      updatedDrawPile = [];
    } else if (result === 'draw') {
      // Bei einem Unentschieden werden beide obersten Karten auf den Unentschieden-Stapel gelegt
      updatedDrawPile.push(playerCards[0], computerCards[0]);
      updatedPlayerCards.shift(); // Entfernt die oberste Spielerkarte
      updatedComputerCards.shift(); // Entfernt die oberste Computerkarte
    }
  
    setPlayerCards(updatedPlayerCards);
    setComputerCards(updatedComputerCards);
    setDrawPile(updatedDrawPile);
  
    // Spielende überprüfen
    if (updatedPlayerCards.length === 0 || updatedComputerCards.length === 0) {
      setGameOver(true);
    }
  }, [playerCards, computerCards, drawPile]);
  
  
  const handleCardComparison = useCallback((result) => {
    setIsComputerCardRevealed(true);
  
    setTimeout(() => {
      const playerFirstCard = playerCards[0];
      const computerFirstCard = computerCards[0];
    
      updateCardStacks(result, playerFirstCard, computerFirstCard);
      setIsComputerCardRevealed(false);
  
      // Spielende überprüfen
      if (playerCards.length === 0 || computerCards.length === 0) {
        setGameOver(true);
      }
    }, 4000);
  }, [playerCards, computerCards, updateCardStacks]);
  
  
     // Initialisierung des Spiels: Karten mischen und an Spieler und Computer verteilen
     useEffect(() => {
      const shuffledCards = shuffleCards([...cardsData]);
      const { playerCards, computerCards } = dealCards(shuffledCards);
      setPlayerCards(playerCards);
      setComputerCards(computerCards);
    }, []);
  
   // Rendern des Spielbretts mit den Karten der Spieler und des Computers
   return (
    <div>
    {!isGameStarted ? (
      <div className="start-screen">
        <button onClick={startGame}>Spiel starten</button>
      </div>
    ) : (
    <div>
    {gameOver ? (
      <div className="game-over-message">
        Spiel zu Ende! {/* Hier können Sie eine detailliertere Nachricht einfügen */}
      </div>
    ) : (
    <div className="game-board">
      <div className="languageChange">
        <button onClick={toggleLanguage}>de/en</button>
      </div>
      <div className="card-container">
          <CardDisplay
            title="Player Card"
            card={playerCards[0]}
            otherCard={computerCards[0]}
            onCompare={handleCardComparison}
            updateCards={{ updatePlayerCards: setPlayerCards, updateComputerCards: setComputerCards }}
            remainingCards={playerCards.length}
            isClickable={true}
            currentLanguage={currentLanguage}
            onToggleLanguage={toggleLanguage}
          />
          <CardDisplay
              title="Computer Card"
              card={computerCards[0]}
              otherCard={playerCards[0]}
              onCompare={handleCardComparison}
              updateCards={{ updatePlayerCards: setPlayerCards, updateComputerCards: setComputerCards }}
              remainingCards={computerCards.length}
              isClickable={false}
              isRevealed={isComputerCardRevealed} // Zustand, ob die Computerkarte aufgedeckt ist
              isComputerCard={true}
              currentLanguage={currentLanguage}
              onToggleLanguage={toggleLanguage}
          />
      </div>
      {gameOver && (
      <div className="game-over-message">
        Spiel zu Ende! {/* Hier können Sie eine detailliertere Nachricht einfügen */}
      </div>
    )}
    </div>
  )}
    </div>
    )}
    </div>
  );
      }
  
  export default GameBoard; // Exportieren der GameBoard-Komponente für die Verwendung in anderen Teilen der Anwendung
