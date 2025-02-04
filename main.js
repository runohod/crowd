import React, { useState, useCallback } from "react";

interface ChildComponentProps {
   onClear?: () => void;
}

// Компонент второй "страницы" с практикой
const Practice = () => {
   const [count, setCount] = useState(0);

   const handleIncrement = () => {
      setCount((prev) => prev + 1);
   };

   const clearCount = useCallback(() => {
      setCount(0);
   }, []);

   return (
      <div className="container">
         <h1 className="title">Родительский компонент</h1>
         <p>Счётчик: {count}</p>
         <button className="increment-button" onClick={handleIncrement}>
            Увеличить счётчик
         </button>
         <ChildComponent onClear={clearCount} />
      </div>
   );
};

// Дочерний компонент с React.memo
const ChildComponent: React.FC<ChildComponentProps> = React.memo(({ onClear }) => {
   const [value, setValue] = useState("");

   return (
      <div
         className="child-container"
         style={{ background: "#3500ff29", padding: 10 }}
      >
         <h3>Дочерний компонент</h3>
         <p>текст: {value}</p>
         <input
            type="text"
            onChange={(e) => setValue(e.target.value)}
            value={value}
         />
         <br />
         <br />
         <button className="increment-button" onClick={onClear}>
            Отчистить
         </button>
         <ChildChildComponent />
      </div>
   );
});

const ChildChildComponent = React.memo(() => {
   return (
      <div
         className="child-container"
         style={{ background: "#3500ff29", padding: 10 }}
      >
         <h4>Самый нижний</h4>
      </div>
   );
});

// Основной компонент приложения
const App: React.FC = () => {
   return (
      <div className="app">
         <Practice />
      </div>
   );
};

export default App;