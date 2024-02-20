const express = require("express");
const adminController = require("../controllers/admin-controller");
const authMiddleware = require("../middleware/auth-middleware");
const adminmiddleware = require("../middleware/admin-middleware");
const {signupSchema} = require("../validators/auth-validator");
const validate = require("../middleware/validate-middleware");

const router = express.Router();

// Parse JSON request bodies
router.use(express.json());

// Define routes
router.route('/users').get(authMiddleware, adminmiddleware,  adminController.getAllUsers);
// router.route("/users/add").post(authMiddleware, adminmiddleware, adminController.addUser);
router.post("/users/add", authMiddleware, adminmiddleware, validate(signupSchema), adminController.addUser);
router.route("/users/:id").delete(authMiddleware, adminmiddleware, adminController.getUserById);
router.route("/users/update/:id").patch(authMiddleware, adminmiddleware, adminController.updateUserById);
router.route("/users/delete/:id").delete(authMiddleware, adminmiddleware, adminController.deleteUserById);
router.route('/banks').get(authMiddleware, adminmiddleware, adminController.getAllBanks);
router.post("/banks/add", authMiddleware, adminmiddleware, adminController.addBank);
router.route("/banks/:id").delete(authMiddleware, adminmiddleware, adminController.getAllBanks);
router.route("/banks/update/:id").patch(authMiddleware, adminmiddleware, adminController.updateBankById);
router.route("/banks/delete/:id").delete(authMiddleware, adminmiddleware, adminController.deletebankById);

module.exports = router;
