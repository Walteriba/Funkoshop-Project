const { getAllOrderBy, getOne } = require("../models/itemsModels");
const { addItem, editItem, deleteItem } = require("../services/itemServices");
const CategoryService = require("../services/categoryService");
const LicenceService = require("../services/licenceService");

const adminControllers = {
  adminGET: async (req, res) => {
    const items = await getAllOrderBy({
      order_by: "licence_name, product_name",
    });
    //        const items = await getAllOrderBy({licence_name: licence_name, product_name: product_name});
    //        const items = await getAllOrderBy({product_id: 'product_id ASC'});
    res.render("admin/admin", { items });
  },

  createGET: async (req, res) => {
    const licences = await LicenceService.getAllItemsLicences();
    const categories = await CategoryService.getAllItemsCategories();
    res.render("admin/create", { licences, categories });
  },

  editGET: async (req, res) => {
    const id = req.params.id;
    const licences = await LicenceService.getAllItemsLicences();
    const categories = await CategoryService.getAllItemsCategories();
    const item = await getOne({ product_id: id }); // Desestructuro, ya que sino hay que acceder a las propiedades por posicion [0] del array
    res.render("admin/edit", { item, licences, categories });
  },

  createPOST: async (req, res) => {
    const data = req.body;
    const files = req.files;
    await addItem(data, files);
    //const result = await addItem(data, files);
    //res.send(result);  //esta linea solo muestra el msg de creación OK
    res.redirect("/admin");
  },

  editPUT: async (req, res) => {
    const id = req.params.id;
    const data = req.body;
    const files = req.files;
    const result = await editItem(data, files, { product_id: id });
    // res.send(result); //esta linea solo muestra el msg de edición OK
    res.redirect("/admin");
  },

  editDELETE: async (req, res) => {
    const id = req.params.id;
    const result = await deleteItem({ product_id: id });
    // res.send(result); //esta linea solo muestra el msg de edición OK
    res.redirect("/admin");
  },
};

module.exports = adminControllers;
