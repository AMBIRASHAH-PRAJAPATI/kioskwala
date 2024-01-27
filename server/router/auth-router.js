const express = require('express');
const router = express.Router();
const aouthcontrollers = require("../controllers/auth-controller");
const {signupSchema, loginSchema} = require("../validators/auth-validator");
const validate = require("../middleware/validate-middleware");

router.route("/").get(aouthcontrollers.home);
router.route("/register").post(validate(signupSchema), aouthcontrollers.register);
router.route("/login").post(validate(loginSchema), aouthcontrollers.login);



module.exports = router;




// router.get('/',(req, res)=> {
//     res.status(200).send("start from server");
// });

