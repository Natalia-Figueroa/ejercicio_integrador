const express = require("express");
const app = express();

const knex = require("knex")({
  client: "pg",
  connection: {
    host: "localhost",
    port: 5432,
    user: "postgres",
    password: "Admin2022",
    database: "postgres",
  },
});

exports.listaDeFiguritas = function (req, res, next) {
  const r = knex;
  knex
    .select("*")
    .from("figuritas")
    .then((resultado) => {
      res.status(200).json(resultado);
      next();
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.tengoFigurita = function (req, res, next) {
  knex
    .select("*")
    .from("figuritas")
    .where({
      tengo: "true",
    })
    .then((resultado) => {
      res.status(200).json(resultado);
      next();
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.noTengoFigurita = function (req, res, next) {
  knex
    .select("*")
    .from("figuritas")
    .where({
      tengo: "false",
    })
    .then((resultado) => {
      res.status(200).json(resultado);
      next();
    })
    .catch((err) => {
      console.log(err);
    });
};
