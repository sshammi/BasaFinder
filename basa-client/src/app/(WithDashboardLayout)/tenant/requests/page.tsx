'use client';

import { useEffect, useState } from 'react';
import { createMypayment, getMyRequest } from '@/services/requestRental';
import { useUser } from '@/context/UserContext';
import { RentalRequest } from '@/types/request';

const MyRequestsPage = () => {
    const { user } = useUser();
    const [requests, setRequests] = useState<RentalRequest[]>([]);
    const [loading, setLoading] = useState(true);

    const handlePayment = async (tenantId: string) => {
        try {
            const paymentResponse = await createMypayment(tenantId, {});
            console.log(paymentResponse?.data?.result);
            if (paymentResponse?.data.result) {
                // Redirect user to payment page
                window.location.href = paymentResponse.data.result;
            } else {
                console.log("Payment failed or checkout URL missing", paymentResponse);
            }
        } catch (error) {
            console.log("Error processing payment:", error);
        }
    };

    useEffect(() => {
        const fetchRequests = async () => {
            if (!user?.id) return;
            try {
                const data = await getMyRequest(user.id);
                setRequests(Array.isArray(data?.data) ? data?.data : []);
                setLoading(false);
            } catch (err) {
                console.log(err);
            }
        };
        fetchRequests();
    }, [user]);
    console.log(requests);
    if (loading) return <p>Loading...</p>;
    console.log(requests);
    return (
        <div className="max-w-3xl mx-auto p-14 bg-white rounded shadow-md">
            <h2 className="text-xl font-bold mb-4">My Rental Requests</h2>
            {requests.length === 0 ? (
                <p>No rental requests found.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {requests.map((request) => (
                        <div key={request._id} className="p-4 border rounded bg-white shadow-md">
                            <p><strong>Tenant Name:</strong> {request.name}</p>
                            <p><strong>Email:</strong> {request.email}</p>
                            <p><strong>Message:</strong> {request.message}</p>
                            <p><strong>Status:</strong> {request.status}</p>
                            <p><strong>Payment Status:</strong> {request.paymentStatus}</p>
                            <button
                                disabled={request.status !== 'approved' || request.paymentStatus === 'Paid'}
                                onClick={() => handlePayment(request._id)}
                                className={`mt-4 px-4 py-2 rounded ${request.status === 'approved' && request.paymentStatus !== 'paid'
                                        ? 'bg-green-500 text-white'
                                        : 'bg-gray-400 text-gray-800'
                                    }`}
                            >
                                {request.paymentStatus === 'Paid' ? 'Payment Completed' : request.status === 'approved' ? 'Proceed to Payment' : 'Payment Disabled'}
                            </button>


                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyRequestsPage;