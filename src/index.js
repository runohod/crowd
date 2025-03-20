function groupBy(array, fn) {
  let result = {}; // Создаем пустой объект для результата

  array.forEach((item) => {
      const key = fn(item); // Вычисляем ключ с помощью переданной функции
      if (!result[key]) { // Если ключа еще нет в объекте, создаем пустой массив
          result[key] = [];
      }
      result[key].push(item); // Добавляем элемент в соответствующий массив
  });

  return result; // Возвращаем результат
}

// Пример 1
const array1 = [
  { id: 1 },
  { id: 1 },
  { id: 2 }
];

const fn = (item) => item.id;

console.log(groupBy(array1, fn));
// {
//   1: [{ id: 1 }, { id: 1 }],
//   2: [{ id: 2 }]
// }