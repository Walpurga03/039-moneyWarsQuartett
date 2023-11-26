// Importieren der notwendigen Abhängigkeiten
import React from 'react'; // Grundlegendes React-Paket
import './App.css'; // Stil-Datei für die App-Komponente
import GameBoard from './components/GameBoard'; // Importieren der GameBoard-Komponente aus den Komponenten

// Die App-Komponente definiert die Hauptstruktur der Anwendung.
// Diese Komponente ist für das Rendern des GameBoards verantwortlich.
const App = () => {
  return (
    <React.StrictMode>
      <div className="App">
        <GameBoard/> {/* Einbinden der GameBoard-Komponente */}
      </div>
    </React.StrictMode>
  );
}

export default App; // Exportieren der App-Komponente für die Verwendung in anderen Teilen der