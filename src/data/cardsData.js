//id        -> vortlaufende id-nummer
//name      -> was
//property0 -> Since / Seit wann (anzeige)
//property1 -> Since / Seit wann (zum rechnen)
//property2 -> Scarcity / Knappheit
//property3 -> Durability / Lebensdauer
//property4 -> Divisibility / Teilbarkeit
//property5 -> Transportability / Transportierbarkeit
//image     -> pfad zum bild
//textE     -> Englische info Text 
//textD     -> Deutscher info Text

const cardsData = [
    {
      id: 1,                                //-> id-nummer
      name: "euro",                         //-> was
      property0: -2002,                     //-> (zum rechnen)
      property1: "2002",                    //-> Since/Seit wann (anzeige)
      property1E: "Since",                  //-> Englisch
      property1D: "Seit",                   //-> Deutsch
      property2: 1,                         //-> Scarcity/Knappheit
      property2E: "Scarcity",               //-> Englisch
      property2D: "Knappheit",              //-> Deutsch
      property3: 2,                         //-> Durability/Lebensdauer
      property3E: "Durability",             //-> Englisch 
      property3D: "Lebensdauer",            //-> Deutsch   
      property4: 4,                         //-> Divisibility/Teilbarkeit
      property4E: "Divisibility",           //-> Englisch
      property4D: "Teilbarkeit",            //-> Deutsch
      property5: 4,                         //-> Transportability/Transportierbarkeit
      property5E: "Transportability",       //-> Englisch 
      property5D: "Transportierbarkeit",    //-> Deutsch
      image: "/images/frontsite/euro.png",  //-> pfad zum bild
      textE: "The euro is the official currency of the European Union. It is used by 19 of the 27 member states of the EU, as well as by several non-member countries. It’s abbreviated as EUR and is represented by the symbol €. Furthermore, it is the second most traded currency in the world.",
      textD: "Deutsch info text"
    },
     {
      id: 2,                                //-> id-nummer
      name: "bitcoin",                      //-> was
      property0: -2009,                     //-> (zum rechnen)
      property1: "2009",                    //-> Since/Seit wann (anzeige)
      property1E: "Since",                  //-> Englisch
      property1D: "Seit",                   //-> Deutsch
      property2: 5,                         //-> Scarcity/Knappheit
      property2E: "Scarcity",               //-> Englisch
      property2D: "Knappheit",              //-> Deutsch
      property3: 3,                         //-> Durability/Lebensdauer
      property3E: "Durability",             //-> Englisch 
      property3D: "Lebensdauer",            //-> Deutsch   
      property4: 5,                         //-> Divisibility/Teilbarkeit
      property4E: "Divisibility",           //-> Englisch
      property4D: "Teilbarkeit",            //-> Deutsch
      property5: 5,                         //-> Transportability/Transportierbarkeit
      property5E: "Transportability",       //-> Englisch 
      property5D: "Transportierbarkeit",    //-> Deutsch
      image: "/images/frontsite/bitcoin.png",  //-> pfad zum bild
      textE: "Bitcoin is the first decentralized network that allows the transfer of value without a central authority. The immut-able supply cap of 21 Million bitcoin makes it the scarcest money in the world. The protocol is open-source, based on a blockchain and peer-to-peer.",
      textD: "Deutsch info text"
     },
     {
      id: 3,                                //-> id-nummer
      name: "ethereum",                     //-> was
      property0: -2015,                     //-> (zum rechnen)
      property1: "2015",                    //-> Since/Seit wann (anzeige)
      property1E: "Since",                  //-> Englisch
      property1D: "Seit",                   //-> Deutsch
      property2: 2,                         //-> Scarcity/Knappheit
      property2E: "Scarcity",               //-> Englisch
      property2D: "Knappheit",              //-> Deutsch
      property3: 2,                         //-> Durability/Lebensdauer
      property3E: "Durability",             //-> Englisch 
      property3D: "Lebensdauer",            //-> Deutsch   
      property4: 5,                         //-> Divisibility/Teilbarkeit
      property4E: "Divisibility",           //-> Englisch
      property4D: "Teilbarkeit",            //-> Deutsch
      property5: 5,                         //-> Transportability/Transportierbarkeit
      property5E: "Transportability",       //-> Englisch 
      property5D: "Transportierbarkeit",    //-> Deutsch
      image: "/images/frontsite/ethereum.png",  //-> pfad zum bild
      textE: "Ethereum is an open-source, distributed system which allows the creation, management, and execution of programs or contracts (smart contracts) in its own blockchain. One unit in the Ethereum Network is called one ether.",
      textD: "Deutsch info text"
     },
     {
      id: 4,                                //-> id-nummer
      name: "monero",                       //-> was
      property0: -2014,                     //-> (zum rechnen)
      property1: "2014",                    //-> Since/Seit wann (anzeige)
      property1E: "Since",                  //-> Englisch
      property1D: "Seit",                   //-> Deutsch
      property2: 2,                         //-> Scarcity/Knappheit
      property2E: "Scarcity",               //-> Englisch
      property2D: "Knappheit",              //-> Deutsch
      property3: 2,                         //-> Durability/Lebensdauer
      property3E: "Durability",             //-> Englisch 
      property3D: "Lebensdauer",            //-> Deutsch   
      property4: 5,                         //-> Divisibility/Teilbarkeit
      property4E: "Divisibility",           //-> Englisch
      property4D: "Teilbarkeit",            //-> Deutsch
      property5: 5,                         //-> Transportability/Transportierbarkeit
      property5E: "Transportability",       //-> Englisch 
      property5D: "Transportierbarkeit",    //-> Deutsch
      image: "/images/frontsite/monero.png",  //-> pfad zum bild
      textE: "Monero is a decentralized cryptocurrency. It uses a public distributed ledger with privacy-enhancing technologies that obfuscate transactions to achieve anonymity and fungibility. However, the supply can’t be verified because of this feature.",
      textD: "Deutsch info text"
     },
     {
      id: 5,                                //-> id-nummer
      name: "gold",                       //-> was
      property0: 6000,                     //-> (zum rechnen)
      property1: "6000 BC",                    //-> Since/Seit wann (anzeige)
      property1E: "Since",                  //-> Englisch
      property1D: "Seit",                   //-> Deutsch
      property2: 4,                         //-> Scarcity/Knappheit
      property2E: "Scarcity",               //-> Englisch
      property2D: "Knappheit",              //-> Deutsch
      property3: 5,                         //-> Durability/Lebensdauer
      property3E: "Durability",             //-> Englisch 
      property3D: "Lebensdauer",            //-> Deutsch   
      property4: 3,                         //-> Divisibility/Teilbarkeit
      property4E: "Divisibility",           //-> Englisch
      property4D: "Teilbarkeit",            //-> Deutsch
      property5: 3,                         //-> Transportability/Transportierbarkeit
      property5E: "Transportability",       //-> Englisch 
      property5D: "Transportierbarkeit",    //-> Deutsch
      image: "/images/frontsite/gold.png",  //-> pfad zum bild
      textE: "Gold is a precious metal that has been used as a form of money for thousands of years. It is highly valued due to its rarity, beauty, and versatility, and it has played a significant role in the development of modern currency systems. It is resistant to corrosion and does not tarnish, which makes it well-suited for use in coins and other forms of currency.",
      textD: "Deutsch info text"
     },
     {
      id: 6,                                //-> id-nummer
      name: "silver",                       //-> was
      property0: 5000,                     //-> (zum rechnen)
      property1: "5000 BC",                    //-> Since/Seit wann (anzeige)
      property1E: "Since",                  //-> Englisch
      property1D: "Seit",                   //-> Deutsch
      property2: 2,                         //-> Scarcity/Knappheit
      property2E: "Scarcity",               //-> Englisch
      property2D: "Knappheit",              //-> Deutsch
      property3: 4,                         //-> Durability/Lebensdauer
      property3E: "Durability",             //-> Englisch 
      property3D: "Lebensdauer",            //-> Deutsch   
      property4: 3,                         //-> Divisibility/Teilbarkeit
      property4E: "Divisibility",           //-> Englisch
      property4D: "Teilbarkeit",            //-> Deutsch
      property5: 3,                         //-> Transportability/Transportierbarkeit
      property5E: "Transportability",       //-> Englisch 
      property5D: "Transportierbarkeit",    //-> Deutsch
      image: "/images/frontsite/silver.png",  //-> pfad zum bild
      textE: "Silver is a metal that has been used as a form of currency for centuries. It is less valuable than gold, but it is still highly prized due to its rarity and beauty. Silver has been used in the production of coins and other forms of currency in many societies throughout history, and it continues to be used as a store of value and a medium of exchange in some parts of the world.",
      textD: "Deutsch info text"
     },
     {
      id: 7,                                    //-> id-nummer
      name: "copper",                           //-> was
      property0: 8000,                          //-> (zum rechnen)
      property1: "8000 BC",                     //-> Since/Seit wann (anzeige)
      property1E: "Since",                      //-> Englisch
      property1D: "Seit",                       //-> Deutsch
      property2: 3,                             //-> Scarcity/Knappheit
      property2E: "Scarcity",                   //-> Englisch
      property2D: "Knappheit",                  //-> Deutsch
      property3: 4,                             //-> Durability/Lebensdauer
      property3E: "Durability",                 //-> Englisch 
      property3D: "Lebensdauer",                //-> Deutsch   
      property4: 3,                             //-> Divisibility/Teilbarkeit
      property4E: "Divisibility",               //-> Englisch
      property4D: "Teilbarkeit",                //-> Deutsch
      property5: 2,                             //-> Transportability/Transportierbarkeit
      property5E: "Transportability",           //-> Englisch 
      property5D: "Transportierbarkeit",        //-> Deutsch
      image: "/images/frontsite/copper.png",    //-> pfad zum bild
      textE: "It was one of the first metals to be used as a medium of exchange due to its malleability, and resistance to corrosion. Copper coins were widely used in ancient civilizations such as Greece and Rome, and they continued to be used as a form of currency in many parts of the world until they were eventually replaced by paper money and other forms of currency.",
      textD: "Deutsch info text"
     },
     {
      id: 8,                                    //-> id-nummer
      name: "us-dollar",                        //-> was
      property0: -1785,                         //-> (zum rechnen)
      property1: "1785",                        //-> Since/Seit wann (anzeige)
      property1E: "Since",                      //-> Englisch
      property1D: "Seit",                       //-> Deutsch
      property2: 1,                             //-> Scarcity/Knappheit
      property2E: "Scarcity",                   //-> Englisch
      property2D: "Knappheit",                  //-> Deutsch
      property3: 3,                             //-> Durability/Lebensdauer
      property3E: "Durability",                 //-> Englisch 
      property3D: "Lebensdauer",                //-> Deutsch   
      property4: 4,                             //-> Divisibility/Teilbarkeit
      property4E: "Divisibility",               //-> Englisch
      property4D: "Teilbarkeit",                //-> Deutsch
      property5: 4,                             //-> Transportability/Transportierbarkeit
      property5E: "Transportability",           //-> Englisch 
      property5D: "Transportierbarkeit",        //-> Deutsch
      image: "/images/frontsite/us-dollar.png", //-> pfad zum bild
      textE: "The U.S. dollar is the official currency of the United States of America and is the world‘s primary reserve currency. It is abbreviated as USD and is divided into 100 cents. The U.S. dollar is issued by the Federal Reserve, the central bank of the United States. The value of the U.S. dollar is influenced by various economic and political factors, and it has fluctuated significantly over time.",
      textD: "Deutsch info text"
     },
     {
      id: 9,                                //-> id-nummer
      name: "pound",                        //-> was
      property0: -700,                      //-> (zum rechnen)
      property1: "700",                     //-> Since/Seit wann (anzeige)
      property1E: "Since",                  //-> Englisch
      property1D: "Seit",                   //-> Deutsch
      property2: 1,                         //-> Scarcity/Knappheit
      property2E: "Scarcity",               //-> Englisch
      property2D: "Knappheit",              //-> Deutsch
      property3: 4,                         //-> Durability/Lebensdauer
      property3E: "Durability",             //-> Englisch 
      property3D: "Lebensdauer",            //-> Deutsch   
      property4: 4,                         //-> Divisibility/Teilbarkeit
      property4E: "Divisibility",           //-> Englisch
      property4D: "Teilbarkeit",            //-> Deutsch
      property5: 4,                         //-> Transportability/Transportierbarkeit
      property5E: "Transportability",       //-> Englisch 
      property5D: "Transportierbarkeit",    //-> Deutsch
      image: "/images/frontsite/pound.png", //-> pfad zum bild
      textE: "The British pound, also known as the pound sterling, is the official currency of the United Kingdom and nine of its associated territories. 1200 years old, the pound sterling is the oldest currency that is still in use today. It’s considered a reserve currency as it is widely used in international trade.",
      textD: "Deutsch info text"
     },
     {
      id: 10,                                //-> id-nummer
      name: "yen",                       //-> was
      property0: -1870,                     //-> (zum rechnen)
      property1: "1870",                    //-> Since/Seit wann (anzeige)
      property1E: "Since",                  //-> Englisch
      property1D: "Seit",                   //-> Deutsch
      property2: 1,                         //-> Scarcity/Knappheit
      property2E: "Scarcity",               //-> Englisch
      property2D: "Knappheit",              //-> Deutsch
      property3: 3,                         //-> Durability/Lebensdauer
      property3E: "Durability",             //-> Englisch 
      property3D: "Lebensdauer",            //-> Deutsch   
      property4: 4,                         //-> Divisibility/Teilbarkeit
      property4E: "Divisibility",           //-> Englisch
      property4D: "Teilbarkeit",            //-> Deutsch
      property5: 4,                         //-> Transportability/Transportierbarkeit
      property5E: "Transportability",       //-> Englisch 
      property5D: "Transportierbarkeit",    //-> Deutsch
      image: "/images/frontsite/yen.png",  //-> pfad zum bild
      textE: "The Japanese yen is the official currency of Japan and is issued by the Bank of Japan. The yen is abbreviated as JPY and is represented by the symbol ¥. It is the third most traded currency in the foreign exchange market, after the United States dollar and the euro.",
      textD: "Deutsch info text"
     },
    
    
    // {
    //   id: 5,
    //   name: "gold",
    //   property0: "6000 BC",
    //   property1: 6000,
    //   property2: 4,
    //   property3: 5,
    //   property4: 3,
    //   property5: 3,
    //   image: "/images/frontsite/gold.png",
    //   textE: "Gold is a precious metal that has been used as a form of money for thousands of years. It is highly valued due to its rarity, beauty, and versatility, and it has played a significant role in the development of modern currency systems. It is resistant to corrosion and does not tarnish, which makes it well-suited for use in coins and other forms of currency.",
    //   textD: "----"
    // },
   
  
  
   
    
    
    
  ];
  
  export default cardsData;
  