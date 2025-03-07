export interface IUser {
    id: string; 
    name: string;
    email: string; 
    phoneNumber: string;
    password: string;
    role: "admin" | "landlord" | "tenant";
    deactive: boolean;
}