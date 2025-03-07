import { Schema, model} from "mongoose";
import { Torder } from "./order.interface";

const orderSchema = new Schema<Torder>(
  {
    name:{
      type:String,
      required:true,
    },
    email:{
      type:String,
    },
    phoneNumber:{
      type:String,
    },
    landlordId:{
      type:Schema.Types.ObjectId,
      ref:"User",
      required:true,
    },
    listingId: {
      type: Schema.Types.ObjectId,
      ref: "Bike",
      required: true,
    },
    tenantId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    landlordPhone: {
      type: String,
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "completed"],
      default:'pending',
    },
    message: {
      type: String,
    },
    
    transaction: {
      id: String,
      transactionStatus: String,
      bank_status: String,
      sp_code: String,
      sp_message: String,
      method: String,
      date_time: String,
    },
  },
  { timestamps: true }
);

const Order = model<Torder>("RentalRequest", orderSchema);

export default Order;
