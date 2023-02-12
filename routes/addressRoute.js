const express = require('express');
const addressController = require('../controllers/addressController');
const isAuth = require('../middleware/is-auth.js');
const { updateByIdValidation, addressValidation } = require('../utils/validationUtils');
const router = express.Router();


router.post("/",isAuth, addressValidation,addressController.create);
router.put("/update",isAuth,updateByIdValidation, addressController.update);
router.get("/", addressController.getAll);
router.get("/byUser",isAuth, addressController.getAllByUser);
router.get("/:addressId", addressController.getById);
router.delete("/",isAuth, addressController.deleteAll);
router.delete("/:addressId",isAuth, addressController.delete);



module.exports = router;