const express = require('express');
const orderController = require('../controllers/orderController');
const isAuth = require('../middleware/is-auth.js');
const { bannerImageUpload } = require('../utils/fileUtils');
const { updateByIdValidation, companyValidation } = require('../utils/validationUtils');
const router = express.Router();


router.post("/",isAuth,orderController.create);
router.put("/update",updateByIdValidation, orderController.update);
router.get("/", orderController.getAll);
router.get("/byUser",isAuth, orderController.getAllByUser);
router.get("/:orderId", orderController.getById);
router.delete("/",isAuth, orderController.deleteAll);
router.delete("/:orderId",isAuth, orderController.delete);



module.exports = router;