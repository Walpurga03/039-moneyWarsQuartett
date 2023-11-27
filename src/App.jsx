// Importieren der notwendigen Abhängigkeiten
import React from 'react'; // Grundlegendes React-Paket
import './App.css'; // Stil-Datei für die App-Komponente
import GameBoard from './components/GameBoard'; // Importieren der GameBoard-Komponente aus den Komponenten

/**
 * Die App-Komponente dient als Wurzelkomponente für die gesamte Anwendung.
 * Sie ist für das Rendern der Hauptstruktur und des Layouts der Anwendung verantwortlich.
 * In diesem Fall ist ihre primäre Funktion das Rendern des GameBoard.
 */
const App = () => {
  return (
    <React.StrictMode>
      <div className="App">
        {/* Einbinden der GameBoard-Komponente.
            Hier können zusätzliche Props und Zustände an GameBoard übergeben werden, falls erforderlich. */}
        <GameBoard/>
      </div>
    </React.StrictMode>
  );
}

export default App; // Exportieren der App-Komponente für die Verwendung in anderen Teilen der Anwendung.
