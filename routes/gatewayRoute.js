const express = require('express');
const gatewayController = require('../controllers/gatewayController');
const isAuth = require('../middleware/is-auth.js');
const { bannerImageUpload } = require('../utils/fileUtils');
const { updateByIdValidation, companyValidation } = require('../utils/validationUtils');
const router = express.Router();


router.post("/",isAuth,bannerImageUpload.single("image"), companyValidation,gatewayController.create);
router.put("/update",isAuth,bannerImageUpload.single("image"),updateByIdValidation, gatewayController.update);
router.get("/", gatewayController.getAll);
router.get("/:gatewayId", gatewayController.getById);
router.delete("/",isAuth, gatewayController.deleteAll);
router.delete("/:gatewayId",isAuth, gatewayController.delete);



module.exports = router;