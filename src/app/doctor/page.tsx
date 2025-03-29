import { fetchAllDoctors } from "@/lib/fetchAllDoctors" // Server-side function
import DeleteDoctorButton from "@/app/components/UI/DeleteButton/DeleteButton";
import styles from "./page.module.css";
import Link from "next/link";
import {redirect} from "next/navigation";
import { isUserAuthenticated } from "@/lib/isUserAuthenticated";
type Doctor = {
    doc_id: number;
    name: string;
    degree: string;
    specification: string;
    experience: number;
    rating: number;
    image_url: string;
};

export default async function DoctorsPage() {
   const isAuthenticated = await isUserAuthenticated();
   console.log('Is auth in doctor : - ', isAuthenticated);
   if(!isAuthenticated){
    redirect("/login");
   }
    let doctors:Doctor[] = [];
    try{
        doctors = await fetchAllDoctors(); // Fetch data on the server
    } catch(err){
        console.log("Error fetching catch block ", err);
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>Doctors List</h1>
                <Link href='/doctor/create'>
                    <button className={styles.createButton}>Create Doctor</button>
                </Link>
            </div>
            <div className={styles.grid}>
                {doctors?.map((doctor) => (
                    <div key={doctor.doc_id} className={styles.card}>
                        <img src={doctor.image_url} alt={doctor.name} className={styles.image} />
                        <h2 className={styles.name}>{doctor.name}</h2>
                        <p className={styles.details}>
                            {doctor.degree} - {doctor.specification}
                        </p>
                        <p className={styles.experience}>Experience: {doctor.experience} years</p>
                        <p className={styles.rating}>⭐ {doctor.rating}</p>
                        {/* Delete Button (Client Component) */}
                        <DeleteDoctorButton doc_id={doctor.doc_id} />
                    </div>
                ))}
            </div>
        </div>
    );
}
