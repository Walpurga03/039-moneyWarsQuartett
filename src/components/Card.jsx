// Importieren der notwendigen Abhängigkeiten und Komponenten
import React, { useState } from 'react';
import PropTypes from 'prop-types'; // Für die Validierung der Prop-Typen
import '../styles/Card.css'; // Stil-Datei für die Kartenkomponente
import RatingScale from './RatingScale'; // Komponente für die Bewertungsskala
import { compareCardProperties } from '../logic/GameLogic'; // Funktion zum Vergleichen von Karteigenschaften

// Card-Komponente zur Darstellung einer einzelnen Spielkarte
const Card = ({ card, computerCard, onCompare, isClickable, isRevealed, isComputerCard }) => {
  const [showFullText, setShowFullText] = useState(false); // Zustand für das Anzeigen des vollen Textes
  const [result, setResult] = useState(''); // Zustand für das Speichern des Ergebnisses eines Vergleichs

  // Funktion zum Umschalten der Textanzeige
  const toggleText = () => {
    setShowFullText(!showFullText);
  };

  // Extrahieren der Eigenschaften der Karte
    const { textE, 
        property1, property1E, 
        property2, property2E, 
        property3, property3E, 
        property4, property4E, 
        property5, property5E,
        image, backCard } = card;
  
   // Funktion, die aufgerufen wird, wenn auf eine Eigenschaft der Karte geklickt wird
   const handlePropertyClick = (event) => {
    if (!isClickable) return;
    const propertyName = event.target.getAttribute('data-property');

    // Vergleich der Eigenschaften und Aktualisierung des Ergebnisses
    if (computerCard && propertyName) {
      const comparisonResult = compareCardProperties(card, computerCard, propertyName);
      setResult(comparisonResult);
      onCompare(comparisonResult, propertyName);
    }
  };

  console.log("isClickable in Card:", isClickable);

      // Rendern der Karte mit Eigenschaften und Steuerungselementen
    return (
        <>
          <div className='result-text'>
            {result === 'win' && <p className='win'>Win</p>}
            {result === 'lose' && <p className='lose'>Lose</p>}
            {result === 'draw' && <p className='draw'>Draw</p>}
          </div>
          {isComputerCard && !isRevealed ? (
            <div className="card-back">
              <img src={backCard} alt="Back of the Card" />
            </div>
          ) : (
            <div className="card-front">
              <div className="card-upperArena">
                <img src={image} alt="Card Image" />
                <ul className="card-ul">
                  <li className={`card-li ${isClickable ? 'clickable' : ''}`} data-property="property1" onClick={handlePropertyClick}>{property1E}: <span className="card-li-span-since">{property1}</span></li>
                  <li className={`card-li ${isClickable ? 'clickable' : ''}`} data-property="property2" onClick={handlePropertyClick}>{property2E}: <span className="card-li-span">{property2}<RatingScale value={property2} fillColor="#DE9796" /></span></li>
                  <li className={`card-li ${isClickable ? 'clickable' : ''}`} data-property="property3" onClick={handlePropertyClick}>{property3E}: <span className="card-li-span">{property3}<RatingScale value={property3} fillColor="#CEDBE6" /></span></li>
                  <li className={`card-li ${isClickable ? 'clickable' : ''}`} data-property="property4" onClick={handlePropertyClick}>{property4E}: <span className="card-li-span">{property4}<RatingScale value={property4} fillColor="#78CBB3" /></span></li>
                  <li className={`card-li ${isClickable ? 'clickable' : ''}`} data-property="property5" onClick={handlePropertyClick}>{property5E}: <span className="card-li-span">{property5}<RatingScale value={property5} fillColor="#E3C5B1" /></span></li>
                </ul>
              </div>
              <div className="card-text">
                <p className='card-text-p'>{showFullText ? textE : `${textE.substring(0, 100)}...`}</p>
                <button onClick={toggleText}>{showFullText ? 'Less' : 'More'}</button>
              </div>
            </div>
          )}
        </> 
    );
  };

  // PropType-Validierung für die Card-Komponente
  Card.propTypes = {
    card: PropTypes.shape({
      textE: PropTypes.string.isRequired,
      property1: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
      property2: PropTypes.number.isRequired,
      property3: PropTypes.number.isRequired,
      property4: PropTypes.number.isRequired,
      property5: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
      backCard: PropTypes.string
    }).isRequired,
    computerCard: PropTypes.shape({
      textE: PropTypes.string,
      property1: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      property2: PropTypes.number,
      property3: PropTypes.number,
      property4: PropTypes.number,
      property5: PropTypes.number,
      image: PropTypes.string,
      backCard: PropTypes.string
    }),
    isClickable: PropTypes.bool.isRequired, // `isClickable` als separates Prop außerhalb von `card`
    onCompare: PropTypes.func.isRequired,
    isRevealed: PropTypes.bool.isRequired,
    isComputerCard: PropTypes.bool.isRequired
  };
  
  
export default Card; // Exportieren der Card-Komponente für die Verwendung in anderen Teilen der Anwendung
