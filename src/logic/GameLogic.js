/*Zweck: Diese Funktion mischt ein Array von Karten. Sie geht das Array von hinten durch und vertauscht jedes Element mit einem zufällig ausgewählten Element aus einem Teil des Arrays, das dieses und alle vorherigen Elemente umfasst.
Anwendung: Verwendet, um die Karten vor dem Beginn eines Spiels zufällig anzuordnen. */
export const shuffleCards = (cards) => {
    for (let i = cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cards[i], cards[j]] = [cards[j], cards[i]];
    }
    return cards;
};
/*Zweck: Diese Funktion teilt die gemischten Karten in zwei Hälften auf - eine für den Spieler und eine für den Computer.
Anwendung: Verwendet, um jedem Spieler zu Beginn des Spiels einen Satz Karten zuzuteilen. */
export const dealCards = (shuffledCards) => {
  const half = Math.ceil(shuffledCards.length / 2);
  const playerCards = shuffledCards.slice(0, half);
  const computerCards = shuffledCards.slice(half);
  return { playerCards, computerCards };
};
/*Zweck: Diese Funktion vergleicht eine bestimmte Eigenschaft (z.B. 'Jahr', 'Knappheit') zwischen einer Spielerkarte und einer Computerkarte. Sie gibt das Ergebnis dieses Vergleichs zurück ('win', 'lose', 'draw').
Anwendung: Wird aufgerufen, wenn der Spieler eine Eigenschaft auswählt, um sie mit der entsprechenden Eigenschaft der Computerkarte zu vergleichen. */
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
  const propertyToCompare = propertyName === 'property1' ? 'property0' : propertyName;

  const readablePropertyName = propertyNamesMapping[propertyToCompare];
  const playerValue = playerCard[propertyToCompare];
  const computerValue = computerCard[propertyToCompare];
  console.log(`Vergleich auf Basis von '${propertyToCompare}': Spieler = ${playerValue}, Computer = ${computerValue}`);

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
/*Zweck: Diese Funktion aktualisiert die Kartenstapel basierend auf dem Ergebnis des Kartenvergleichs. Karten werden zwischen Spieler- und Computerstapel verschoben, oder es werden Karten zum Unentschieden-Stapel hinzugefügt.
Anwendung: Wird aufgerufen, nachdem das Ergebnis des Kartenvergleichs feststeht, um die Kartenstapel entsprechend zu aktualisieren. */
export const updateCardStacks = (result, playerCards, computerCards, drawPile, setPlayerCards, setComputerCards, setDrawPile, setGameOver, setLastWinner, setShowComputerChoiceButton, setPlayerTurn) => {
  let updatedPlayerCards = [...playerCards];
  let updatedComputerCards = [...computerCards];
  let updatedDrawPile = [...drawPile];

  if (result === 'win') {
    setLastWinner('player');
    setShowComputerChoiceButton(false);
    updatedPlayerCards.push(computerCards[0], playerCards[0], ...updatedDrawPile);
    updatedComputerCards.shift(); 
    updatedPlayerCards.shift();
    updatedDrawPile = [];
    setPlayerTurn(true);
  } else if (result === 'lose') {
    setShowComputerChoiceButton(true);
    setLastWinner('computer');
    updatedComputerCards.push(playerCards[0], computerCards[0], ...updatedDrawPile);
    updatedComputerCards.shift();
    updatedPlayerCards.shift();
    updatedDrawPile = [];
  } else if (result === 'draw') {
    updatedDrawPile.push(playerCards[0], computerCards[0]);
    updatedPlayerCards.shift();
    updatedComputerCards.shift();
  }

  setPlayerCards(updatedPlayerCards);
  setComputerCards(updatedComputerCards);
  setDrawPile(updatedDrawPile);

  if (updatedPlayerCards.length === 0 || updatedComputerCards.length === 0) {
    setGameOver(true);
  }
};
/*Zweck: Diese Funktion bestimmt die stärkste Eigenschaft einer Computerkarte, die für den Vergleich mit einer Spielerkarte verwendet werden soll.
Anwendung: Wird genutzt, um für den Computerzug die optimale Eigenschaft für den Vergleich auszuwählen. */
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
/*Zweck: Diese Funktion fügt interaktive Stilelemente hinzu, die auf der aktuellen Mausposition basieren. Dies wird oft für visuelle Effekte verwendet, wie z.B. das Ändern des Aussehens eines Elements in Abhängigkeit von der Position des Mauszeigers.
Anwendung: Wird beim Laden der Seite ausgeführt, um interaktive Stilelemente zu Elementen mit der Klasse mouse-position-css hinzuzufügen. */
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