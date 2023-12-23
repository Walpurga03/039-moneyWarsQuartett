import React from 'react'; 
import './App.css'; 
import GameBoard from './components/GameBoard'; 

const App = () => {
  return (
    <React.StrictMode>
      <div className="App">
        <GameBoard/>
      </div>
    </React.StrictMode>
  );
}

export default App; 