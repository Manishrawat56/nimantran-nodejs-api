const express = require('express');
const orderAdditionalDataController = require('../controllers/orderAdditionalDataController');
const isAuth = require('../middleware/is-auth.js');
const { bannerImageUpload } = require('../utils/fileUtils');
const { updateByIdValidation, companyValidation } = require('../utils/validationUtils');
const router = express.Router();


router.post("/",isAuth,orderAdditionalDataController.create);
router.put("/update",updateByIdValidation, orderAdditionalDataController.update);
router.get("/", orderAdditionalDataController.getAll);
router.get("/byUser",isAuth, orderAdditionalDataController.getAllByUser);
router.get("/:orderAdditionalDataId", orderAdditionalDataController.getById);
router.delete("/",isAuth, orderAdditionalDataController.deleteAll);
router.delete("/:orderAdditionalDataId",isAuth, orderAdditionalDataController.delete);



module.exports = router;