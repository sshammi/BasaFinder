/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { StatusCodes } from "http-status-codes";
import AppError from "../../errors/AppError";
import { Torder } from "./order.interface";
import Order from "./order.model";
import { v4 as uuidv4 } from 'uuid';
import { orderUtils } from "./order.utils";
import { sendEmail } from "../../utils/sendEmail";
import { User } from "../user/user.model";

// Create a new order
const createRequest = async (payload: Torder) => {
    const newOrder= await Order.create(payload);
    const { landlordId } = payload;
    const landlord = await User.findById(landlordId);
    
    if (!landlord) {
      throw new Error("Landlord not found.");
    }
    const from=newOrder.email;
    const to=landlord.email;
    const html = `
      You have a new order request. Order details:
      Order ID: ${newOrder._id}
      Tenant Name: ${newOrder.name}
      Message: ${newOrder.message}
    `;
    //console.log(from,to);
    sendEmail(from,to,html);

    return newOrder;
};


// payment create

export const createPayment = async (requestId: string , client_ip: string) => {
  let order = await Order.findById(requestId);
  //console.log(order);
  if (!order) {
    throw new Error("Order not found");
  }

  const shurjopayPayload = {
    amount: 1000,
    order_id: uuidv4(),
    currency: "BDT",
    customer_city: "N/A",
    customer_name: order.name,
    customer_address:"N/A",
    customer_email: order.email,
    customer_phone: "N/A",
    client_ip,
  };

  const payment = await orderUtils.makePaymentAsync(shurjopayPayload);
  console.log(payment);
  if (payment?.transactionStatus) {
    order=await order.updateOne({
      transaction :{
        id: payment.sp_order_id,
        transactionStatus: payment.transactionStatus,
      }
    })
  }
  return payment.checkout_url;
};

// verify

const verifyPayment = async (order_id: string) => {
  const verifiedPayment = await orderUtils.verifyPaymentAsync(order_id);
  //console.log(verifiedPayment);
  if (verifiedPayment.length) {
    await Order.findOneAndUpdate(
      {
        "transaction.id": order_id,
      },
      {
        "transaction.bank_status": verifiedPayment[0].bank_status,
        "transaction.sp_code": verifiedPayment[0].sp_code,
        "transaction.sp_message": verifiedPayment[0].sp_message,
        "transaction.transactionStatus": verifiedPayment[0].transaction_status,
        "transaction.method": verifiedPayment[0].method,
        "transaction.date_time": verifiedPayment[0].date_time,
        paymentStatus:
          verifiedPayment[0].bank_status == "Success"
            ? "Paid"
            : verifiedPayment[0].bank_status == "Failed"
            ? "Pending"
            : verifiedPayment[0].bank_status == "Cancel"
            ? "Cancelled"
            : "",
      }
    );
  }
 // console.log(verifiedPayment);
  return verifiedPayment;
};
// Get all orders with filtering, sorting, and pagination
const getAllOrders = async () => {
    const orders = await Order.find();
    return orders;
};

// Get a single order by ID
const getOrderById = async (orderId: string) => {
  const order = await Order.findById(orderId);
  if (!order) {
    throw new AppError(StatusCodes.NOT_FOUND, "Order not found");
  }
  return order;
};

// Update an order by ID
const updateOrder = async (orderId: string, updateData: Partial<Torder>) => {
  const updatedOrder = await Order.findByIdAndUpdate(orderId, updateData, { new: true });
  if (!updatedOrder) {
    throw new AppError(StatusCodes.NOT_FOUND, "Order not found");
  }
  return updatedOrder;
};

// Delete an order by ID
const deleteOrder = async (orderId: string) => {
  const deletedOrder = await Order.findByIdAndDelete(orderId);
  if (!deletedOrder) {
    throw new AppError(StatusCodes.NOT_FOUND, "Order not found");
  }
  return deletedOrder;
};


const getOwnOrder = async (tenantId: string) => {
  const orders = await Order.find({tenantId});
  if (!orders.length) {
    throw new AppError(StatusCodes.NOT_FOUND, "No orders found for this ID");
  }
  return orders;
};

const getOwnRequest = async (landlordId: string) => {
  const orders = await Order.find({landlordId});
  if (!orders.length) {
    throw new AppError(StatusCodes.NOT_FOUND, "No orders found for this ID");
  }
  return orders;
};

// Export services
export const OrderServices = {
  createRequest,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
  verifyPayment,
  getOwnOrder,
  getOwnRequest,
  createPayment,
};
