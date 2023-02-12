const express = require('express');
const orderTrackingController = require('../controllers/orderTrackingController');
const isAuth = require('../middleware/is-auth.js');
const { bannerImageUpload } = require('../utils/fileUtils');
const { updateByIdValidation, companyValidation } = require('../utils/validationUtils');
const router = express.Router();


router.post("/",isAuth,orderTrackingController.create);
router.put("/update",updateByIdValidation, orderTrackingController.update);
router.get("/", orderTrackingController.getAll);
router.get("/:orderTrackingId", orderTrackingController.getById);
router.delete("/",isAuth, orderTrackingController.deleteAll);
router.delete("/:orderTrackingId",isAuth, orderTrackingController.delete);



module.exports = router;