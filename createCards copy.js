// Importieren der benötigten Module aus Node.js
import fs from 'fs';
import readline from 'readline';
import { fileURLToPath } from 'url';
import path from 'path';

// Ermitteln des Dateipfades und Verzeichnisses für die aktuelle Datei
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Einrichten der readline-Schnittstelle für die Eingabeaufforderung in der Konsole
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Funktion zum Stellen einer Frage und Rückgabe der Antwort
const askQuestion = (question) => {
    return new Promise(resolve => {
        rl.question(question, answer => {
            resolve(answer);
        });
    });
};

// Funktion zum Formatieren eines Kartenobjekts in einen String
const formatCardObject = (card) => {
    let formattedCard = '{\n';
    Object.keys(card).forEach(key => {
        formattedCard += `  ${key}: ${typeof card[key] === 'string' ? `"${card[key]}"` : card[key]},\n`;
    });
    formattedCard += '}';
    return formattedCard;
};

// Funktion zum Erstellen einer neuen Karte durch Benutzereingaben
const createCard = async () => {
    let name = await askQuestion('Name der Karte:(Text->klein geschrieben) ') || 'default';
    let card = {
        id: parseInt(await askQuestion('ID der Karte (Nummer): ')),
        property0: parseInt(await askQuestion('Zum Rechnen (Nummer->alles über null mit minus): ')),
        property1: await askQuestion('Seit wann (Anzeige): '),
        property1E: 'Since',
        property1D: 'Seit',
        property2: parseInt(await askQuestion('Knappheit (Nummer): ')),
        property2E: 'Scarcity',
        property2D: 'Knappheit',
        property3: parseInt(await askQuestion('Lebensdauer (Nummer): ')),
        property3E: 'Durability',
        property3D: 'Lebensdauer',
        property4: parseInt(await askQuestion('Teilbarkeit (Nummer): ')),
        property4E: 'Divisibility',
        property4D: 'Teilbarkeit',
        property5: parseInt(await askQuestion('Transportierbarkeit (Nummer): ')),
        property5E: 'Transportability',
        property5D: 'Transportierbarkeit',
        image: `/images/frontsite/${name}.png`,
        textE: await askQuestion('Englischer Info-Text: '),
        textD: await askQuestion('Deutscher Info-Text: ')
    };

    console.log('Karte hinzugefügt:', card);
    return card;
};

// Funktion zum Lesen bestehender Karten aus einer Datei
const readExistingCards = () => {
    const filePath = path.join(__dirname, 'newCards.js');
    if (fs.existsSync(filePath)) {
        const existingData = fs.readFileSync(filePath, 'utf8');
        return existingData.substring(existingData.indexOf('['), existingData.lastIndexOf(']') + 1);
    }
    return '[]';
};

// Funktion zum Speichern der Karten in einer Datei
const saveToFile = (cards) => {
    const existingCards = JSON.parse(readExistingCards());
    const allCards = existingCards.concat(cards);
    let formattedCards = allCards.map(card => formatCardObject(card)).join(',\n');
    fs.writeFileSync('newCards.js', `const newCards = [\n${formattedCards}\n];\nexport default newCards;`);
    console.log('Datei newCards.js aktualisiert.');
    rl.close();
};

// Hauptfunktion, die das Programm steuert
const main = async () => {
    const numberOfCards = parseInt(await askQuestion('Anzahl der zu erstellenden Karten: ')) || 1;
    let cards = [];
    for (let i = 0; i < numberOfCards; i++) {
        console.log(`Erstellen von Karte ${i + 1}:`);
        cards.push(await createCard());
    }
    saveToFile(cards);
};

// Start des Hauptprogramms
main();
