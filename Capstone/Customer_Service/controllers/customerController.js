import Customer from '../models/Customer.js';
import Order from '../models/Order.js';

// Create customer
export const createCustomer = async (req, res) => {
  try {
  const customer = new Customer(req.body);
  await customer.save();
  res.status(201).json(customer);
  } catch (err) {
  res.status(400).json({ error: err.message });
  }
};

// Get all customers with orders
export const getCustomersDetails = async (req, res) => {
  try {
  const customers = await Customer.find().populate('orders');
  res.json(customers);
  } catch (err) {
  res.status(500).json({ error: err.message });
  }
};

export const getCustomers = async (req, res) => {
  try {
  const customers = await Customer.findById(req.params.id);
  res.json(customers);
  } catch (err) {
  res.status(500).json({ error: err.message });
  }
};
// Update customer
export const updateCustomer = async (req, res) => {
  try {
  const updated = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
  } catch (err) {
  res.status(400).json({ error: err.message });
}
};

// Delete customer
export const deleteCustomer = async (req, res) => {
  try {
  await Customer.findByIdAndDelete(req.params.id);
  res.json({ message: 'Customer deleted' });
  } catch (err) {
  res.status(400).json({ error: err.message });
  }
};
//Get Orders
export const getOrders = async (req, res) => {
  const { id } = req.params;
  try {
    // find customer by _id and populate their orders
    const customer = await Customer
      .findById(id)
      .populate('orders');

    if (!customer) {
      return res
        .status(404)
        .json({ error: `No customer found with id ${id}` });
    }

    // return only the orders for that customer
    res.json(customer.orders);
  } catch (err) {
    console.error('Error fetching orders for customer', id, err);
    res.status(500).json({ error: err.message });
  }
};
// Add order to customer
export const addOrderToCustomer = async (req, res) => {
  try {
  const customer = await Customer.findById(req.params.id);
  if (!customer) return res.status(404).json({ error: 'Customer not found' });

  const order = new Order({ ...req.body, customer: customer._id });
  await order.save();

  customer.orders.push(order);
  await customer.save();

  res.status(201).json(order);
  } catch (err) {
  res.status(400).json({ error: err.message });
  }
};

