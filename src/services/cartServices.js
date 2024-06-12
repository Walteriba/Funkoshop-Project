const { getOne } = require("../models/itemsModels");

let shoppingCart = [];

const getCart = () => {
  const cart = shoppingCart;
  return cart;
};

const addItemCart = async (id, quantity) => {
  try {
    const item = await getOne({ product_id: id });
    data = {
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
  } catch (error) {
    console.error("Error consiguiendo el item:", error);
  }
};

const updateCart = (id, quantity) => {
  const _product_id = parseInt(id);
  const _quantity = parseInt(quantity);
  const index = shoppingCart.findIndex(
    (item) => item.product_id == _product_id
  );
  shoppingCart[index].cart_quantity = _quantity;
};

const deleteItemToCart = (id) => {
  const _product_id = parseInt(id);
  const index = shoppingCart.findIndex(
    (item) => item.product_id == _product_id
  );
  shoppingCart.splice(index, 1);
};

module.exports = {
  getCart,
  addItemCart,
  updateCart,
  deleteItemToCart,
};
