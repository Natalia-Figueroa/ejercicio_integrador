const router = require("express").Router();

const knex = require("knex")({
  client: "pg",
  connection: {
    host: "localhost",
    port: 5432,
    user: "postgres",
    password: "Admin2022",
    database: "Figuritas",
  },
});

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { secret } = require("./middlewares/jwt");

// Cuando se registra un usuario la contraseña tiene que ir enctriptada
// Cuando nos loguemos,tenemos que comparar la contarseña encriptándola

router.post("/registro", (req, res, next) => {
  const salt = bcrypt.genSaltSync(10);
  const pwd = bcrypt.hashSync(req.body.contrasena, salt);

  knex("usuarios")
    .returning(["id", "mail"])
    .insert({
      mail: req.body.mail,
      password: pwd,
    })
    .then((r) => {
      res.status(201).json(r[0]);
    })
    .catch((err) => {
      res.status(500).send("error");
      next();
    });
});

router.post("/login", (req, res, next) => {
  console.log(req.body.contrasena, req.body.mail);
  knex("usuarios")
    .select("id", "mail", "contrasena")
    .from("usuarios")
    .where("mail", req.body.mail)

    .then((filas) => {
      if (filas.length > 0) {
        //el compareSync hace el await adentro
        if (bcrypt.compareSync(req.body.contrasena, filas[0].contrasena)) {
          res.status(200).json({
            msg: "Logueado correctamente",
            auth_token: jwt.sign(
              {
                id: filas[0].id,
                mail: filas[0].mail,
              },
              secret
            ),
          });
        } else {
          res.status(404).json({ msg: "Mail o contraseña incorrectos" });
        }
      } else {
        res.status(404).json({ msg: "Mail o contraseña incorrectos" });
      }
    })
    .catch((err) => {
      res.status(500).send("error");
    });
  next();
});

module.exports = router;
