const authControllers = {
    loginGET: (req, res) => { res.render("auth/login")}, 
    registerGET: (req, res) => { res.render("auth/register")},
    logoutGET: (req, res) => { res.redirect("/auth/login")}, //No se si sera asi al final
    
    loginPOST: (req, res) => {res.send("VERBO:POST Ruta para login")},
    registerPOST: (req, res) => {res.send("VERBO:POST Ruta para Register")},
};
  
module.exports = authControllers;