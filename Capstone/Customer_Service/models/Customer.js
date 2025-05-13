import mongoose from 'mongoose';

const customerSchema = new mongoose.Schema({
  name: String,
  age: Number,
  gender: String,
  skinType: String,
  email: { type: String, unique: true },
  password:{ type: String},
  orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }]
});

const Customer = mongoose.model('Customer',customerSchema);
export default Customer;

