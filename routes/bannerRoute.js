const express = require('express');
const bannerController = require('../controllers/bannerController');
const isAuth = require('../middleware/is-auth.js');
const { bannerImageUpload } = require('../utils/fileUtils');
const { updateByIdValidation } = require('../utils/validationUtils');
const router = express.Router();


router.post("/",isAuth,bannerImageUpload.single("image"), bannerController.create);
router.put("/update",isAuth,bannerImageUpload.single("image"),updateByIdValidation, bannerController.update);
router.get("/", bannerController.getAll);
router.get("/company/:companyId", bannerController.getAllByCompany);
router.get("/:bannerId", bannerController.getByBannerId);
router.delete("/",isAuth, bannerController.deleteAll);
router.delete("/:bannerId",isAuth, bannerController.delete);



module.exports = router;