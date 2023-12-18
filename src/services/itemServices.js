const path = require('path');
const fs = require('fs').promises
const {getAll, getOne, getFiltered, getAllAtributesFiltered, add, edit, deleteOne} = require("../models/itemsModels");
const { log } = require('console');

const getNews = async () => {
    const items = await getAll();

    let itemsNews = [];
    items.forEach( item => {
        let fecha_creacion = new Date(item.create_time);
        let fecha_actual = new Date();

        const diferenciaDias = (fecha_actual - fecha_creacion) / (1000 * 60 * 60 * 24);

        if (diferenciaDias < 30) {
            itemsNews.push(item);
        }
    });
    // Caso de que no haya items nuevos en el mes
    if (itemsNews.length === 0) {
        return items
    }
    return itemsNews;
};

const getRelated = async (object) => {
    const items = await getFiltered(object);
    return items
};

const getItemsFromCategory = async (filter) => {
    let items = [];
    // Asigna un valor por defecto
    min_filter = (filter || "all").toLowerCase();

    switch (min_filter) {
    case "all":
        items = await getAll();
        break;
    case "new":
        items = await getNews();
        break;
    default:
        let licence_id = filter;
        licence_id = parseInt(licence_id.replace("licence-", ""));
        items = await getAllAtributesFiltered(licence_id); 
    }

    return items;
};

const addItem = async (item, files) => {
    const itemSchema = {
      product_name: item.name,
      product_description: item.description,
      price: item.price,
      stock: item.stock,
      discount: item.discount,
      sku: item.sku,
      dues: item.dues,
      //para que quede bien, primero se debe seleccionar en la vista la imagen de front y lugo la de back
      //una opcion mas segura es poner en la vista 2 input tipo 'file'
      image_front: '/'+files[0].filename,
      image_back: '/'+files[1].filename,
      licence_id: item.licence,
      category_id: item.category
    }

    return await add([Object.values(itemSchema)]);
}


const editItem = async (item, files, id) => {
    // Obtiene el item existente para conservar los datos actulales en las imagenes
    const existingItem = await getOne(id);
  
    const itemSchema = {
      product_name: item.name, 
      product_description: item.description ,
      price: item.price,
      stock: item.stock,
      discount: item.discount,
      sku: item.sku,
      dues: item.dues,
      image_front: files && files.length > 0 && files[0].filename ? '/' + files[0].filename : existingItem.image_front,
      image_back: files && files.length > 1 && files[1].filename ? '/' + files[1].filename : existingItem.image_back,
      licence_id: item.licence,
      category_id: item.category,
    };
  
    return await edit(itemSchema, id);
  };

const deleteItem = async (id) => {
    const item = await getOne(id);
    const path = "./public/images"
    const files = [
        (path + item.image_front), 
        (path + item.image_back),
    ];

    Promise.all(files.map(file => fs.unlink(file)))
    .then(() => {
        console.log('Archivos removidos')
    })
    .catch(err => {
        console.error('Algo salio mal', err)
    })

    return await deleteOne(id);
}

module.exports = {
    getNews, 
    getRelated,
    getItemsFromCategory,
    addItem,
    editItem,
    deleteItem
}