"use client"
import { useState } from "react";
import ImageUpload from "@/app/components/UI/ImageUpload/ImageUpload.jsx";

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
    image_url : string;
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

    const onUpload = (image_url:string)=>{
        setFormData({...formData, image_url: image_url})
    }
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:3003/api/v1/doctors/createDoctor", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
                credentials:"include",
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
                    image_url: ""
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
        <main className="p-6">
            <h1 className="text-2xl font-bold mb-4">Add a New Doctor</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Doctor's Name" required className="border p-2 w-full" />

                <select name="gender" value={formData.gender} onChange={handleChange} required className="border p-2 w-full">
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>

                <input type="text" name="specification" value={formData.specification} onChange={handleChange} placeholder="Specialization" required className="border p-2 w-full" />

                <input type="number" name="experience" value={formData.experience} onChange={handleChange} placeholder="Years of Experience" required className="border p-2 w-full" />

                <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" required className="border p-2 w-full" />

                <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="Location" required className="border p-2 w-full" />

                <input type="text" name="degree" value={formData.degree} onChange={handleChange} placeholder="Degree" required className="border p-2 w-full" />

                <h2 className="text-xl font-bold mt-4">Availability</h2>
                {Object.keys(formData.availability || {}).map((day) => (
                    <div key={day} className="border p-2">
                        <label className="font-semibold">{day}</label>
                        <input type="text" placeholder="Enter time slot" className="border p-2 w-full mt-2"
                            onBlur={(e) => handleAvailabilityChange(day, e.target.value)} />
                    </div>
                ))}
                <br />

                <ImageUpload onUpload={onUpload}/>

                <br />
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Add Doctor</button>
            </form>
        </main>
    );
};

export default createDoctorPage;