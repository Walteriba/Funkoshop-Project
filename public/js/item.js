// Funcionalidad botones + y -
const add = document.querySelector("#add");
const subtract = document.querySelector("#subtract");
const quantity = document.querySelector("#campo_numerico");

add.addEventListener(
  "click",
  () => (quantity.value = Number(quantity.value) + 1)
);

subtract.addEventListener("click", () => {
  if (Number(quantity.value) > 1) {
    quantity.value = Number(quantity.value) - 1;
  }
});

//Evitar que se pongan numeros negativos en el campo
quantity.addEventListener(
  "change",
  () =>
    (quantity.value = Number(quantity.value) < 1 ? 1 : Number(quantity.value))
);
