import React, { useState, useEffect} from 'react';
import './App.css';

function App() {
  const [count, setCounter] = useState(0)
  const [cats, setCats] = useState(0)
  const handClick =() => {
    setCounter(count + 1);
  };
  
  useEffect(()=>{
    async function getResponse() {
        try {
          let response = await fetch('https://api.thecatapi.com/v1/images/search?limit=10');
      
          //проверка на положительный запрос
          if (!response.ok) {
            throw new Error(`Ошибка HTTP: ${response.status}`);
          }
      
          //ответ как JSON
          let content = await response.json();
          console.log(content); // Выводим ответ в консоль
          setCats(content); //сохраняетт котов в состояние
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


        ________________________________________________________________

 {/* Отображение котов с использованием map */}
 <div className="cats-container">
        {cats.map((cat) => (
          <div key={cat.id} className="cat-card">
            <img src={cat.url} alt={`Кот ${cat.id}`} className="cat-image" />
            <p>ID кота: {cat.id}</p>
          </div>
        ))}
      </div>


________________________________________________________________

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


// Как нам задать каокй то уникальный контекст
// 1) За счет aply call bind. Явно задаем
delcaration.call({ newContext: 'some' });

// 2) Это объявить функцию в объекте. Либо через объект
const user = {
    name: 'Alex',
    // Контекстом данной функции будет являться user
    greet:function() {
        console.log('Hello, my name is '+ this.name)
    },
}
user.greet();

// При вызове через точку user.greet() значение this равняется объекту до точки(user). 
// Без этого объекта this равняется глобальному объекту(в обычном режиме).В строгом режиме мы бы получили ошибку «Cannot read properties of undefined».
const greet = user.greet
greet() // Исключение, вот тут у функции не будет контекста объекта user