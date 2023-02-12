const express = require('express');
const reviewController = require('../controllers/reviewController');
const isAuth = require('../middleware/is-auth.js');
const {  reviewImageUpload } = require('../utils/fileUtils');
const { updateByIdValidation } = require('../utils/validationUtils');
const router = express.Router();


router.post("/",isAuth,reviewImageUpload.array('image', 5), reviewController.create);
router.put("/update",isAuth,reviewImageUpload.array('image', 5),updateByIdValidation, reviewController.update);
router.get("/", reviewController.getAll);
router.get("/byUser",isAuth, reviewController.getAllByUser);
router.get("/product/:productId", reviewController.getAllByProduct);
router.get("/:reviewId", reviewController.getById);
router.delete("/",isAuth, reviewController.deleteAll);
router.delete("/:reviewId",isAuth, reviewController.delete);



module.exports = router;