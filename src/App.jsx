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

// говорим что функция асинхронная 
async function getResponse() {
  let response = await fetch('url')
  
    //успешен ли запрос
    if (!response.ok) {
      throw new Error(`Ошибка HTTP: ${response.status}`);
    }
  
  let content = await response.text()
  console.log(content)
  
  }
  
  getResponse()