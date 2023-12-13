import React, { useState, useEffect, useCallback } from 'react';
import cardsData from '../data/cardsData';
import { shuffleCards, dealCards, selectHighestPropertyForComputer, compareCardProperties } from '../logic/GameLogic';
import CardDisplay from './CardDisplay';
import "../styles/GameBoard.css";
import Card from './Card';

const GameBoard = () => {
  const [playerCards, setPlayerCards] = useState([]);
  const [computerCards, setComputerCards] = useState([]);
  const [drawPile, setDrawPile] = useState([]);
  const [isComputerCardRevealed, setIsComputerCardRevealed] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('de'); // Standardmäßig Englisch
  const [playerTurn, setPlayerTurn] = useState(true);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [isComputerTurn, setIsComputerTurn] = useState(false);
  const [computerSelectedProperty, setComputerSelectedProperty] = useState(null);
  const [lastWinner, setLastWinner] = useState(null);
  const [computerSelectedPropertyValue, setComputerSelectedPropertyValue] = useState(null);
  const [showComputerChoiceButton, setShowComputerChoiceButton] = useState(false);
  const [roundCount, setRoundCount] = useState(0);
  const [showResultText, setShowResultText] = useState(false);
  const [isComputerNextClicked, setIsComputerNextClicked] = useState(false);


  const handleComputerNextClick = () => {
    setIsComputerNextClicked(true);
    setTimeout(() => {
      setIsComputerNextClicked(false);
    }, 5000); // Annahme: 5 Sekunden, passen Sie dies nach Bedarf an
  };

  const showResultTextFunction = () => {
    // Hier kannst du die Logik implementieren, um den Resultatstext anzuzeigen
    // Du kannst showResultText auf true setzen, um die Anzeige auszulösen
    setShowResultText(true);
  };
  
  const computerTurn = () => {
    // Annahme: Die erste Karte des Computers wird ausgewählt
    const computerCard = computerCards[0];
    

    // Überprüfen, ob eine Computerkarte vorhanden ist
    if (!computerCard) {
        return;
    }


    // Bestimmen der stärksten Eigenschaft der Computerkarte
    const highestProperty = selectHighestPropertyForComputer(computerCard);
    setSelectedProperty(highestProperty);
  };

  useEffect(() => {

    if (!playerTurn) {
        computerTurn();
    }
  }, [playerTurn]);

  useEffect(() => {
  }, [selectedProperty]);

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
      setLastWinner('player');
      setShowComputerChoiceButton(false);
      updatedPlayerCards.push(computerCards[0], playerCards[0], ...updatedDrawPile);
      updatedComputerCards.shift(); 
      updatedPlayerCards.shift();
      updatedDrawPile = [];
      setPlayerTurn(true);
    } else if (result === 'lose') {
      setShowComputerChoiceButton(true);
      setLastWinner('computer');
      const nextComputerCard = computerCards[1];
      const bestProperty = selectHighestPropertyForComputer(nextComputerCard);
      updatedComputerCards.push(playerCards[0], computerCards[0], ...updatedDrawPile);
      updatedComputerCards.shift();
      updatedPlayerCards.shift();
      updatedDrawPile = [];
    } else if (result === 'draw') {
      updatedDrawPile.push(playerCards[0], computerCards[0]);
      updatedPlayerCards.shift();
      updatedComputerCards.shift();

    }
  
    setPlayerCards(updatedPlayerCards);
    setComputerCards(updatedComputerCards);
    setDrawPile(updatedDrawPile);
  
    // Spielende überprüfen
    if (updatedPlayerCards.length === 0 || updatedComputerCards.length === 0) {
      setGameOver(true);
    }
  }, [playerCards, computerCards, drawPile]);

  useEffect(() => {
  }, [playerTurn]);
  
  const handleCardComparison = useCallback((result) => {
    setIsComputerCardRevealed(true);
    setShowResultText(true);

    setTimeout(() => {
        updateCardStacks(result);

        setIsComputerCardRevealed(false);

        if (playerCards.length === 0 || computerCards.length === 0) {
            setGameOver(true);
        }
    }, 4000);
    setRoundCount(prevRoundCount => prevRoundCount + 1);

  }, [playerCards, computerCards, updateCardStacks, lastWinner]);

  const handleComputerChoice = () => {
    setShowResultText(true);
    setIsComputerNextClicked(true); // Aktivieren des States für die zeitgesteuerte Anzeige

    // Wähle die nächste Karte des Computers und bestimme die höchste Eigenschaft
    const nextComputerCard = computerCards[1];
    const selectedProperty = selectHighestPropertyForComputer(nextComputerCard);

    // Führe den Vergleich durch und aktualisiere die Stapel
    const comparisonResult = compareCardProperties(playerCards[0], nextComputerCard, selectedProperty);
    handleCardComparison(comparisonResult);


    setTimeout(() => {
      setIsComputerNextClicked(false); // Setze den State nach einer gewissen Zeit zurück
    }, 5000); // Annahme: 5 Sekunden, passen Sie dies nach Bedarf an
};

  
  useEffect(() => {
      const shuffledCards = shuffleCards([...cardsData]);
      const { playerCards, computerCards } = dealCards(shuffledCards);
      setPlayerCards(playerCards);
      setComputerCards(computerCards);
  }, []);
  
   return (
    <div>
      <div>Runde: {roundCount}</div>
      {showComputerChoiceButton && (
    <button onClick={handleComputerChoice}>Nächste Computerwahl</button>
      )}
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
            isComputerNextClicked={isComputerNextClicked}
            setShowResultText={setShowResultText}
            showResultText={showResultText}
            showComputerChoiceButton={showComputerChoiceButton}
            title="Player Card"
            card={playerCards[0]}
            otherCard={computerCards[0]}
            onCompare={handleCardComparison}
            updateCards={{ updatePlayerCards: setPlayerCards, updateComputerCards: setComputerCards }}
            remainingCards={playerCards.length}
            isClickable={true}
            currentLanguage={currentLanguage}
            onToggleLanguage={toggleLanguage}
            isComputerTurn={isComputerTurn}
            computerSelectedProperty={computerSelectedProperty}
/>
          <CardDisplay
              isComputerNextClicked={isComputerNextClicked}
              title="Computer Card"
              showResultText={showResultText}
              setShowResultText={setShowResultText}
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
              isComputerTurn={isComputerTurn}
              computerSelectedProperty={computerSelectedProperty}
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
  
export default GameBoard;
