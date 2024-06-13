const { getAll, getOne } = require("../models/itemsModels");
const {
  getRelated,
  getItemsFromCategory,
} = require("../services/itemServices");
const {
  getCart,
  addItemCart,
  updateCart,
  deleteItemToCart,
} = require("../services/cartServices");

const shopControllers = {
  shopGET: async (req, res) => {
    const items = await getItemsFromCategory(req.query.filter);
    res.render("shop/shop", { items });
  },

  itemGET: async (req, res) => {
    const id = req.params.id;
    const item = await getOne({ product_id: id });
    const items = await getRelated({ licence_id: item.licence_id });
    const carrito = await getCart(req);
    res.render("shop/item", { items, item, carrito });
  },

  itemPOST: async (req, res) => {
    const id = req.params.id;
    const quantity = req.body.quantity;
    await addItemCart (id, quantity);
    res.redirect("/shop/cart");
  },

  cartGET: async (req, res) => {
    const items = await getCart(req);
    res.render("shop/cart", { items });
  },

  cartUpdatePOST: async (req, res) => {
    const id = req.query.id;
    const newQuantity = req.query.quantity;
    await updateCart(req, id, newQuantity);
    res.redirect("/shop/cart");
  },

  cartDeleteItem: async (req, res) => {
    const id = req.params.id;
    await deleteItemToCart(req, id);
    res.redirect("/shop/cart");
  },

  cartPOST: (req, res) => {
    res.send("VERBO:POST Ruta para hacer la compra");
  },
};

module.exports = shopControllers;
