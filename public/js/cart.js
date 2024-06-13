// Funcionalidad botones + y -
const addButtonList = document.querySelectorAll(".custom-increment");
const subtractButtonList = document.querySelectorAll(".custom-decrement");
const quantityInputList = document.querySelectorAll(".custom-text");
const deleteButtonList = document.querySelectorAll(".delete_item_svg");

addButtonList.forEach((addButton, index) => {
  const subtractButton = subtractButtonList[index];
  const quantityInput = quantityInputList[index];
  const deleteButton = deleteButtonList[index];

  addButton.addEventListener("click", () => {
    quantityInput.value = Number(quantityInput.value) + 1;
    sendUpdateToBackend(index, quantityInput.value);
    updateTotal();
  });

  subtractButton.addEventListener("click", () => {
    if (Number(quantityInput.value) > 1) {
      quantityInput.value = Number(quantityInput.value) - 1;
      sendUpdateToBackend(index, quantityInput.value);
      updateTotal();
    }
  });

  // Evitar que se pongan números negativos en el campo
  quantityInput.addEventListener("change", () => {
    quantityInput.value =
      Number(quantityInput.value) < 1 ? 1 : Number(quantityInput.value);
    sendUpdateToBackend(index, quantityInput.value);
    updateTotal();
  });

  // Borrar un item de la lista
  deleteButton.addEventListener("click", () => {
    const itemContainer = deleteButton.closest(".rad_shad_container.cart_item");
    const productId = itemContainer.querySelector(".product_id").innerText;

    deleteItemToBacked(productId);
    itemContainer.remove();
    updateTotal();
  });
});

// ITEM
// Función para actualizar el total
function updateTotal() {
  const cartItems = document.querySelectorAll(".cart_item");
  const totalElements = document.querySelectorAll(".total_text_item");
  let total = 0;

  cartItems.forEach((item, i) => {
    const cartQuantity = item.querySelector(".custom-text").value;
    const price = item
      .querySelector(".cart_item_price")
      .innerText.split("$")[1];
    const totalSpan = totalElements[i];

    // Calcular el total de cada elemento con dos decimales
    const itemTotal = (cartQuantity * price).toFixed(2);
    total += parseFloat(itemTotal);

    // Actualizar el total en el elemento del carrito
    totalSpan.innerText = `$${itemTotal}`;
  });

  // RESUMEN
  // Actualizar el subtotal y total en el resumen
  let cantidad_items = 0;
  cartItems.forEach((item, i) => {
    const cartQuantity = item.querySelector(".custom-text").value;
    cantidad_items += Number(cartQuantity);
  });

  const quantityOfItems = cantidad_items;
  const subtotalElement = document.querySelector("#subtotal_text");
  const totalElement = document.querySelector("#total_text");

  // Actualizar el resumen
  subtotalElement.textContent = `$${total.toFixed(2)}`;
  totalElement.textContent = `$${total.toFixed(2)}`;
  document.querySelector("#cantidad_items").textContent = quantityOfItems;
}

// ENVIAR DATA AL BACK
function sendUpdateToBackend(index, newQuantity) {
  const productIds = document.querySelectorAll(".product_id");
  const productId = productIds[index].innerText;
  const apiUrl = `/shop/cartupdate?id=${productId}&quantity=${newQuantity}`;

  fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    // body: JSON.stringify({ quantity: newQuantity }),
  })
    .then((response) => {
      if (!response.ok)
        throw new Error(`Error en la solicitud: ${response.status}`);
      return response.json();
    })
    .then((data) => console.log(data))
    .catch((error) => console.error("Error en la solicitud:", error));
}

function deleteItemToBacked(productId) {
  const apiUrl = `/shop/cartupdate/delete/${productId}`;

  fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    // body: JSON.stringify({ quantity: newQuantity }),
  })
    .then((response) => {
      if (!response.ok)
        throw new Error(`Error en la solicitud: ${response.status}`);
      return response.json();
    })
    .then((data) => console.log(data))
    .catch((error) => console.error("Error en la solicitud:", error));
}

// BOTON PAGAR
// Seleccionar el botón por su clase y agregar un event listener
document.querySelector(".pay").addEventListener("click", function () {
  // Mostrar una alerta cuando se hace clic en el botón
  alert("¡Gracias por interactuar con esta demo!");
});

//BORRAR CARRITO DINAMICAMENTE
document.addEventListener("DOMContentLoaded", () => {
  function handleDeleteButtonClick() {
    // Agregar un pequeño retraso antes de verificar y actualizar el contenido
    setTimeout(() => {
      const emptyCartObserver = document.querySelector(".empty_cart_observer");
      if (emptyCartObserver && emptyCartObserver.children.length === 0) {
        const mainCart = document.querySelector(".main_cart");
        if (mainCart) {
          mainCart.innerHTML = ""; // Limpiar el contenido actual

          // Agregar el nuevo contenido para el carrito vacío
          mainCart.innerHTML = `
            <h1 class="empty_cart_tittle">OH, CUANTO VACÍO</h1>
            <div class="empty_cart">
              <img class="empty_cart_img" src="/images/varios/shopping-cart.jpg" alt="Carrito vacío">
            </div>
            <div class="empty_cart_shop_link"><a class="empty_cart_tittle" href="/shop?filter=all">IR A COMPRAR</a></div>
          `;
        }
      }
    }, 500); // Retraso de 100 milisegundos, puedes ajustar este valor según sea necesario
  }

  // Obtener todos los botones con la clase delete_observer y asignarles un listener
  const deleteButtons = document.querySelectorAll(".delete_observer");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", handleDeleteButtonClick);
  });
});
