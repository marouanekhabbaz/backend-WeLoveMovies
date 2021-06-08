const router = require("express").Router();
const controller = require("./reviews.controller");
const methodNotAllowed= require("../error/methodNotAllowed");
router.route('/:reviewId').delete(controller.destroy).put(controller.update).all(methodNotAllowed);


module.exports= router
