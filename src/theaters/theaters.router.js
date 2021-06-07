const { route } = require("../movies/movies.router");
const router = require("express").Router();
const controller = require("./theaters.controller");
const methodNotAllowed= require("../error/methodNotAllowed")

router.route("/").get(controller.list).all(methodNotAllowed)


module.exports= router