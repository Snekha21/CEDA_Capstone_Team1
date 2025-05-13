import express from 'express';
import {
createCustomer,
getCustomersDetails,
getCustomers,
updateCustomer,
deleteCustomer,
addOrderToCustomer,
getOrders
} from '../controllers/customerController.js';

const router = express.Router();
router.get('/orders/:id', getOrders);
router.post('/add', createCustomer);
router.get('/', getCustomersDetails);
router.get('/:id', getCustomers);
router.put('/:id', updateCustomer);
router.delete('/:id', deleteCustomer);
router.post('/:id/orders', addOrderToCustomer);

export default router;

