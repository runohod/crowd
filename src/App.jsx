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


 

// РЕШЕНИЕ ЗАДАЧИ 2 
// 1) должны из массива взять все значения больше 0 
// 2) сложить их  
// 3) соблюсти условие - если нет положительных значений, функция возвращает 0 


function sumPositiveNumbers(arr) {
  let normNumber = arr.filter(function(x) {
    return (x > 0);
  });

  let sum = normNumber.reduce(function(a, b) {
    return (a + b);
  });

  if (normNumber.lenght === 0) {
   return 0;
  }

  return sum; 
}

