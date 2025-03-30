"use client";
import { useEffect, useState } from "react";
import styles from "./page.module.css";
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
                const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/v1/slots/All`, {
                    credentials: "include"
                });
                if (!response.ok) throw new Error("Failed to fetch slots");
                const { data } = await response.json();
                // console.log("date in first slot ,", data[0].slot_date, " ", data[0].slot_id);
                setSlots(data);
            } catch (err) {
                setError("No Slot bookings found!");
            } finally {
                setLoading(false);
            }
        };

        fetchAllBookings();
    }, [changeStatus]);

    const handleSlotUpdate = async (slot_id: number,action: string) => {
        try {
            if (!slot_id || !action) throw new Error('SlotID & action both required.');
            if (action === "confirm") {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/v1/slots/approve`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ slot_id , name}),
                    credentials: "include"
                }
                );
                if (!response.ok) throw new Error('Failed response from /approve');
                const { data } = await response.json();
                alert(`slotID : ${data.slot_id} booked`);
            } else {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/v1/slots/cancel`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ slot_id }),
                    credentials: "include"
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
        <main className={styles.container}>
            <h2 className={styles.title}>Booking Requests</h2>

            {loading ? (
                <p className={styles.loading}>Loading slots...</p>
            ) : error ? (
                <p className={styles.error}>{error}</p>
            ) : slots.length === 0 ? (
                <p className={styles.noSlots}>No slots available.</p>
            ) : (
                <div className={styles.slotGrid}>
                    {slots.map((slot) => (
                        <div key={slot.slot_id} className={styles.slotCard}>
                            <div className={styles.slotHeader}>
                                <span className={styles.statusBadge}>
                                    {slot.status}
                                </span>
                            </div>
                            <div className={styles.slotDetails}>
                                <p><strong>Doctor:</strong> {slot.name}</p>
                                <p><strong>User:</strong> {slot.user_name}</p>
                                <p><strong>Date:</strong> {slot.slot_date}</p>
                                <p><strong>Time:</strong> {slot.slot_time}</p>
                                <p><strong>Mode:</strong> {slot.book_mode}</p>
                                <p><strong>Created:</strong> {new Date(slot.created_at).toLocaleString()}</p>
                                {slot.book_mode === "offline" && (
                                    <p><strong>Location:</strong> {slot.location}</p>
                                )}
                            </div>

                            {slot.status === "pending" && (
                                <div className={styles.buttonContainer}>
                                    <button
                                        className={styles.confirmButton}
                                        onClick={() => handleSlotUpdate(slot.slot_id, "confirm")}
                                    >
                                        Confirm
                                    </button>
                                    <button
                                        className={styles.cancelButton}
                                        onClick={() => handleSlotUpdate(slot.slot_id, "cancel")}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </main>
    );
};

export default BookingReqPage;
