const mongoose = require("../mongooseConfig");

let expenseSchema = new mongoose.Schema({
  Irn: String,
  AckDt: String,
  AckNo: String,
  SignedInvoice: String,
  SignedQRCode: String,
});

const einvoiceModel = mongoose.model("einvoice", expenseSchema);

module.exports = einvoiceModel;
