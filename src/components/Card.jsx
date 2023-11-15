import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../styles/Card.css';
import RatingScale from './RatingScale';
import { compareCardProperties } from '../logic/GameLogic';

const Card = ({ card, computerCard, onCompare}) => {
    const [showFullText, setShowFullText] = useState(false);
    const [result, setResult] = useState('');
  
  
    const toggleText = () => {
      setShowFullText(!showFullText);
    };
  
    const { textE, 
        property1, property1E, 
        property2, property2E, 
        property3, property3E, 
        property4, property4E, 
        property5, property5E,
        image } = card;
  
    const handlePropertyClick = (event) => {
      const propertyName = event.target.getAttribute('data-property');
  
      if (computerCard && propertyName) {
        const comparisonResult = compareCardProperties(card, computerCard, propertyName);
        setResult(comparisonResult);
        onCompare(comparisonResult, propertyName);
      }
    };
  
    return (
      <>
        <div className='result-text'>
          {result === 'win' && <p className='win'>Win</p>}
          {result === 'lose' && <p className='lose'>Lose</p>}
          {result === 'draw' && <p className='draw'>Draw</p>}
        </div>
        <div className="card-front">
          <div className="card-upperArena">
            <img src={image} alt="Card Image" />
            <ul className="card-ul">
              <li className="card-li" data-property="property0" onClick={handlePropertyClick}>{property1E}: <span className="card-li-span-since">{property1}</span></li>
              <li className="card-li" data-property="property2" onClick={handlePropertyClick}>{property2E}: <span className="card-li-span">{property2}<RatingScale value={property2} fillColor="#DE9796" /></span></li>
              <li className="card-li" data-property="property3" onClick={handlePropertyClick}>{property3E}: <span className="card-li-span">{property3}<RatingScale value={property3} fillColor="#CEDBE6" /></span></li>
              <li className="card-li" data-property="property4" onClick={handlePropertyClick}>{property4E}: <span className="card-li-span">{property4}<RatingScale value={property4} fillColor="#78CBB3" /></span></li>
              <li className="card-li" data-property="property5" onClick={handlePropertyClick}>{property5E}: <span className="card-li-span">{property5}<RatingScale value={property5} fillColor="#E3C5B1" /></span></li>
            </ul>
          </div>
          <div className="card-text">
            <p className='card-text-p'>{showFullText ? textE : `${textE.substring(0, 100)}...`}</p>
            <button onClick={toggleText}>{showFullText ? 'Less' : 'More'}</button>
          </div>
        </div>
      </>
    );
  };
  
  Card.propTypes = {
    card: PropTypes.shape({
      textE: PropTypes.string.isRequired,
      property1: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
      property2: PropTypes.number.isRequired,
      property3: PropTypes.number.isRequired,
      property4: PropTypes.number.isRequired,
      property5: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
    }).isRequired,
    computerCard: PropTypes.shape({
      textE: PropTypes.string,
      property1: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      property2: PropTypes.number,
      property3: PropTypes.number,
      property4: PropTypes.number,
      property5: PropTypes.number,
      image: PropTypes.string
    }),
    onCompare: PropTypes.func.isRequired,
    updatePlayerCards: PropTypes.func.isRequired,
    updateComputerCards: PropTypes.func.isRequired,
   
  };
  
  
  export default Card;