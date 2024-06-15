const { getOne } = require("../models/itemsModels");
const shoppingCartModels = require("../models/shoppingCartModels");

const getCart = async (userId) => {
  try {
      const cartItems = await shoppingCartModels.getCart(userId); // Obtener todos los productos del carrito desde la base de datos
      const extendedCart = [];

      // Iterar sobre cada producto en el carrito
      for (const cartItem of cartItems) {
          const itemDetails = await getOne({ product_id: cartItem.product_id }); // Obtener detalles del producto
          if (itemDetails) {
              const data = {
                  cart_quantity: cartItem.cart_quantity,
                  product_id: itemDetails.product_id,
                  product_name: itemDetails.product_name,
                  product_description: itemDetails.product_description,
                  price: itemDetails.price,
                  sku: itemDetails.sku,
                  image_front: itemDetails.image_front,
                  image_back: itemDetails.image_back,
                  licence_id: itemDetails.licence_id,
                  category_id: itemDetails.category_id,
                  licence_name: itemDetails.licence_name,
                  licence_description: itemDetails.licence_description,
                  category_name: itemDetails.category_name,
                  category_description: itemDetails.category_description,
              };
              extendedCart.push(data); // Agregar detalles extendidos al nuevo array
          } else {
              console.error(`No se encontró el producto con product_id: ${cartItem.product_id}`);
          }
      }

      return extendedCart; // Devolver el nuevo array con detalles extendidos
  } catch (error) {
      console.error("Error obteniendo el carrito:", error);
      throw error; // Manejar el error según sea necesario
  }
};

const addItemCart = async (userId, productId, quantity) => {
    return await shoppingCartModels.addItemCart(userId, productId, quantity);
};

const updateCart = async (userId, productId, quantity) => {
    return await shoppingCartModels.updateCart(userId, productId, quantity);
};

const deleteItemToCart = async (userId, productId) => {
    return await shoppingCartModels.deleteItemToCart(userId, productId);
};

const deleteCart = async (userId) => {
    return await shoppingCartModels.deleteCart(userId);
};

module.exports = {
    getCart,
    addItemCart,
    updateCart,
    deleteItemToCart,
    deleteCart,
};

