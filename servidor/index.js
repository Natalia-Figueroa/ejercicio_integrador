// require("dotenv").config();

const express = require("express");
const app = express();
const auth = require("./auth.js");
const port = 8088;
const jwt = require("jsonwebtoken");

// ESTO ES PARA CORS

const cors = require("cors");
const whitelist = ["http://localhost:3000"];
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));

// EL BODY PARSER ES PARA EL MANEJO DE JSON EN LAS REQUEST

var bodyParser = require("body-parser");
app.use(bodyParser.json());

// PARA CONECTAR CON LA BASE

const knex = require("knex")({
  client: "pg",
  connection: {
    host: "localhost",
    port: 5432,
    user: "postgres",
    password: "Admin2022",
    database: "figuritas",
  },
});

// PARA ENCRIPTAR LAS CONTRASEÑAS

const bcrypt = require("bcrypt");
const saltRounds = 10;

// IMPORTO DENTRO DE MIDDLEWARES EL JWT PARA AUTENTICAR

const { validateJWT } = require("./middlewares/jwt.js");

// HAGO UNA REQUEST PARA TRAER LAS FIGURITAS

app.get("/figuritas", (req, res) => {
  knex
    .select("id", "categoria", "tengo")
    .from("figuritas")
    .then((resultado) => {
      res.json(resultado);
    });
});

app.use("/auth", auth);

// CUANDO HAGO UN GET PARA TRAER LOS USUARIOS, TENGO DE POR MEDIO EL VALIDATEJWT QUE ES EL MIDDLEWARE DE AUTENTICACIÓN //

app.get("/usuarios", validateJWT, (req, res) => {
  knex("usuarios")
    .select({
      nombre: "nombre",
      mail: "mail",
    })
    .then((result) => {
      return res.json({ success: true, entries: result });
    })
    .catch((err) => {
      console.error(err);
      return res.json({
        success: false,
        message: "Error de autenticacion",
      });
    });
});

// EN QUE PUERTO SE ESTA ESCUCHANDO
//EL PORT ESTA GUARDADO ARRIBA EN UNA CONSTANTE

app.listen(port, function () {
  console.log("App corriendo en el puerto 8088");
});

// function App() {
//   return (
//     <div>
//       {tengo ? (
//         <button onClick={numeroDeFigurita}>Deje de tener</button>
//       ) : (
//         <button onClick={tengoFigurita}>Tengo</button>
//       )}
//     </div>
//   );

//   const tengoFigurita = (numeroDeFigurita, tengoFigurita) => {
//     fetch(`/figurita/${numeroDeFigurita}`, {
//       method: "PUT",
//       body: {
//         tengo: tengoFigurita,
//       },
//     }).then((r) => {
//       r.json();
//     });
//   };
// }

// CON MATHI COMO DESDE EL FRONT VER LA FIGURITA QUE TENGO

// const tengoFigurita = (numeroDeFigurita, tengoFigurita) => {
//   fetch(`/figurita/${numeroDeFigurita}`, {
//     method: "PUT",
//     body: {
//       tengo: tengoFigurita,
//     },
//   }).then((r) => {
//     r.json();
//   });
// };

// const componente = ({ numeroDeFigurita, tengo }) => {
//   return (
//     <div>
//       {tengo ? (
//         <button onClick={numeroDeFigurita}>Deje de tener</button>
//       ) : (
//         <button onClick={tengoFigurita}>Tengo</button>
//       )}
//     </div>
//   );
// };
