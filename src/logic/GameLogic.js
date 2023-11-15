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
    if (playerCard[propertyName] > computerCard[propertyName]) {
      return 'win';
    } else if (playerCard[propertyName] < computerCard[propertyName]) {
      return 'lose';
    } else {
      return 'draw';
    }
  };
  
  
  