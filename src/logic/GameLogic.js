export const shuffleCards = (cards) => {
    console.log("Karten mischen:", cards);
    for (let i = cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cards[i], cards[j]] = [cards[j], cards[i]];
    }
    console.log("Gemischte Karten:", cards);
    return cards;
};

export const dealCards = (shuffledCards) => {
  console.log("Karten austeilen:", shuffledCards);
  const half = Math.ceil(shuffledCards.length / 2);
  const playerCards = shuffledCards.slice(0, half);
  const computerCards = shuffledCards.slice(half);
  console.log("Spielerkarten:", playerCards, "Computerkarten:", computerCards);
  return { playerCards, computerCards };
};

export const compareCardProperties = (playerCard, computerCard, propertyName) => {
  console.log(`Eigenschaften vergleichen: ${propertyName}, Spielerkarte:`, playerCard, "Computerkarte:", computerCard);

  const playerValue = playerCard[propertyName];
  const computerValue = computerCard[propertyName];

  if (playerValue > computerValue) {
      console.log("Ergebnis: Spieler gewinnt");
      return 'win';
  } else if (playerValue < computerValue) {
      console.log("Ergebnis: Spieler verliert");
      return 'lose';
  } else {
      console.log("Ergebnis: Unentschieden");
      return 'draw';
  }
};


export const selectHighestPropertyForComputer = (computerCard) => {
  console.log("Höchste Eigenschaft für Computer auswählen, Karte:", computerCard);

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
  console.log("Ausgewählte Eigenschaft:", selectedProperty);

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




  
  
  

  
  