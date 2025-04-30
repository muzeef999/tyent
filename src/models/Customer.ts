import mongoose from 'mongoose';

const customerSchema = new mongoose.Schema({
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
  serviceHistory: [String],
  upcomingServices: [String],
}, { timestamps: true });

export default mongoose.models.Customer || mongoose.model("Customer", customerSchema);
