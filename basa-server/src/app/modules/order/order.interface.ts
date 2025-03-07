import { ObjectId } from "mongoose";

export interface Torder {
  name:string;
  email:string;
  phoneNumber:string;
  landlordId:ObjectId;
  listingId: ObjectId;
  tenantId: ObjectId;
  status: "pending" | "approved" | "rejected";
  landlordPhone?: string;
  paymentStatus?: "pending" | "completed";
  message?: string;

  transaction: {
    id: string;
    transactionStatus: string;
    bank_status: string;
    sp_code: string;
    sp_message: string;
    method: string;
    date_time: string;
  };
}