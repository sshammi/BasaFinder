export interface IUser {
    name: string;
    email: string;
    phoneNumber: string;
    password: string;
    role: "admin" | "landlord" | "tenant";
    deactive:boolean;
}