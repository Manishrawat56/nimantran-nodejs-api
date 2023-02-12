const express = require('express');
const userController = require('../controllers/userController');
const isAuth = require('../middleware/is-auth.js');
const { userImageUpload } = require('../utils/fileUtils');
const router = express.Router();


router.post("/updateProfilePic",isAuth, userImageUpload.single("image"), userController.updateProfilePic);
router.put("/update",isAuth,userImageUpload.single("image"), userController.updateUserData);
router.post("/changePassword",isAuth, userController.changePassword);
router.get("/",isAuth, userController.getAll);
router.get("/:userId",isAuth, userController.getByUserId);
router.delete("/",isAuth, userController.deleteAll);
router.delete("/:userId",isAuth, userController.delete);


module.exports = router;