"use client";
import { useEffect, useState } from "react";

type SlotType = {
    slot_id: number;
    user_name: string;
    name: string;
    slot_date: string;
    slot_time: string;
    book_mode: string;
    status: string;
    created_at: string;
    location: string;
};

const BookingReqPage = () => {
    const [slots, setSlots] = useState<SlotType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [changeStatus, setChangeStatus] = useState(false);

    useEffect(() => {
        const fetchAllBookings = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/v1/slots/All`);
                if (!response.ok) throw new Error("Failed to fetch slots");

                const { data } = await response.json();
                setSlots(data);
            } catch (err) {
                setError("Error fetching slots. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchAllBookings();
    }, [changeStatus]);

    const handleSlotUpdate = async (slot_id: number, action: string) => {
        try {
            if (!slot_id || !action) throw new Error('SlotID & action both required.');
            if (action === "confirm") {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/v1/slots/approve`,{
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({slot_id}),
                }
                );
                if (!response.ok) throw new Error('Failed response from /approve');
                const { data } = await response.json();
                alert(`slotID : ${data.slot_id} booked`);
            } else {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/v1/slots/cancel`,{
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body : JSON.stringify({slot_id}),
                });
                if (!response.ok) throw new Error('Failed response from /cancel');
                const { data } = await response.json();
                alert(`slotID : ${data.slot_id} canceled`);
            }
            setChangeStatus(!changeStatus);
        } catch (err) {
            console.log('Error while handle slot.', err);
        }
    }

    return (
        <main className="p-5">
            <h2 className="text-xl font-semibold mb-4">Booking Requests</h2>

            {loading ? (
                <p className="text-blue-500">Loading slots...</p>
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : slots.length === 0 ? (
                <p className="text-gray-500">No slots available.</p>
            ) : (
                <ul>
                    {slots.map((slot) => (
                        <li key={slot.slot_id} className="border p-3 rounded shadow-md mb-2">
                            <strong>Slot ID:</strong> {slot.slot_id} <br />
                            <strong>Doctor ID:</strong> {slot.user_name} <br />
                            <strong>User Email:</strong> {slot.name} <br />
                            <strong>Slot Date:</strong> {slot.slot_date} <br />
                            <strong>Slot Time:</strong> {slot.slot_time} <br />
                            <strong>Booking Mode:</strong> {slot.book_mode} <br />
                            <strong>Status:</strong> {slot.status} <br />
                            <strong>Created At:</strong> {new Date(slot.created_at).toLocaleString()} <br />
                            {slot.book_mode === "offline" && (
                                <p><strong>Location:</strong> {slot.location}</p>
                            )}


                            {/* Show Confirm and Cancel buttons only if the status is "pending" */}
                            {slot.status === "pending" && (
                                <div className="mt-2">
                                    <button
                                        className="bg-green-500 text-white px-4 py-2 rounded mr-2"
                                        onClick={() => handleSlotUpdate(slot.slot_id, "confirm")}
                                    >
                                        Confirm
                                    </button>
                                    <button
                                        className="bg-red-500 text-white px-4 py-2 rounded"
                                        onClick={() => handleSlotUpdate(slot.slot_id, "cancel")}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>

            )}
        </main>
    );
};

export default BookingReqPage;
