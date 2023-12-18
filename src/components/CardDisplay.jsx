import React from 'react';
import Card from './Card'; 
import Icon from '../assets/icons/cards_icon.png';
import '../styles/CardDisplay.css';

const CardDisplay = ({isPlayerTurn, isComputerNextClicked, showResultText, setShowResultText, showComputerChoiceButton, currentLanguage, onToggleLanguage, title, card, otherCard, onCompare, updateCards, remainingCards, isClickable = true, isRevealed = false, isComputerCard = false}) => {

  const resetResultText = () => {
    setShowResultText(false);
};

  const cardText = currentLanguage === 'en' ? card.textE : card.textD;
  const handlePropertyClick = (property) => {
    if (isClickable) {
      onCompare(property, card); // Übergeben des Klickereignisses und der Karte an die Vergleichsfunktion
    }
  };
  
 return (
  <div className="card-section">
      <div className='cards-text'>
        <h2>{title}<img src={Icon} alt='cards-icon' className='icon'/>{remainingCards}</h2>
      </div>
      {card && (
        <Card
        isPlayerTurn={isPlayerTurn}
          isComputerNextClicked={isComputerNextClicked}
          showComputerChoiceButton={showComputerChoiceButton}
          card={card} 
          computerCard={otherCard} 
          onCompare={onCompare} 
          updatePlayerCards={updateCards.updatePlayerCards} 
          updateComputerCards={updateCards.updateComputerCards} 
          isClickable={isClickable}
          isRevealed={isRevealed} 
          isComputerCard={isComputerCard}
          currentLanguage={currentLanguage}
        />
      )}
      </div>
    );
  };

  export default CardDisplay;
