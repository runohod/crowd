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
  let response = await fetch('https://jsonplaceholder.typicode.com/posts/1')
  
    //успешен ли запрос
    if (!response.ok) {
      throw new Error(`Ошибка HTTP: ${response.status}`);
    }
  
  let content = await response.json()
  console.log(content)
  
  }
  
  getResponse()



  async function getResponse() {
    try {
      let response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
  
      //проверка на положительный запрос
      if (!response.ok) {
        throw new Error(`Ошибка HTTP: ${response.status}`);
      }
  
      //ответ как JSON
      let content = await response.json();
      console.log(content); // Выводим ответ в консоль
    } catch (error) {
      //сообщение об ошибке
      console.error('Произошла ошибка:', error);
    }
  }
  
  // Вызываем функцию
  getResponse();


///////////ПРИМЕР 


ler async function {
  async url = 'https://jsonplaceholder.typicode.com/users/1';
  async response = await fetch(url);
  async content = await response.json();
}
  console.log(content.name); 



fetch('https://jsonplaceholder.typicode.com/users/1');
.then(response => response.json())
.then(data => {
  console.log('Имя ${daa.name}');
  console.log('Email $[data.email]');
})

.catch(error => console.error('ошибка ' error));

