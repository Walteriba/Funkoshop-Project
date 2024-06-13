const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");
require("dotenv").config();

const session = require("express-session");
const MySQLStore = require('express-mysql-session')(session);

const db = require('./src/config/db');

const sessionStore = new MySQLStore({
    expiration: 5184000000,
    createDatabaseTable: true,
    schema: {
        tableName: 'sessions',
        columnNames: {
            session_id: 'session_id',
            expires: 'expires',
            data: 'data'
        }
    }
}, db);

app.set("trust proxy", 1);

// Configurar express-session
app.use(
  session({
    secret: "keyboard cat",
    store: sessionStore,
    resave: false,
    saveUninitialized: true,
    proxy: true,
    name: "funkoshop-cookie",
    cookie: {
      httpOnly: true,
      secure: true,
      maxAge: 1000 * 60 * 60 * 48,
      sameSite: "none",
    },
  })
);

// Importacion Error 404
const NotFound = require("./src/utils/NotFound");

// Importacion de Routes
const mainRoutes = require("./src/routes/mainRoutes");
const shopRoutes = require("./src/routes/shopRoutes");
const adminRoutes = require("./src/routes/adminRoutes");
const authRoutes = require("./src/routes/authRoutes");

// Middle para parsear los datos recibidos a un formato que entienda el servidor
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Override para habilitar métodos PUT y DELETE
app.use(methodOverride("_method"));

// Middle para poder pasa archivos estaticos al servidor
app.use(express.static(path.resolve(__dirname, "public")));

// Motor de plantillas EJS
app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "./src/views"));

// Ruta con nombre de pagina web y no con nombre de documento html (POR AHORA)
// app.get("/home", (req,res) => res.sendFile(__dirname + "/public/index.html"));

// Middle llamado de rutas desde app
app.use("/", mainRoutes);
app.use("/shop", shopRoutes);
app.use("/auth", authRoutes);
app.use("/admin", adminRoutes);

// Manejo de error 404
app.use(NotFound);

app.listen(process.env.APP_PORT, () =>
  console.log(
    `Servidor de BlueLabel funcionando en http://localhost:${process.env.APP_PORT}`
  )
);

// Export para vercel
module.exports = app;
