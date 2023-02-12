const express = require('express');
const productController = require('../controllers/productController');
const isAuth = require('../middleware/is-auth.js');
const {  productImageUpload } = require('../utils/fileUtils');
const { updateByIdValidation } = require('../utils/validationUtils');
const router = express.Router();

router.post("/",isAuth,productImageUpload.array('image', 12), productController.create);
router.put("/update",isAuth,productImageUpload.array("image",12),updateByIdValidation, productController.update);
router.get("/", productController.getAll);
router.get("/company/:companyId/category/:categoryId", productController.getAllByCategoryAndCompany);
router.get("/company/:companyId", productController.getAllByCompany);
router.post("/:productId/addImage",isAuth,productImageUpload.array('image', 12), productController.updateImage);
router.post("/:productId/removeImage",isAuth,productImageUpload.array("image",12), productController.removeImage);
// router.get("/company/:companyId", productController.getAllByCompany);
router.get("/:productId", productController.getById);
router.delete("/",isAuth, productController.deleteAll);
router.delete("/:productId",isAuth, productController.delete);


module.exports = router;