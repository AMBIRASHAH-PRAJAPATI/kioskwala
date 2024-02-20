const User = require("../models/user-model")
const bcrypt =  require("bcryptjs");

// *-------------------
// * Home Page
// *-------------------
const home = async (req, res) => {
    try{
      res
        .status(200) 
        .send("start from server");
    } catch (error) {
        console.log(error);
    }
};

// *-------------------
// * User Register
// *-------------------
const register = async (req, res) => {
    try{

        const { username, email, phone, password, confirmPassword } = req.body;

        // Check if passwords match
        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Passwords do not match" });
        }

        const userExist = await User.findOne({ phone });

        if(userExist) {
            return res.status(400).json({ message: "Phone number Exists" });
        }

        // here aslo we can hash the password and passwod = hashed one
       const userCreated = await User.create({ 
          username, 
          email, 
          phone, 
          password,
        });

        res.status(201).json({ 
            msg: "Registration Successful", 
            token: await userCreated.generateToken(),
            userId : userCreated._id.toString(),
        });
      } catch (error) {
          res.status(500).json("Internal server error");
      }
};

// *-------------------
// * User Login
// *-------------------
const login = async(req, res) => {
    try {
        const { phone, password } = req.body;
        const userExist = await User.findOne({ phone });

        if(!userExist){
            return res.status(400).json({ message: "Invalid details"});
        }

        // const isvalidUser = await bcrypt.compare(password, userExist.password); this  is in user model looks good
        const isvalidUser = await userExist.conparePassword( password );
        
        if(isvalidUser){
            res.status(200).json({ 
                msg: "Login Successful", 
                token: await userExist.generateToken(),
                userId : userExist._id.toString(),
            });
        }
        else{
            res.status(401).json({ message: "Invalid Phone number & Password"});
        }
    } catch (error) {
        res.status(500).json("Internal Server Error");
        // next(error);
    }
}


// *-------------------
// * user data
// *-------------------

const user = async (req, res) => {
    try {
        const userData = req.user;
        res.status(200).json({ userData });
    } catch (error) {
        res.status(500).json(`error from the user rout ${error}`);
    }
};

module.exports = { home, register, login, user};




        // // hash the password
        // const saltRound = 10;
        // const hash_password = await bcrypt.hash(password, saltRound);
