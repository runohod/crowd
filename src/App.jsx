import React, { useState, useEffect} from 'react';
import './App.css';

function App() {
  const [count, setCounter, setCat] = useState(0)
  const [setCat] = useState(0)
  const handClick =() => {
    setCounter(count + 1);
  };
  
  useEffect(()=>{
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
          setCat(content); //сохраняетт котов в состояние
        } catch (error) {
          //сообщение об ошибке
          console.error('Произошла ошибка:', error);
        }
      }
      
      // Вызываем функцию
      getResponse();
    
    },[])

      return (
    <div className="App">
        <h3>кол-во кликов по котам:</h3>
        <button onClick={handClick}>клик по коту</button>

    </div>
  );

}

export default App; 

///////////ПРИМЕР 


// async function fetchUser() {
//   const url = 'https://jsonplaceholder.typicode.com/users/1';
//   const response = await fetch(url);
//   const content = await response.json();
//   console.log(content.name);
// }

// fetchUser();



// fetch('https://jsonplaceholder.typicode.com/users/1')
//   .then(response => response.json())
//   .then(data => {
//     console.log(`Имя: ${data.name}`);
//     console.log(`Email: ${data.email}`);
//   })
//   .catch(error => console.error('Ошибка:', error));

