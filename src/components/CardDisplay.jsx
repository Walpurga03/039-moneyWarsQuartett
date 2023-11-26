// Importieren der notwendigen Abhängigkeiten und Komponenten
import React from 'react';
import Card from './Card'; // Einzelne Kartenkomponente
import Icon from '../assets/icons/cards_icon.png'; // Symbol für die Karten
import '../styles/CardDisplay.css'; // Stil-Datei für die CardDisplay-Komponente

// CardDisplay-Komponente zur Anzeige einer Spielkarte mit zusätzlichen Informationen
const CardDisplay = ({currentLanguage, onToggleLanguage, title, card, otherCard, onCompare, updateCards, remainingCards, isClickable = true, isRevealed = false, isComputerCard = false}) => {
  
  const cardText = currentLanguage === 'en' ? card.textE : card.textD;
  // Funktion, die aufgerufen wird, wenn auf eine Eigenschaft der Karte geklickt wird
  const handlePropertyClick = (property) => {
    if (isClickable) {
      onCompare(property, card); // Übergeben des Klickereignisses und der Karte an die Vergleichsfunktion
    }
  };
  console.log("isClickable in CardDisplay:", isClickable);
  
 // Rendern der Kartenansicht mit Titel, verbleibenden Karten und der eigentlichen Spielkarte
 return (
  <div className="card-section">
      <div className='cards-text'>
        <h2>{title}<img src={Icon} alt='cards-icon' className='icon'/>{remainingCards}</h2> {/* Titel und Anzahl der verbleibenden Karten */}
      </div>
      {card && (
        <Card
          card={card} // Aktuelle Karte
          computerCard={otherCard} // Karte des Gegners (Computer)
          onCompare={onCompare} // Vergleichsfunktion
          updatePlayerCards={updateCards.updatePlayerCards} // Funktion zum Aktualisieren der Spielerkarten
          updateComputerCards={updateCards.updateComputerCards} // Funktion zum Aktualisieren der Computerkarten
          isClickable={isClickable} // Ob die Karte anklickbar ist oder nicht
          isRevealed={isRevealed} // Zustand, ob die Karte aufgedeckt ist
          isComputerCard={isComputerCard}
          currentLanguage={currentLanguage}
        />
      )}
      </div>
    );
  };

  export default CardDisplay; // Exportieren der CardDisplay-Komponente für die Verwendung in anderen Teilen der Anwendung
