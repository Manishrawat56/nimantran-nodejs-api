const express = require('express');
const cartController = require('../controllers/cartController');
const isAuth = require('../middleware/is-auth.js');
const { updateByIdValidation, addressValidation } = require('../utils/validationUtils');
const router = express.Router();


router.post("/",isAuth,cartController.create);
router.put("/update",isAuth,updateByIdValidation, cartController.update);
router.get("/", cartController.getAll);
router.get("/byUser",isAuth, cartController.getAllByUser);
router.get("/:cartId", cartController.getById);
router.delete("/",isAuth, cartController.deleteAll);
router.delete("/:cartId",isAuth, cartController.delete);



module.exports = router;