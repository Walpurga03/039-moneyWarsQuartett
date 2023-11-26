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

  
    // Funktion zum Aktualisieren der Kartenstapel nach jeder Runde
    const updateCardStacks = useCallback((winner, loser, winnerCards, loserCards) => {
      const updatedWinnerCards = [...winnerCards, winnerCards[0], loserCards[0], ...drawPile];
      const updatedLoserCards = loserCards.slice(1);
  
      setDrawPile([]);
      return { updatedWinnerCards: updatedWinnerCards.slice(1), updatedLoserCards };
    }, [drawPile]);
  
   // Funktion zum Vergleich der Karten und zum Aktualisieren der Spielstände
   const handleCardComparison = useCallback((result) => {
    setIsComputerCardRevealed(true);
  
    setTimeout(() => {
      setIsComputerCardRevealed(false);
    
        // Logik zur Aktualisierung der Kartenstapel basierend auf dem Ergebnis des Vergleichs
        if (result === 'win') {
          const { updatedWinnerCards, updatedLoserCards } = updateCardStacks('player', 'computer', playerCards, computerCards);
          setPlayerCards(updatedWinnerCards);
          setComputerCards(updatedLoserCards);
        } else if (result === 'lose') {
          const { updatedWinnerCards, updatedLoserCards } = updateCardStacks('computer', 'player', computerCards, playerCards);
          setComputerCards(updatedWinnerCards);
          setPlayerCards(updatedLoserCards);
        } else if (result === 'draw') {
          setDrawPile(currentDrawPile => [...currentDrawPile, playerCards[0], computerCards[0]]);
          setPlayerCards(playerCards.slice(1));
          setComputerCards(computerCards.slice(1));
        }
      }, 2000);
    
    }, [playerCards, computerCards, updateCardStacks, setIsComputerCardRevealed]);
  
     // Initialisierung des Spiels: Karten mischen und an Spieler und Computer verteilen
     useEffect(() => {
      const shuffledCards = shuffleCards([...cardsData]);
      const { playerCards, computerCards } = dealCards(shuffledCards);
      setPlayerCards(playerCards);
      setComputerCards(computerCards);
    }, []);
  
   // Rendern des Spielbretts mit den Karten der Spieler und des Computers
   return (
    <div className="game-board">
      <div className="card-container">
          <CardDisplay
            title="Player Card"
            card={playerCards[0]}
            otherCard={computerCards[0]}
            onCompare={handleCardComparison}
            updateCards={{ updatePlayerCards: setPlayerCards, updateComputerCards: setComputerCards }}
            remainingCards={playerCards.length}
            isClickable={true}
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
          />
        </div>
      </div>
    );
  }
  
  export default GameBoard; // Exportieren der GameBoard-Komponente für die Verwendung in anderen Teilen der Anwendung
