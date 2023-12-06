// Importieren der notwendigen Abhängigkeiten und Komponenten
import React, { useState, useEffect, useCallback } from 'react';
import cardsData from '../data/cardsData'; // Daten für die Spielkarten
import { shuffleCards, dealCards, selectHighestPropertyForComputer, compareCardProperties } from '../logic/GameLogic'; // Spiellogik-Funktionen
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
  const [playerTurn, setPlayerTurn] = useState(true);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [isComputerTurn, setIsComputerTurn] = useState(false);
  const [computerSelectedProperty, setComputerSelectedProperty] = useState(null);
  const [lastWinner, setLastWinner] = useState(null);
  const [computerSelectedPropertyValue, setComputerSelectedPropertyValue] = useState(null);
  const [showComputerChoiceButton, setShowComputerChoiceButton] = useState(false);


  const computerTurn = () => {
    // Annahme: Die erste Karte des Computers wird ausgewählt
    const computerCard = computerCards[0];

    // Überprüfen, ob eine Computerkarte vorhanden ist
    if (!computerCard) {
        console.log("Keine Computerkarte verfügbar");
        return;
    }

    console.log("Aktuelle Computerkarte:", computerCard);

    // Bestimmen der stärksten Eigenschaft der Computerkarte
    const highestProperty = selectHighestPropertyForComputer(computerCard);
    setSelectedProperty(highestProperty);

    // Nachdem die Eigenschaft ausgewählt wurde, führen Sie den Vergleich durch
    // Dies könnte in einer separaten Funktion oder direkt hier implementiert werden
    // Beispiel: compareCards() oder ähnliche Logik

    // Aktualisieren Sie den Zustand basierend auf dem Ergebnis des Vergleichs
    // Beispiel: updateCardStacks(), setIsComputerCardRevealed(), etc.

    // Weitere Logik für den Computerzug
    // Beispiel: Zustandsaktualisierungen, Vorbereiten für den nächsten Zug, etc.
};


  useEffect(() => {
    if (!playerTurn) {
        console.log('Computer macht seinen Zug');
        computerTurn();
    }
}, [playerTurn]);

useEffect(() => {
  console.log("Aktualisiertes selectedProperty:", selectedProperty);
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
      // Der Spieler gewinnt und erhält die oberste Computerkarte und den Unentschieden-Stapel
      updatedPlayerCards.push(computerCards[0], playerCards[0], ...updatedDrawPile);
      updatedComputerCards.shift(); // Entfernt die oberste Computerkarte
      updatedPlayerCards.shift(); // Entfernt die oberste Spielerkarte
      updatedDrawPile = [];
      setPlayerTurn(true)
    } else if (result === 'lose') {
      setShowComputerChoiceButton(true);
      setLastWinner('computer');
      const nextComputerCard = computerCards[1];
      const bestProperty = selectHighestPropertyForComputer(nextComputerCard);
      updatedComputerCards.push(playerCards[0], computerCards[0], ...updatedDrawPile);
      updatedComputerCards.shift(); // Entfernt die oberste Computerkarte
      updatedPlayerCards.shift();
      updatedDrawPile = [];
    } else if (result === 'draw') {
      // Bei einem Unentschieden werden beide obersten Karten auf den Unentschieden-Stapel gelegt
      updatedDrawPile.push(playerCards[0], computerCards[0]);
      updatedPlayerCards.shift(); // Entfernt die oberste Spielerkarte
      updatedComputerCards.shift(); // Entfernt die oberste Computerkarte
      console.log('draw');
    }
  
    setPlayerCards(updatedPlayerCards);
    setComputerCards(updatedComputerCards);
    setDrawPile(updatedDrawPile);
  
    // Spielende überprüfen
    if (updatedPlayerCards.length === 0 || updatedComputerCards.length === 0) {
      setGameOver(true);
    }
  }, [playerCards, computerCards, drawPile]);

  // Verwenden von useEffect, um Änderungen von playerTurn anzuzeigen
  useEffect(() => {
    console.log(playerTurn ? 'Spieler ist am Zug' : 'Computer ist am Zug');
  }, [playerTurn]);
  
  
  const handleCardComparison = useCallback((result) => {
    setIsComputerCardRevealed(true);

    setTimeout(() => {
        const playerFirstCard = playerCards[0];
        const computerFirstCard = computerCards[0];

        if (result === 'lose') {
            setLastWinner('computer');
            const nextComputerCard = computerCards[1];
            const selectedProperty = selectHighestPropertyForComputer(nextComputerCard);

            // Vergleichen der Spielerkarte mit der nächsten Computerkarte
            const comparisonResult = compareCardProperties(playerFirstCard, nextComputerCard, selectedProperty);

            // Aktualisieren der Kartenstapel basierend auf dem Ergebnis des Vergleichs
            updateCardStacks(comparisonResult, playerFirstCard, nextComputerCard);

            console.log("Nächste höchste Eigenschaft des Computers:", selectedProperty, "Wert:", nextComputerCard[selectedProperty]);
            console.log("Computer ist am Zug");
        } else {
            updateCardStacks(result, playerFirstCard, computerFirstCard);
        }

        setIsComputerCardRevealed(false);

        if (playerCards.length === 0 || computerCards.length === 0) {
            setGameOver(true);
        }
    }, 4000);
}, [playerCards, computerCards, updateCardStacks, lastWinner]);

const handleComputerChoice = () => {
  // Holen Sie die nächste Karte des Computers
  const nextComputerCard = computerCards[1];

  // Ermitteln der höchsten Eigenschaft der Computerkarte
  const computerSelectedProperty = selectHighestPropertyForComputer(nextComputerCard);

  // Setzen Sie die ausgewählte Eigenschaft und deren Wert
  setComputerSelectedProperty(computerSelectedProperty);
  setComputerSelectedPropertyValue(nextComputerCard[computerSelectedProperty]);

  // Führen Sie den Vergleich durch und aktualisieren Sie die Stapel
  const comparisonResult = compareCardProperties(playerCards[0], nextComputerCard, computerSelectedProperty);
  handleCardComparison(comparisonResult, computerSelectedProperty);
};
  

  
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
  
  export default GameBoard; // Exportieren der GameBoard-Komponente für die Verwendung in anderen Teilen der Anwendung
