import React, { useState } from 'react';
import './App.css';

function App() {
  const [count, setCounter] = useState(0)
  const handClick =() => {
    setCounter(count + 1);
  };
  
      return (
    <div className="App">
        <h3>кол-во кликов по котам:</h3>
        <button onClick={handClick}>клик по коту</button>

    </div>
  );

}

export default App;

