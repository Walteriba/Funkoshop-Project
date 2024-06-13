const { conn } = require("../config/db");
const errorDBhandler = require("../utils/errorHandler");

const getAll = async () => {
  try {
    const [rows] = await conn.query(`SELECT * 
            FROM product 
            JOIN licence 
            ON product.licence_id = licence.licence_id
            JOIN category
            on product.category_id = category.category_id;`);
    return rows;
  } catch (error) {
    return errorDBhandler(error);
  } finally {
    conn.releaseConnection();
  }
};

const getAllOrderBy = async (object) => {
  try {
    // console.log (object.order_by);
    const [rows] = await conn.query(`SELECT * 
            FROM product 
            JOIN licence 
            ON product.licence_id = licence.licence_id
            JOIN category
            on product.category_id = category.category_id
            ORDER BY licence_name, product_name;`);

    //            ORDER BY ?;`, [object.order_by]);
    //            ORDER BY licence_name, product_name;`);
    //            ORDER BY ? ASC;`, Array.from( object));
    //            ORDER BY licence_name;`);
    //            ORDER BY licence_name, product_name;`);
    //            ORDER BY ?;`, object);
    return rows;
  } catch (error) {
    console.log(error);
    return errorDBhandler(error);
  } finally {
    conn.releaseConnection();
  }
};

const getFiltered = async (object) => {
  try {
    const [rows] = await conn.query(`SELECT * FROM product WHERE ?;`, object);
    return rows;
  } catch (error) {
    return errorDBhandler(error);
  } finally {
    conn.releaseConnection();
  }
};

const getAllAtributesFiltered = async (licence_id) => {
  try {
    const [rows] = await conn.query(
      `SELECT 
        product.*, licence_name, licence_description, licence_image, category_name, category_name
        FROM product 
        INNER JOIN licence 
        ON product.licence_id = licence.licence_id
        INNER JOIN category
        on product.category_id = category.category_id
        WHERE licence.licence_id = ?;`,
      licence_id
    );
    return rows;
  } catch (error) {
    return errorDBhandler(error);
  } finally {
    conn.releaseConnection();
  }
};

// Esta función chequea si existe el item antes de seguir con lo demas, es un getOne abreviado para ser reutilizado
const CheckExistence = async (object) => {
  const [itemExistence] = await conn.query(
    `SELECT * 
        FROM product 
        JOIN licence 
        ON product.licence_id = licence.licence_id
        JOIN category
        on product.category_id = category.category_id
        WHERE ?;`,
    object
  );
  if (itemExistence.length === 0) {
    throw new Error(`No se encontró el ítem con el ID ${object.product_id}`);
  }
  return itemExistence;
};

const getOne = async (object) => {
  try {
    const [item] = await CheckExistence(object);
    return item;
  } catch (error) {
    return errorDBhandler(error);
  } finally {
    conn.releaseConnection();
  }
};

const add = async (data) => {
  try {
    // await conn.query(`INSERT INTO product (product_name, product_description, price, stock, discount,
    //     sku, dues, image_front, image_back, licence_id, category_id) VALUES (?,?,?,?,?,?,?,?,?,?,?);`,
    //     [data.product_name, data.product_description, data.price, data.stock, data.discount,
    //     data.sku, data.dues, data.image_front, data.image_back, data.licence_id, data.category_id]);

    const [rows] = await conn.query(
      `INSERT INTO product (product_name, product_description, price, stock, discount, 
            sku, dues, image_front, image_back, licence_id, category_id) VALUES ?;`,
      [data]
    );
    return `Se ha agregado correctamente el Item`;
  } catch (error) {
    return errorDBhandler(error);
  } finally {
    conn.releaseConnection();
  }
};

const edit = async (data, id) => {
  try {
    await CheckExistence(id);
    // await conn.query(`UPDATE product SET product_name=?, product_description=?, price=?, stock=?, discount=?,
    //                     sku=?, dues=?, image_front=?, image_back=?, licence_id=?, category_id=? WHERE ?;`,
    //                     [data.product_name, data.product_description, data.price, data.stock, data.discount,
    //                     data.sku, data.dues, data.image_front, data.image_back, data.licence_id, data.category_id, object]);
    const [rows] = await conn.query("UPDATE product SET ? WHERE ?;", [
      data,
      id,
    ]);
    return `El item fue modificado exitosamente.`;
  } catch (error) {
    return errorDBhandler(error);
  } finally {
    conn.releaseConnection();
  }
};

const deleteOne = async (object) => {
  try {
    await CheckExistence(object);
    await conn.query("DELETE FROM product WHERE ?;", object);
    return `Se ha borrado correctamente el item ${object.product_id}`;
  } catch (error) {
    return errorDBhandler(error);
  } finally {
    conn.releaseConnection();
  }
};

module.exports = {
  getAll,
  getAllOrderBy,
  getFiltered,
  getAllAtributesFiltered,
  getOne,
  add,
  edit,
  deleteOne,
};
