const obj = {
  value: 42,
  getValue: function () {
    return this.value;
  },
};

const unboundedGetValue = obj.getValue;
console.log(unboundedGetValue()); // Что выведет?