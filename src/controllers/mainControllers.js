const {getAllItemsLicences} = require("../services/licenceService");
const {getNews} = require("../services/itemServices");

const mainControllers = {
    
    home: async (req, res) => { 
        const licences = await getAllItemsLicences();
    //    const licences = await getLicences();
        const items = await getNews();
        res.render("home", {licences, items})
    },

    contact: (req, res) => { res.render("contact")},

    about: (req, res) => { res.send("Ruta para vista About")},
    
    faqs: (req, res) => { res.send("Ruta para vista Faqs")},
};
  
module.exports = mainControllers;