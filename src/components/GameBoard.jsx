import React, { useState, useEffect, useCallback } from 'react';
import cardsData from '../data/cardsData';
import {updateCardStacks, shuffleCards, dealCards, selectHighestPropertyForComputer} from '../logic/GameLogic';
import CardDisplay from './CardDisplay';
import "../styles/GameBoard.css";

const GameBoard = () => {
  const [playerCards, setPlayerCards] = useState([]);
  const [computerCards, setComputerCards] = useState([]);
  const [drawPile, setDrawPile] = useState([]);
  const [isComputerCardRevealed, setIsComputerCardRevealed] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('de');
  const [playerTurn, setPlayerTurn] = useState(true);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [computerSelectedProperty, setComputerSelectedProperty] = useState(null);
  const [lastWinner, setLastWinner] = useState(null);
  const [computerSelectedPropertyValue, setComputerSelectedPropertyValue] = useState(null);
  const [showComputerChoiceButton, setShowComputerChoiceButton] = useState(false);
  const [roundCount, setRoundCount] = useState(0);
  const [showResultText, setShowResultText] = useState(false);
  const [isComputerNextClicked, setIsComputerNextClicked] = useState(false);


  const compareCardProperties = (playerCard, computerCard, propertyName) => {
    const propertyNamesMapping = {
      property0: 'Jahr',
      property1: 'Seit',
      property2: 'Knappheit',
      property3: 'Lebensdauer',
      property4: 'Teilbarkeit',
      property5: 'Transportfähigkeit'
    };
    console.log(`Eigenschaften vergleichen: ${propertyName}, Spielerkarte:`, playerCard);
    console.log(`Eigenschaften vergleichen: ${propertyName}, Computerkarte:`, computerCard);
    const propertyToCompare = propertyName === 'property1' ? 'property0' : propertyName;
    const readablePropertyName = propertyNamesMapping[propertyToCompare];
    const playerValue = playerCard[propertyToCompare];
    const computerValue = computerCard[propertyToCompare];
    console.log(`Vergleich auf Basis von '${propertyToCompare}': Spieler = ${playerValue}, Computer = ${computerValue}`);


    if (playerValue > computerValue) {
      console.log("Ergebnis: Spieler gewinnt");
      console.log(readablePropertyName, playerValue, computerValue);
      return 'win';
      } else if (playerValue < computerValue) {
      console.log("Ergebnis: Spieler verliert");
      console.log(readablePropertyName, playerValue, computerValue);
      return 'lose';
      } else {
      console.log("Ergebnis: Unentschieden");
      console.log(propertyToCompare, playerValue, computerValue);
      return 'draw';
      }

  };

  const handleComputerNextClick = () => {
    setIsComputerNextClicked(true);
    setTimeout(() => {
      setIsComputerNextClicked(false);
    }, 5000); // Annahme: 5 Sekunden, passen Sie dies nach Bedarf an
  };

  const showResultTextFunction = () => {
    setShowResultText(true);
  };
  
  const computerTurn = () => {
    const computerCard = computerCards[0];
    
    if (!computerCard) {
        return;
    }

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

  useEffect(() => {
    }, [playerTurn]);
  
    const handleCardComparison = useCallback((result) => {
      setIsComputerCardRevealed(true);
      setShowResultText(true);
    
      setTimeout(() => {
        updateCardStacks(result, playerCards, computerCards, drawPile, setPlayerCards, setComputerCards, setDrawPile, setGameOver, setLastWinner, setShowComputerChoiceButton, setPlayerTurn);
    
        setIsComputerCardRevealed(false);
    
        if (playerCards.length === 0 || computerCards.length === 0) {
          setGameOver(true);
        }
    
        // Wechseln des Zuges nach dem Kartenvergleich
        setPlayerTurn(prevPlayerTurn => !prevPlayerTurn); // Wechselt den Zustand des Zuges
    
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
           isPlayerTurn={playerTurn}
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
            computerSelectedProperty={computerSelectedProperty}
/>
          <CardDisplay
           isPlayerTurn={playerTurn}
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
