const express = require("express");
const methodOverride = require('method-override');
const app = express();
require('dotenv').config();

// Importacion Error 404
const NotFound = require("./src/utils/NotFound")

// Importacion de Routes
const mainRoutes = require("./src/routes/mainRoutes");
const shopRoutes = require("./src/routes/shopRoutes");
const adminRoutes = require("./src/routes/adminRoutes");
const authRoutes = require("./src/routes/authRoutes");

// Middle para parsear los datos recibidos a un formato que entienda el servidor
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Override para habilitar métodos PUT y DELETE 
app.use(methodOverride('_method'));

// Middle para poder pasa archivos estaticos al servidor
app.use(express.static("public"));

// Motor de plantillas EJS
app.set("view engine", "ejs");
app.set("views", "./src/views");

// Ruta con nombre de pagina web y no con nombre de documento html (POR AHORA)
// app.get("/home", (req,res) => res.sendFile(__dirname + "/public/index.html"));

// Middle llamado de rutas desde app
app.use("/", mainRoutes);
app.use("/shop", shopRoutes);
app.use("/auth", authRoutes);
app.use("/admin", adminRoutes);

// Manejo de error 404
app.use(NotFound);

app.listen(process.env.APP_PORT ,() => console.log(`Servidor de BlueLabel funcionando en http://localhost:${process.env.APP_PORT}`));

// Export para vercel
module.exports = app