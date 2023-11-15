import React, { useState, useEffect, useCallback } from 'react';
import cardsData from '../data/cardsData';
import { shuffleCards, dealCards } from '../logic/GameLogic';
import CardDisplay from './CardDisplay';
import "../styles/GameBoard.css";

const GameBoard = () => {
    const [playerCards, setPlayerCards] = useState([]);
    const [computerCards, setComputerCards] = useState([]);
    const [drawPile, setDrawPile] = useState([]);
  
    const updateCardStacks = useCallback((winner, loser, winnerCards, loserCards) => {
      const updatedWinnerCards = [...winnerCards, winnerCards[0], loserCards[0], ...drawPile];
      const updatedLoserCards = loserCards.slice(1);
  
      setDrawPile([]);
      return { updatedWinnerCards: updatedWinnerCards.slice(1), updatedLoserCards };
    }, [drawPile]);
  
    const handleCardComparison = useCallback((result) => {
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
    }, [playerCards, computerCards, updateCardStacks]);
  
    useEffect(() => {
      const shuffledCards = shuffleCards([...cardsData]);
      const { playerCards, computerCards } = dealCards(shuffledCards);
      setPlayerCards(playerCards);
      setComputerCards(computerCards);
    }, []);
  
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
          />
          <CardDisplay
            title="Computer Card"
            card={computerCards[0]}
            otherCard={playerCards[0]}
            onCompare={handleCardComparison}
            updateCards={{ updatePlayerCards: setPlayerCards, updateComputerCards: setComputerCards }}
            remainingCards={computerCards.length}
          />
        </div>
      </div>
    );
  }
  
  export default GameBoard;