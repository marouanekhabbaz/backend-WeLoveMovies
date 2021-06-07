const router = require("express").Router();
const controller = require("./movies.controller");
const methodNotAllowed= require("../error/methodNotAllowed")

router.route("/").get(controller.list).all(methodNotAllowed)
router.route("/:movieId").get(controller.read).all(methodNotAllowed)
router.route("/:movieId/theaters").get(controller.readTheaters).all(methodNotAllowed)
router.route("/:movieId/reviews").get(controller.readTReviews).all(methodNotAllowed)


module.exports = router;

