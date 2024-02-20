// const multer = require('multer');
// const { v4: uuidv4 } = require('uuid');
const User = require("../models/user-model");
const { GovtBank, PvtBank } = require("../models/banks-model");

// *-------------------
// * get all user
// *-------------------
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, { password: 0 });
    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

// *-------------------
// * Add user
// *-------------------
const addUser = async (req, res) => {
  try {
    const { username, email, phone, password, confirmPassword } = req.body;

    // Check if passwords match
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const userExist = await User.findOne({ phone });

    if (userExist) {
      return res.status(400).json({ message: "Phone number already exists" });
    }

    const userCreated = await User.create({
      username,
      email,
      phone,
      password,
    });

    res.status(201).json({
      msg: "user added Successful",
      userId: userCreated._id.toString(),
    });
  } catch (error) {
    console.error("Error adding user:", error);
    res.status(500).json("Internal server error");
  }
};

// *-------------------
// * edit user
// *-------------------
const getUserById = async (req, res) => {
  try {
    const id = req.params.id; // same ad route (/:id)
    const data = await User.findOne({ _id: id }, { password: 0 });
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

// *-------------------
// * update user
// *-------------------
const updateUserById = async (req, res) => {
  try {
    const id = req.params.id; // same ad route (/:id)
    const updatedUserdata = req.body;

    const updateData = await User.updateOne(
      { _id: id },
      {
        $set: updatedUserdata,
      }
    );
    res.status(200).json(updateData);
  } catch (error) {
    next(error);
  }
};

// *-------------------
// * delete user
// *-------------------
const deleteUserById = async (req, res) => {
  try {
    const id = req.params.id; // same ad route (/:id)
    await User.deleteOne({ _id: id });
    res.status(200).json({ message: "User Deleted Successfully" });
  } catch (error) {
    next(error);
  }
};

// banks
// *-------------------
// * get all banks
// *-------------------
const getAllBanks = async (req, res, next) => {
  try {
    const govtBanks = await GovtBank.find();
    const pvtBanks = await PvtBank.find();

    if (!govtBanks || govtBanks.length === 0) {
      return res.status(404).json({ message: "No Government Banks found" });
    }

    if (!pvtBanks || pvtBanks.length === 0) {
      return res.status(404).json({ message: "No Private Banks found" });
    }
    res.status(200).json({ govtBanks, pvtBanks });
  } catch (error) {
    next(error);
  }
};

// // add bank
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/');
//   },
//   filename: function (req, file, cb) {
//     const fileName = uuidv4() + '-' + file.originalname;
//     cb(null, fileName);
//   }
// });

// const upload = multer({ storage: storage });

// *-------------------
// * Add Bank
// *-------------------

const addBank = async (req, res) => {
  try {
    const { name, link, logo, type } = req.body;

    // Check if the bank already exists
    const govtBank = await GovtBank.findOne({ name });
    const pvtBank = await PvtBank.findOne({ name });

    let BankCreated;
    if (type === "government") {
      if (govtBank) {
        return res
          .status(400)
          .json({ message: "Government Bank Name already exists" });
      }
      BankCreated = await GovtBank.create({ name, logo, link });
    } else {
      if (pvtBank) {
        return res
          .status(400)
          .json({ message: "Private Bank Name already exists" });
      }
      BankCreated = await PvtBank.create({ name, logo, link });
    }

    res.status(201).json({
      msg: "Bank added Successful",
      bankId: BankCreated._id.toString(),
    });
  } catch (error) {
    console.error("Error adding Bank:", error);
    res.status(500).json("Internal server error");
  }
};

// *-------------------
// * update bank
// *-------------------
const updateBankById = async (req, res) => {
  try {
    const id = req.params.id; // same ad route (/:id)
    const updatedBankdata = req.body;

    const govtBank = await GovtBank.findById(id);
    if (govtBank) {
      const updateData = await GovtBank.updateOne(
        { _id: id },
        {
          $set: updatedBankdata,
        }
      );
      return res.status(200).json(updateData);
    }
    const pvtBank = await PvtBank.findById(id);
    if (pvtBank) {
      const updateData = await PvtBank.updateOne(
        { _id: id },
        {
          $set: updatedBankdata,
        }
      );
      return res.status(200).json(updateData);
    }
    return res.status(404).json({ message: "Bank not found" });
  } catch (error) {
    next(error);
  }
};

// *-------------------
// * delete banks
// *-------------------

const deletebankById = async (req, res) => {
  try {
    const id = req.params.id; // same ad route (/:id)
    console.log(id);
    const govtBank = await GovtBank.findById(id);
    if (govtBank) {
      await GovtBank.deleteOne({ _id: id });
      return res
        .status(200)
        .json({ message: "Government Bank Deleted Successfully" });
    }
    const pvtBank = await PvtBank.findById(id);
    if (pvtBank) {
      await PvtBank.deleteOne({ _id: id });
      return res
        .status(200)
        .json({ message: "Private Bank Deleted Successfully" });
    }
    return res.status(404).json({ message: "Bank not found" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllUsers,
  getAllBanks,
  deleteUserById,
  deletebankById,
  getUserById,
  updateUserById,
  updateBankById,
  addUser,
  addBank,
};
