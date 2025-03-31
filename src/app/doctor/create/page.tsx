"use client"
import { useState } from "react";
import ImageUpload from "@/app/components/UI/ImageUpload/ImageUpload.jsx";
import styles from "./page.module.css";
type AvailabilityType = {
    [day: string]: string[]; // Each day has an array of time slots
};

type DoctorType = {
    name: string;
    gender: string;
    specification: string;
    experience: number;
    description: string;
    location: string;
    degree: string;
    availability?: AvailabilityType; // Optional JSONB-like structure
    image_url: string;
    rating: number;
};



const createDoctorPage = () => {
    const [formData, setFormData] = useState<DoctorType>({
        name: "",
        gender: "",
        specification: "",
        experience: 0,
        description: "",
        location: "",
        degree: "",
        availability: {
            Monday: [],
            Tuesday: [],
            Wednesday: [],
            Thursday: [],
            Friday: [],
            Saturday: [],
            Sunday: [],
        },
        image_url: "",
        rating: 0,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleAvailabilityChange = (day: string, timeSlot: string) => {
        setFormData((prevData) => ({
            ...prevData,
            availability: {
                ...prevData.availability,
                [day]: [...(prevData.availability?.[day] || []), timeSlot],
            },
        }));
    };

    const onUpload = (image_url: string) => {
        setFormData({ ...formData, image_url: image_url })
    }
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/v1/doctors/createDoctor`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
                credentials: "include",
            });

            if (response.ok) {
                alert("Doctor added successfully!");
                setFormData({
                    name: "",
                    gender: "",
                    specification: "",
                    experience: 0,
                    description: "",
                    location: "",
                    degree: "",
                    availability: {
                        Monday: [],
                        Tuesday: [],
                        Wednesday: [],
                        Thursday: [],
                        Friday: [],
                        Saturday: [],
                        Sunday: [],
                    },
                    image_url: "",
                    rating: 0
                });
            } else {
                alert("Failed to add doctor.");
                throw new Error("response not ok!");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Something went wrong.");
        }
    };

    return (
        <main className={styles.container}>
            <h1 className={styles.heading}>Add a New Doctor</h1>
            <form onSubmit={handleSubmit} className={styles.form}>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Doctor's Name"
                    required
                    className={styles.input}
                />

                <select name="gender" value={formData.gender} onChange={handleChange} required className={styles.input}>
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>

                <input
                    type="text"
                    name="specification"
                    value={formData.specification}
                    onChange={handleChange}
                    placeholder="Specialization"
                    required
                    className={styles.input}
                />
                <label htmlFor="experience">
                    Experience
                    <input
                        type="number"
                        name="experience"
                        value={formData.experience}
                        onChange={handleChange}
                        placeholder="Years of Experience"
                        required
                        className={styles.input}
                        id="experience"
                    />
                </label>

                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Description"
                    required
                    className={styles.input}
                />

                <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="Location"
                    required
                    className={styles.input}
                />

                <input
                    type="text"
                    name="degree"
                    value={formData.degree}
                    onChange={handleChange}
                    placeholder="Degree"
                    required
                    className={styles.input}
                />
                <label htmlFor="rating">
                    Rate
                    <input
                        type="number"
                        name="rating"
                        value={formData.rating}
                        onChange={handleChange}
                        placeholder="Rating"
                        required
                        className={styles.input}
                        id="rating"
                    />
                </label>

                <h2 className={styles.subHeading}>Availability</h2>
                {Object.keys(formData.availability || {}).map((day) => (
                    <div key={day} className={styles.availability}>
                        <label className={styles.label}>{day}</label>
                        <input
                            type="text"
                            placeholder="Enter time slot"
                            className={styles.input}
                            onBlur={(e) => handleAvailabilityChange(day, e.target.value)}
                        />
                    </div>
                ))}

                <ImageUpload onUpload={onUpload} />

                <button type="submit" className={styles.button}>Add Doctor</button>
            </form>
        </main>
    );
};

export default createDoctorPage;