document.addEventListener("DOMContentLoaded", () => {
  // Cargar el carrito desde localStorage al cargar la página
  let shoppingCart = getCartFromLocalStorage();
  
  // Función para actualizar la UI del carrito
  const updateCartUI = () => {
    const cartItemsContainer = document.querySelector('.main_cart .cart_item');
    cartItemsContainer.innerHTML = ''; // Limpiar el contenedor de items
    shoppingCart.forEach(item => {
      // Aquí podrías construir el HTML para cada item basado en el estado actual del carrito
      // Usando plantillas literales o manipulando el DOM directamente.
    });
    updateTotal(); // Actualizar el total y el resumen
  };

  // Guardar el carrito en localStorage y actualizar la UI
  const syncCart = () => {
    saveCartToLocalStorage(shoppingCart);
    updateCartUI();
  };

  // Añadir un artículo al carrito
  const addItemToCart = async (id, quantity) => {
    try {
      const response = await fetch(`/api/items/${id}`);
      const item = await response.json();
      const data = {
        cart_quantity: Number(quantity),
        product_id: item.product_id,
        product_name: item.product_name,
        product_description: item.product_description,
        price: item.price,
        sku: item.sku,
        image_front: item.image_front,
        image_back: item.image_back,
        licence_id: item.licence_id,
        category_id: item.category_id,
        licence_name: item.licence_name,
        licence_description: item.licence_description,
        category_name: item.category_name,
        category_description: item.category_description,
      };
      shoppingCart.push(data);
      syncCart();
    } catch (error) {
      console.error("Error consiguiendo el item:", error);
    }
  };

  // Actualizar un artículo del carrito
  const updateItemInCart = (id, quantity) => {
    const _product_id = parseInt(id);
    const _quantity = parseInt(quantity);
    const index = shoppingCart.findIndex((item) => item.product_id === _product_id);
    if (index !== -1) {
      shoppingCart[index].cart_quantity = _quantity;
      syncCart();
    }
  };

  // Eliminar un artículo del carrito
  const removeItemFromCart = (id) => {
    const _product_id = parseInt(id);
    const index = shoppingCart.findIndex((item) => item.product_id === _product_id);
    if (index !== -1) {
      shoppingCart.splice(index, 1);
      syncCart();
    }
  };

  // Llamar a la función para actualizar la UI del carrito inicialmente
  updateCartUI();

  // Añadir eventos a los botones de incremento y decremento
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
      updateItemInCart(index, quantityInput.value);
      updateTotal();
    });

    subtractButton.addEventListener("click", () => {
      if (Number(quantityInput.value) > 1) {
        quantityInput.value = Number(quantityInput.value) - 1;
        updateItemInCart(index, quantityInput.value);
        updateTotal();
      }
    });

    // Evitar que se pongan números negativos en el campo
    quantityInput.addEventListener("change", () => {
      quantityInput.value =
        Number(quantityInput.value) < 1 ? 1 : Number(quantityInput.value);
      updateItemInCart(index, quantityInput.value);
      updateTotal();
    });

    // Borrar un item de la lista
    deleteButton.addEventListener("click", () => {
      const itemContainer = deleteButton.closest(".rad_shad_container.cart_item");
      const productId = itemContainer.querySelector(".product_id").innerText;
      removeItemFromCart(productId);
      itemContainer.remove();
      updateTotal();
    });
  });

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
});

