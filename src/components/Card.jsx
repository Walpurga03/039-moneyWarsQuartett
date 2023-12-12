// Importieren der notwendigen Abhängigkeiten und Komponenten
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types'; // Für die Validierung der Prop-Typen
import '../styles/Card.css'; // Stil-Datei für die Kartenkomponente
import RatingScale from './RatingScale'; // Komponente für die Bewertungsskala
import { compareCardProperties, addMousePositionToCss } from '../logic/GameLogic'; // Funktion zum Vergleichen von Karteigenschaften

window.addEventListener("load", addMousePositionToCss(), false);


// Card-Komponente zur Darstellung einer einzelnen Spielkarte
const Card = ({isComputerNextClicked, showComputerChoiceButton, card, computerCard, onCompare, isClickable, isRevealed, isComputerCard,  currentLanguage, isComputerTurn, computerSelectedProperty}) => {
  console.log('isComputerNextClicked in Card:', isComputerNextClicked);

  const [showFullText, setShowFullText] = useState(false); // Zustand für das Anzeigen des vollen Textes
  const [result, setResult] = useState(''); // Zustand für das Speichern des Ergebnisses eines Vergleichs
  const [showResultText, setShowResultText] = useState(false);
  const [selectPropertyPlayer, setSelectPropertyPlayer] = useState('');
  const [selectPropertyComputer, setSelectPropertyComputer] = useState('');
  const [selectPropertyName, setSelectPropertyName] = useState('');
  const [selectedPropertyText, setSelectedPropertyText] = useState('');

  useEffect(() => {
    console.log('isComputerNextClicked in Card:', isComputerNextClicked);

    if (isComputerNextClicked) {
      // Aktivieren Sie hier die zeitgesteuerte Anzeige
      displayResultTextFor5Seconds();
    }
  }, [isComputerNextClicked]);


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
        property0,
        property1,
        property2, 
        property3, 
        property4, 
        property5, 
        image, backCard } = card;
  
   // Funktion, die aufgerufen wird, wenn auf eine Eigenschaft der Karte geklickt wird
   const handlePropertyClick = (event) => {
    if (showComputerChoiceButton) return;
    if (!isClickable) return;
    const propertyName = event.target.getAttribute('data-property');
    let displayName = propertyName; // Standardmäßig der gleiche Name

      // Verwenden Sie property1 als Anzeigenamen, wenn property0 ausgewählt wird
  if (propertyName === 'property0') {
    displayName = 'property1';
  }

    // Vergleich der Eigenschaften und Aktualisierung des Ergebnisses
    if (computerCard && propertyName) {
      const comparisonResult = compareCardProperties(card, computerCard, propertyName);
      setResult(comparisonResult);
      onCompare(comparisonResult, propertyName);
      displayResultTextFor5Seconds();
     

    const selectedPropertyPlayerValue = card[displayName];
    setSelectPropertyPlayer(selectedPropertyPlayerValue); 


    const selectedPropertyValueComputer = computerCard[displayName];
    setSelectPropertyComputer(selectedPropertyValueComputer);

    setSelectPropertyName(displayName); // Setzen des Namens der ausgewählten Eigenschaft
    const propertyLabel = displayName + (currentLanguage === 'de' ? 'D' : 'E');
    setSelectedPropertyText(card[propertyLabel] || propertyName);
    }
  };

  useEffect(() => {
    addMousePositionToCss();
  }, []);

  useEffect(() => {
    if (isComputerCard && isComputerTurn) {
      // Simulieren eines Klicks auf die Eigenschaft, die der Computer gewählt hat
      handlePropertyClickSimulation(computerSelectedProperty);
    }
  }, [isComputerCard, isComputerTurn, computerSelectedProperty]);

    return (
      <>
        <div className="container-3d">
          <div className="col-3d" style={{ "--color-heading": "gray" }}>
            <div className='card-container-3d mouse-position-css'>    
              {isComputerCard && !isRevealed ? (
                <div className="card-back">
                  <img src={backCard} alt="Back of the Card" />
                </div>
              ) : (
                <div className="card-front card-3d">
                  <div className="card-upperArena">
                    <img src={image} alt="Card Image" />
                    <ul className="card-ul">
                      <li className={`card-li ${isClickable&& !showComputerChoiceButton ? 'clickable' : 'not-clickable'}`} data-property="property0" onClick={handlePropertyClick}>{property1Label}: <span className="card-li-span-since">{property1}</span></li>
                      <li className={`card-li ${isClickable&& !showComputerChoiceButton ? 'clickable' : 'not-clickable'}`} data-property="property2" onClick={handlePropertyClick}>{property2Label}: <span className="card-li-span">{property2}<RatingScale value={property2} fillColor="#DE9796" /></span></li>
                      <li className={`card-li ${isClickable&& !showComputerChoiceButton ? 'clickable' : 'not-clickable'}`} data-property="property3" onClick={handlePropertyClick}>{property3Label}: <span className="card-li-span">{property3}<RatingScale value={property3} fillColor="#CEDBE6" /></span></li>
                      <li className={`card-li ${isClickable&& !showComputerChoiceButton ? 'clickable' : 'not-clickable'}`} data-property="property4" onClick={handlePropertyClick}>{property4Label}: <span className="card-li-span">{property4}<RatingScale value={property4} fillColor="#78CBB3" /></span></li>
                      <li className={`card-li ${isClickable&& !showComputerChoiceButton ? 'clickable' : 'not-clickable'}`} data-property="property5" onClick={handlePropertyClick}>{property5Label}: <span className="card-li-span">{property5}<RatingScale value={property5} fillColor="#E3C5B1" /></span></li>
                    </ul>
                  </div>
                  <div className="card-text">
                    <p className='card-text-p'>{showFullText ? text : `${text.substring(0, 100)}...`}</p>
                    <button onClick={toggleText}>{showFullText ? 'Less' : 'More'}</button>
                  </div>
                </div>
              )}
            </div>
            {showResultText && (
              <div className='result-text'>
                {result === 'win' && <p className='win'>{selectedPropertyText}<br/>Player Win<br/>{selectPropertyPlayer}-vs-{selectPropertyComputer}</p>}
                {result === 'lose' && <p className='lose'>{selectedPropertyText}<br/>Player Lose<br/>{selectPropertyPlayer}-vs-{selectPropertyComputer}</p>}
                {result === 'draw' && <p className='draw'>{selectedPropertyText}<br/>Draw<br/>{selectPropertyPlayer}-vs-{selectPropertyComputer}</p>}
              </div>
            )}
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
      backCard: PropTypes.string,
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
    }),
    isClickable: PropTypes.bool.isRequired, // `isClickable` als separates Prop außerhalb von `card`
    onCompare: PropTypes.func.isRequired,
    isRevealed: PropTypes.bool.isRequired,
    isComputerCard: PropTypes.bool.isRequired,
    currentLanguage: PropTypes.string.isRequired, // Stellen Sie sicher, dass currentLanguage hier bleibt

  };
  
  
export default Card; 
