// src/models/Customer.ts
import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
  type: String,
  date: String,
  status: String,
  remarks: String,
});

const paymentSchema = new mongoose.Schema({
  amount: Number,
  status: String,
  mode: String,
  receivedDate: String,
  pendingAmount: Number,
  remarks: String,
});

const customerSchema = new mongoose.Schema(
  {
    name: String,
    contactNumber: String,
    email: String,
    address: String,
    installedModel: String,
    price: Number,
    invoiceNumber: String,
    serialNumber: String,
    warranty: Number,
    amcRenewed: Number,
    remarks: String,
    serviceHistory: [serviceSchema],
    upcomingServices: [serviceSchema],
    payments: [paymentSchema],
  },
  { timestamps: true }
);

export default mongoose.models.Customer ||
  mongoose.model("Customer", customerSchema);
