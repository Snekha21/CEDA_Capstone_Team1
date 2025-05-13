import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  product: String,
  price: Number,
  quantity: Number,
  orderDate: { type: Date, default: Date.now },
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' }
});

const Order = mongoose.model('Order',orderSchema);
export default Order;
