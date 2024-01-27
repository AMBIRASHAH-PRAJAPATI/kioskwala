const mongoose =  require("mongoose");
const bcrypt =  require("bcryptjs");
const jwt = require("jsonwebtoken")

const userSchema = new mongoose.Schema({

    username : {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: false,
    },
    phone: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
});

// secure password
userSchema.pre('save',async function(next){
     const user = this;
     if(!user.isModified("password")){
        next();
     }
     try{
        const saltRound =  await bcrypt.genSalt(10);
        const hash_password = await bcrypt.hash(user.password, saltRound);
        user.password = hash_password;
     } catch (error) {
        next(error);
     }
});

userSchema.methods.conparePassword = async function(password){
    return bcrypt.compare(password, this.password);
}

// json token
userSchema.methods.generateToken = async function(){
  try {
    return jwt.sign({
        userId: this.toString(),
        phone: this.phone,
        isAdmin: this.isAdmin,
    },
    process.env.JWT_SECRET_KEY,
    {
        expiresIn: "30d",
    }
    );
  } catch (error) {
    console.log(error)
  }
}

// define model or collectiion name
const User = new mongoose.model("User", userSchema);
module.exports = User;