const express = require('express');
const companyController = require('../controllers/companyController');
const isAuth = require('../middleware/is-auth.js');
const { bannerImageUpload } = require('../utils/fileUtils');
const { updateByIdValidation, companyValidation } = require('../utils/validationUtils');
const router = express.Router();


router.post("/",isAuth,bannerImageUpload.single("image"), companyValidation,companyController.create);
router.put("/update",isAuth,bannerImageUpload.single("image"),updateByIdValidation, companyController.update);
router.get("/", companyController.getAll);
router.get("/:companyId", companyController.getById);
router.delete("/",isAuth, companyController.deleteAll);
router.delete("/:companyId",isAuth, companyController.delete);



module.exports = router;