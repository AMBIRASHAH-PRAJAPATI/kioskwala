// bank-controller.js

const { GovtBank, PvtBank } = require("../models/banks-model");


// *-------------------
// * government banks
// *-------------------
const govtBanks = async (req, res) => {
  try {
    const response = await GovtBank.find();
    if (!response) {
      res.status(404).json({ msg: "No government banks found" });
      return;
    }
    res.status(200).json({ msg: response });
  } catch (error) {
    console.log(`Government Banks: ${error}`);
  }
};

// *-------------------
// * private banks
// *-------------------
const pvtBanks = async (req, res) => {
  try {
    const response = await PvtBank.find();
    if (!response) {
      res.status(404).json({ msg: "No private banks found" });
      return;
    }
    res.status(200).json({ msg: response });
  } catch (error) {
    console.log(`Private Banks: ${error}`);
  }
};

module.exports = { govtBanks, pvtBanks };

