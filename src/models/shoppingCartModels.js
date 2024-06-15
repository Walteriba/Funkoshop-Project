const { conn } = require("../config/db");
const errorDBhandler = require("../utils/errorHandler");

const getCart = async (userId) => {
  try {
    const [rows] = await conn.query(
      "SELECT * FROM shopping_cart WHERE user_id = 1"
    );
    return rows;
  } catch (error) {
    return errorDBhandler(error);
  } finally {
    conn.releaseConnection();
  }
};

const addItemCart = async (productId, quantity) => {
    const userId = 1; // Usuario hardcodeado
    try {
      await conn.query(
        "INSERT INTO shopping_cart (user_id, cart_quantity, product_id) VALUES (?, ?, ?)",
        [userId, quantity, productId]
      );
  } catch (error) {
    return errorDBhandler(error);
  } finally {
    conn.releaseConnection();
  }
};

const updateCart = async (userId, productId, quantity) => {
  try {
    await conn.query(
      "UPDATE shopping_cart SET cart_quantity = ? WHERE user_id = 1 AND product_id = ?",
      [quantity, productId]
    );
  } catch (error) {
    return errorDBhandler(error);
  } finally {
    conn.releaseConnection();
  }
};

const deleteItemToCart = async (userId, productId) => {
  try {
    await conn.query(
      "DELETE FROM shopping_cart WHERE user_id = 1 AND product_id = ?",
      [productId]
    );
  } catch (error) {
    return errorDBhandler(error);
  } finally {
    conn.releaseConnection();
  }
};

const deleteCart = async (userId) => {
  try {
    await conn.query("DELETE FROM shopping_cart WHERE user_id = 1", [userId]); // user id hardcoded 
  } catch (error) {
    return errorDBhandler(error);
  } finally {
    conn.releaseConnection();
  }
};

module.exports = {
  getCart,
  addItemCart,
  updateCart,
  deleteItemToCart,
  deleteCart,
};
