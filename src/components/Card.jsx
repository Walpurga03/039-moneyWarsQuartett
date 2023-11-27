// Importieren der notwendigen Abhängigkeiten und Komponenten
import React, { useState } from 'react';
import PropTypes from 'prop-types'; // Für die Validierung der Prop-Typen
import '../styles/Card.css'; // Stil-Datei für die Kartenkomponente
import RatingScale from './RatingScale'; // Komponente für die Bewertungsskala
import { compareCardProperties } from '../logic/GameLogic'; // Funktion zum Vergleichen von Karteigenschaften

// Card-Komponente zur Darstellung einer einzelnen Spielkarte
const Card = ({ card, computerCard, onCompare, isClickable, isRevealed, isComputerCard,  currentLanguage  }) => {
  const [showFullText, setShowFullText] = useState(false); // Zustand für das Anzeigen des vollen Textes
  const [result, setResult] = useState(''); // Zustand für das Speichern des Ergebnisses eines Vergleichs
  const [showResultText, setShowResultText] = useState(false);

  // Bestimmen Sie, welche Texte und Eigenschaftsbezeichnungen basierend auf der aktuellen Sprache verwendet werden sollen
  const text = currentLanguage === 'en' ? card.textE : card.textD;
  const property1Label = currentLanguage === 'en' ? card.property1E : card.property1D;
  const property2Label = currentLanguage === 'en' ? card.property2E : card.property2D;
  const property3Label = currentLanguage === 'en' ? card.property3E : card.property3D;
  const property4Label = currentLanguage === 'en' ? card.property4E : card.property4D;
  const property5Label = currentLanguage === 'en' ? card.property5E : card.property5D;

  const displayResultTextFor5Seconds = () => {
    setShowResultText(true);
  
    setTimeout(() => {
      setShowResultText(false);
    }, 5000); // 5 Sekunden warten, dann verbergen
  };

  // Funktion zum Umschalten der Textanzeige
  const toggleText = () => {
    setShowFullText(!showFullText);
  };

  // Extrahieren der Eigenschaften der Karte
    const { 
        property1,
        property2, 
        property3, 
        property4, 
        property5, 
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
       displayResultTextFor5Seconds();
    }
  };

  console.log("isClickable in Card:", isClickable);

      // Rendern der Karte mit Eigenschaften und Steuerungselementen
    return (
        <>
          {isComputerCard && !isRevealed ? (
            <div className="card-back">
              <img src={backCard} alt="Back of the Card" />
            </div>
          ) : (
            <div className="card-front">
              <div className="card-upperArena">
                <img src={image} alt="Card Image" />
                <ul className="card-ul">
                  <li className={`card-li ${isClickable ? 'clickable' : ''}`} data-property="property1" onClick={handlePropertyClick}>{property1Label}: <span className="card-li-span-since">{property1}</span></li>
                  <li className={`card-li ${isClickable ? 'clickable' : ''}`} data-property="property2" onClick={handlePropertyClick}>{property2Label}: <span className="card-li-span">{property2}<RatingScale value={property2} fillColor="#DE9796" /></span></li>
                  <li className={`card-li ${isClickable ? 'clickable' : ''}`} data-property="property3" onClick={handlePropertyClick}>{property3Label}: <span className="card-li-span">{property3}<RatingScale value={property3} fillColor="#CEDBE6" /></span></li>
                  <li className={`card-li ${isClickable ? 'clickable' : ''}`} data-property="property4" onClick={handlePropertyClick}>{property4Label}: <span className="card-li-span">{property4}<RatingScale value={property4} fillColor="#78CBB3" /></span></li>
                  <li className={`card-li ${isClickable ? 'clickable' : ''}`} data-property="property5" onClick={handlePropertyClick}>{property5Label}: <span className="card-li-span">{property5}<RatingScale value={property5} fillColor="#E3C5B1" /></span></li>
                </ul>
              </div>
              <div className="card-text">
                <p className='card-text-p'>{showFullText ? text : `${text.substring(0, 100)}...`}</p>
                <button onClick={toggleText}>{showFullText ? 'Less' : 'More'}</button>
              </div>
            </div>
          )}
            {showResultText && (
              <div className='result-text'>
                {result === 'win' && <p className='win'>Win</p>}
                {result === 'lose' && <p className='lose'>Lose</p>}
                {result === 'draw' && <p className='draw'>Draw</p>}
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
      backCard: PropTypes.string,
      currentLanguage: PropTypes.string.isRequired,
    }).isRequired,
    computerCard: PropTypes.shape({
      textE: PropTypes.string,
      property1: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      property2: PropTypes.number,
      property3: PropTypes.number,
      property4: PropTypes.number,
      property5: PropTypes.number,
      image: PropTypes.string,
      backCard: PropTypes.string,
      currentLanguage: PropTypes.string.isRequired,
    }),
    isClickable: PropTypes.bool.isRequired, // `isClickable` als separates Prop außerhalb von `card`
    onCompare: PropTypes.func.isRequired,
    isRevealed: PropTypes.bool.isRequired,
    isComputerCard: PropTypes.bool.isRequired
  };
  
  
export default Card; // Exportieren der Card-Komponente für die Verwendung in anderen Teilen der Anwendung
