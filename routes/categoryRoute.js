const express = require('express');
const categoryController = require('../controllers/categoryController');
const isAuth = require('../middleware/is-auth.js');
const {  categoryImageUpload } = require('../utils/fileUtils');
const { updateByIdValidation, categoryValidation } = require('../utils/validationUtils');
const router = express.Router();


router.post("/",isAuth,categoryImageUpload.single("image"), categoryValidation,categoryController.create);
router.put("/update",isAuth,categoryImageUpload.single("image"),updateByIdValidation, categoryController.update);
router.get("/", categoryController.getAll);
router.get("/company/:companyId", categoryController.getAllByCompany);
router.get("/:categoryId", categoryController.getById);
router.delete("/",isAuth, categoryController.deleteAll);
router.delete("/:categoryId",isAuth, categoryController.delete);



module.exports = router;