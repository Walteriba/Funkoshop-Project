// Variables Globales
const addButtonList = document.querySelectorAll(".custom-increment");
const subtractButtonList = document.querySelectorAll(".custom-decrement");
const quantityInputList = document.querySelectorAll(".custom-text");
const deleteButtonList = document.querySelectorAll(".delete_observer");

// Funciones de Utilidad

// Función para actualizar el total del carrito
function updateTotal() {
  const cartItems = document.querySelectorAll(".cart_item");
  const totalElements = document.querySelectorAll(".total_text_item");
  let total = 0;

  cartItems.forEach((item, i) => {
    const cartQuantity = item.querySelector(".custom-text").value;
    const price = parseFloat(
      item.querySelector(".cart_item_price").innerText.split("$")[1]
    );
    const totalSpan = totalElements[i];

    // Calcular el total de cada elemento con dos decimales
    const itemTotal = (cartQuantity * price).toFixed(2);
    total += parseFloat(itemTotal);

    // Actualizar el total en el elemento del carrito
    totalSpan.innerText = `$${itemTotal}`;
  });

  // Actualizar el subtotal y total en el resumen
  const quantityOfItems = Array.from(cartItems).reduce((sum, item) => {
    return sum + Number(item.querySelector(".custom-text").value);
  }, 0);

  const subtotalElement = document.querySelector("#subtotal_text");
  const totalElement = document.querySelector("#total_text");

  subtotalElement.textContent = `$${total.toFixed(2)}`;
  totalElement.textContent = `$${total.toFixed(2)}`;
  document.querySelector("#cantidad_items").textContent = quantityOfItems;
}

// Función para enviar la actualización del carrito al backend
function sendUpdateToBackend(index, newQuantity) {
  const productIds = document.querySelectorAll(".product_id");
  const productId = productIds[index].innerText;
  const apiUrl = `/shop/cartupdate?id=${productId}&quantity=${newQuantity}`;

  fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    // body: JSON.stringify({ quantity: newQuantity }), // Comentado porque la cantidad ya se envía en la URL
  })
    .then((response) => {
      if (!response.ok)
        throw new Error(`Error en la solicitud: ${response.status}`);
      return response.json();
    })
    .then((data) => console.log(data))
    .catch((error) => console.error("Error en la solicitud:", error));
}

// Función para borrar un ítem del carrito en el backend
function deleteItemToBacked(productId) {
  const apiUrl = `/shop/cartupdate/delete/${productId}`;

  fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok)
        throw new Error(`Error en la solicitud: ${response.status}`);
      return response.json();
    })
    .then((data) => console.log(data))
    .catch((error) => console.error("Error en la solicitud:", error));
}

// Manejo de Eventos

// Inicialización de event listeners para botones de incrementar y decrementar cantidad
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

  // Evitar que se pongan números negativos en el campo de cantidad
  quantityInput.addEventListener("change", () => {
    quantityInput.value =
      Number(quantityInput.value) < 1 ? 1 : Number(quantityInput.value);
    sendUpdateToBackend(index, quantityInput.value);
    updateTotal();
  });

  // Event listener para el botón de borrar un ítem del carrito
  deleteButton.addEventListener("click", () => {
    const itemContainer = deleteButton.closest(".rad_shad_container.cart_item");
    const productId = itemContainer.querySelector(".product_id").innerText;

    deleteItemToBacked(productId);
    itemContainer.remove();
    updateTotal();
    handleDeleteButtonClick();
  });
});

// LIMPIAR CARRO Y PONER IMAGEN DE CARRO VACIO
const empty_cart = () => {
  const mainCart = document.querySelector(".main_cart"); // Find the element with class "main_cart"

  if (mainCart) {
    // Check if such element exists
    mainCart.innerHTML = ""; // Clear the current content of mainCart

    // Add new HTML content for the empty cart
    mainCart.innerHTML = `
      <h1 class="empty_cart_title">OH, CUÁNTO VACÍO</h1>
      <div class="empty_cart">
        <img class="empty_cart_img" src="/images/varios/shopping-cart.svg" alt="Carrito vacío">
      </div>
      <div class="empty_cart_shop_link"><a class="empty_cart_title" href="/shop?filter=all">IR A COMPRAR</a></div>`;
  }
};

// Función para manejar la eliminación dinámica del carrito
function handleDeleteButtonClick() {
  const emptyCartObserver = document.querySelector(".empty_cart_observer");
  if (emptyCartObserver && emptyCartObserver.children.length === 0) {
    empty_cart();
  }
}

// Inicialización del Documento

// Se ejecuta cuando el DOM está completamente cargado
document.addEventListener("DOMContentLoaded", () => {
  // Agregar event listener al botón de pagar
  document.querySelector(".pay").addEventListener("click", function () {
    const apiUrl = "/shop/cartdelete/";
    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok)
          throw new Error(`Error en la solicitud: ${response.status}`);
        return response.json();
      })
      .then((data) => console.log(data))
      .catch((error) => console.error("Error en la solicitud:", error));

    alert("¡Gracias por interactuar con esta demo!");
    empty_cart();
  });

  // Asignar el manejador de clics a los botones de eliminación del carrito
  deleteButtonList.forEach((button) => {
    button.addEventListener("click", handleDeleteButtonClick);
  });
});
