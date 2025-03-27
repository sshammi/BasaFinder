'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { RentalCreateRequest } from '@/services/requestRental';
import { useUser } from '@/context/UserContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { getSingleHouse } from '@/services/house';

const RentalRequest = () => {
    const { houseId } = useParams<{ houseId: string }>();
    const { user, setIsLoading } = useUser();
    const router = useRouter();
    const [agree, setAgree] = useState(false);
    const [landlordId, setLandlordId] = useState<string | null>(null);

    const form = useForm({
        defaultValues: {
            name: '',
            email: '',
            phoneNumber:'',
            message: '',
        },
    });

    useEffect(() => {
        if (user) {
            form.setValue('email', user.email || '');
        }
    }, [user, form]);

    useEffect(() => {
        // Fetch the house details to get the landlordId
        const fetchHouseData = async () => {
            try {
                const houseData = await getSingleHouse(houseId);
                setLandlordId(houseData?.data.landlordId|| null);
            } catch (error) {
                console.error('Error fetching house data:', error);
                toast.error('Failed to fetch house data');
            }
        };

        if (houseId) {
            fetchHouseData();
        }
    }, [houseId]);
    //console.log(landlordId);
    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        try {
            if (!agree) {
                toast.error('You must agree to the terms and conditions.');
                return;
            }

            if (!landlordId) {
                toast.error('Landlord ID is not available.');
                return;
            }

            const rentalRequest = {
                listingId: houseId,
                tenantId: user?.id,
                landlordId: landlordId,
                status: 'pending',
                message: data.message,
                name: data.name,
                email: data.email,
                phoneNumber:data.phoneNumber,
            };

            const res = await RentalCreateRequest(rentalRequest);
            if (res.success) {
                toast.success('Request created successfully!');
                router.push('/');
            }
        } catch (error) {
            console.error('Error during rental request:', error);
            toast.error('Failed to request rental');
        }
    };

    return (
        <div className="max-w-lg mx-auto p-6 bg-white rounded shadow-md">
            <h2 className="text-xl font-bold mb-4">Request a Rental House</h2>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Full Name</FormLabel>
                                <FormControl>
                                    <Input {...field} required />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input {...field} readOnly />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="phoneNumber"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>PhoneNumber</FormLabel>
                                <FormControl>
                                    <Input {...field}/>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Message</FormLabel>
                                <FormControl>
                                    <Textarea {...field} placeholder="Enter your message..." required />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="flex items-center gap-2">
                        <Checkbox checked={agree} onCheckedChange={(checked) => setAgree(checked === true)} />
                        <label>I agree to the terms and conditions</label>
                    </div>

                    <Button className='bg-[#FF4B27] hover:bg-orange-500 text-white' type="submit">Submit Request</Button>
                </form>
            </Form>
        </div>
    );
};

export default RentalRequest;
