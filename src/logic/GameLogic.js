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
    if (playerCard[propertyName] > computerCard[propertyName]) {
        return 'win';
    } else if (playerCard[propertyName] < computerCard[propertyName]) {
        return 'lose';
    } else {
        return 'draw';
    }
};

export const selectHighestPropertyForComputer = (computerCard) => {
  console.log("Höchste Eigenschaft für Computer auswählen, Karte:", computerCard);
  let highestValue = -Infinity;
  let selectedProperty = '';
  // Logik hier...
  console.log("Ausgewählte Eigenschaft:", selectedProperty);
  return selectedProperty;
};

export const addMousePositionToCss = () => {
  console.log("Mausposition zu CSS hinzufügen");
  const elements = document.querySelectorAll(".mouse-position-css");
  // Event Listener-Logik hier...
  return elements;
};


window.addEventListener("load", addMousePositionToCss(), false);




  
  
  

  
  