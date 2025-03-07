import express from 'express'
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { RentalRequestValidation } from './order.validation';
import { OrderController } from './order.controller';

const router=express.Router();

router.post('',auth('tenant'),validateRequest(RentalRequestValidation.RentalRequestCreateValidationSchema),OrderController.createRequest)

router.get('/verify', auth('tenant'), OrderController.verifyPayment);

router.get('/myRequests/:id',auth('tenant'),OrderController.getOrdersByEmail)

router.patch('/update/:id',auth('landlord'),OrderController.updateOrder);

router.get('/:id',auth('admin'),OrderController.getSingleOrder)

router.delete('/:id',auth('admin'),OrderController.deleteOrder)


router.get('',OrderController.getAllOrders)

router.get('/myOwnRequest/:id',auth('landlord'),OrderController.getOrdersByOwn)

router.patch('/payment/:id',auth('tenant'),OrderController.createOrderpayment);




export const OrderRoutes=router;