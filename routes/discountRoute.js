const express = require('express');
const discountController = require('../controllers/discountController');
const isAuth = require('../middleware/is-auth.js');
const { bannerImageUpload } = require('../utils/fileUtils');
const { updateByIdValidation, companyValidation } = require('../utils/validationUtils');
const router = express.Router();


router.post("/",isAuth,discountController.create);
router.put("/update",updateByIdValidation, discountController.update);
router.get("/", discountController.getAll);
router.get("/:discountId", discountController.getById);
router.delete("/",isAuth, discountController.deleteAll);
router.delete("/:discountId",isAuth, discountController.delete);



module.exports = router;