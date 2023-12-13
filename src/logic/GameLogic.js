export const shuffleCards = (cards) => {
    for (let i = cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cards[i], cards[j]] = [cards[j], cards[i]];
    }
    return cards;
};

export const dealCards = (shuffledCards) => {
  const half = Math.ceil(shuffledCards.length / 2);
  const playerCards = shuffledCards.slice(0, half);
  const computerCards = shuffledCards.slice(half);
  return { playerCards, computerCards };
};


export const compareCardProperties = (playerCard, computerCard, propertyName) => {
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
  // Wenn property1 ausgewählt wird, verwenden Sie property0 zum Vergleich
  const propertyToCompare = propertyName === 'property1' ? 'property0' : propertyName;

  const readablePropertyName = propertyNamesMapping[propertyToCompare];
  const playerValue = playerCard[propertyToCompare];
  const computerValue = computerCard[propertyToCompare];
  console.log(`Vergleich auf Basis von '${propertyToCompare}': Spieler = ${playerValue}, Computer = ${computerValue}`);

  // Vergleichslogik (wie zuvor, nur mit propertyToCompare statt propertyName)
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

export const selectHighestPropertyForComputer = (computerCard) => {

  let highestValue = -Infinity;
  let selectedProperty = '';

  // Überprüfen, ob alle Eigenschaften property2 bis property5 kleiner als 4 sind
  const areAllPropertiesLessThan4 = ['property2', 'property3', 'property4', 'property5'].every(prop => computerCard[prop] < 4);

  if (areAllPropertiesLessThan4) {
    // Wählen Sie property1, wenn alle Eigenschaften kleiner als 4 sind
    return 'property1';
  } else {
    // Andernfalls wählen Sie die Eigenschaft mit dem höchsten Wert unter property2 bis property5
    ['property2', 'property3', 'property4', 'property5'].forEach(prop => {
      if (computerCard[prop] > highestValue) {
        highestValue = computerCard[prop];
        selectedProperty = prop;
      }
    });
  }

  return selectedProperty;
};

export const addMousePositionToCss = () => {
  const elements = document.querySelectorAll(".mouse-position-css");
  for(const element of elements) {
      element.addEventListener("mousemove", function(e) {
          var rect = element.getBoundingClientRect();
          var x = e.clientX - rect.left; 
          var y = e.clientY - rect.top;
          element.style = "--mouse-x:" + (x / element.offsetWidth) + ";--mouse-y:" + (y / element.offsetHeight) + ";";
      });
      element.addEventListener("mouseout", function(e) {
          element.style = "";
      });
  }
  return elements;
};

window.addEventListener("load", addMousePositionToCss(), false);




  
  
  

  
  