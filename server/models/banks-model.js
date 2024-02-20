const { Schema, model } = require('mongoose');

const BankSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  logo: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
});

const GovtBank = model('GovtBanks', BankSchema);
const PvtBank = model('PvtBanks', BankSchema);

module.exports = { GovtBank, PvtBank };
