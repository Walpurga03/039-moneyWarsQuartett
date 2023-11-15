import React from 'react'
import Card from './Card'
import Icon from '../assets/icons/cards_icon.png'
import '../styles/CardDisplay.css';

const CardDisplay = ({ title, card, otherCard, onCompare, updateCards, remainingCards }) => {
    return (
      <div className="card-section">
        <div className='cards-text'>
          <h2>{title}<img src={Icon} alt='cards-icon' className='icon'/>{remainingCards}</h2>
        </div>
        {card && (
          <Card
            card={card}
            computerCard={otherCard}
            onCompare={onCompare}
            updatePlayerCards={updateCards.updatePlayerCards}
            updateComputerCards={updateCards.updateComputerCards}
          />
        )}
        
      </div>
    );
  };

export default CardDisplay;