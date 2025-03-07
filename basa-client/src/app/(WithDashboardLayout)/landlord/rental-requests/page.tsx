'use client';

import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { useUser } from '@/context/UserContext';
import { Button } from '@/components/ui/button';
import { getMyOwn, updateRequest } from '@/services/requestRental';
import { RentalRequest } from '@/types/request';

const LandlordRequests = () => {
    const { user } = useUser();
    const [requests, setRequests] = useState<RentalRequest[]>([]);
    useEffect(() => {
        if (user?.id) {
            fetchRequests(user.id);
        }
    }, [user]);

    const fetchRequests = async (tenantId: string) => {
        try {
            const response = await getMyOwn(tenantId);
            //console.log(response);
            setRequests(response?.data || []);
        } catch (error) {
            console.error('Failed to fetch requests:', error);
            toast.error('Error fetching requests');
        }
    };

    const updateRequestStatus = async (requestId: string, newStatus: 'approved' | 'rejected') => {
        try {
            // Prepare the houseData with the new status
            const houseData = { status: newStatus };

            // Call the updateRequest function
            const res = await updateRequest(requestId, houseData);
            if (res.success) {
                toast.success('Request status updated successfully!');
                if (user?.id) {
                    fetchRequests(user.id);
                }
            } else {
                toast.error('Failed to update status');
            }
        } catch (error) {
            console.error('Error updating request status:', error);
            toast.error('Error updating request status');
        }
    };


    //console.log(requests);
    return (
        <div className="max-w-3xl mx-auto p-14 bg-white rounded shadow-md">
            <h2 className="text-xl font-bold mb-4">Rental Requests</h2>
            {requests.length === 0 ? (
                <p>No rental requests found.</p>
            ) : (
                <ul className="space-y-4">
                    {requests.map((request) => (
                        <li key={request._id} className="p-4 border rounded">
                            <p><strong>Tenant Name:</strong> {request.name}</p>
                            <p><strong>Email:</strong> {request.email}</p>
                            <p><strong>Message:</strong> {request.message}</p>
                            <p><strong>Status:</strong> {request.status}</p>
                            <p><strong>Payment Status:</strong> {request.paymentStatus}</p>
                            {request.status === "approved" && request.phoneNumber && (
                                <p className="mt-2"><strong>Landlord Contact:</strong> {request.phoneNumber}</p>
                            )}
                            <div className="flex gap-2 mt-4">
                                <Button
                                    onClick={() => updateRequestStatus(request._id, 'approved')}
                                    disabled={request.status === 'approved'}
                                    className="bg-green-500"
                                >
                                    Approve
                                </Button>
                                <Button
                                    onClick={() => updateRequestStatus(request._id, 'rejected')}
                                    disabled={request.status === 'rejected'}
                                    className="bg-red-500"
                                >
                                    Reject
                                </Button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default LandlordRequests;
