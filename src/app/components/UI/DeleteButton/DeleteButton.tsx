"use client";

import { useState } from "react";
import styles from "./DeleteButton.module.css";

export default function DeleteDoctorButton({ doc_id }: { doc_id: number }) {
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDeleteDoctor = async () => {
        if (!confirm("Are you sure you want to delete this doctor?")) return;

        setIsDeleting(true);
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/v1/doctors/delete/${doc_id}`, {
                method: "DELETE",
                credentials: "include",
            });

            if (!response.ok) throw new Error("Failed to delete doctor.");

            window.location.reload(); // Refresh page to reflect changes
        } catch (err) {
            console.log("Error deleting doctor: ", err);
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <button className={styles.deleteButton} onClick={handleDeleteDoctor} disabled={isDeleting}>
            {isDeleting ? "Deleting..." : "Delete"}
        </button>
    );
}
