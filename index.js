const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require('method-override');
require('dotenv').config();

const session = require('express-session');
const cookieParser = require('cookie-parser');

// Configurar cookie-parser
app.use(cookieParser());

// Configurar express-session
app.use(session({
    secret: 'clavesupersecreta1234', // Cambia esto por una clave secreta más segura
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false, // Cambia a true si estás usando HTTPS
        maxAge: 24 * 60 * 60 * 1000 // Tiempo de vida de la sesión en milisegundos (1 día)
    }
}));

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
app.use(express.static(path.resolve(__dirname, "public")));

// Motor de plantillas EJS
app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname,"./src/views"));

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