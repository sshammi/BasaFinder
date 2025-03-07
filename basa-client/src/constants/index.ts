export const protectedRoutes = [
    /^\/(landlord|admin|tenant|create-rental-house|rental-request)(\/.*)?$/,
    /^\/(landlord|tenant|admin)\/.*$/,
    "/change-pass",
    "/verfiOrder",
    "/profileUpdate",
    "/rental-request/:path*",
    "/landlord/:path*",
    "/admin/:path*",
    "/tenant/:path*",
    "/create-rental-house",
];
