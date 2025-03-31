import { fetchAllDoctors } from "@/lib/fetchAllDoctors" // Server-side function
import DeleteDoctorButton from "@/app/components/UI/DeleteButton/DeleteButton";
import styles from "./page.module.css";
import Link from "next/link";
import {redirect} from "next/navigation";
import { isUserAuthenticated } from "@/lib/isUserAuthenticated";
import { FaMapMarkerAlt, FaGraduationCap, FaBriefcase, FaStar } from "react-icons/fa";

type Doctor = {
    doc_id: number;
    name: string;
    degree: string;
    specification: string;
    experience: number;
    rating: number;
    image_url: string;
    location : string;
    description: string;
};

export default async function DoctorsPage() {
   const isAuthenticated = await isUserAuthenticated();
//    console.log('Is auth in doctor : - ', isAuthenticated);
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
        <main className={styles.container}>
            <section className={styles.header}>
                <h1 className={styles.title}>Doctors List</h1>
                <Link href="/doctor/create">
                    <button className={styles.createButton}>+ Add Doctor</button>
                </Link>
            </section>

            <section className={styles.flexContainer}>
                {doctors?.map((doctor) => (
                    <div key={doctor.doc_id} className={styles.card}>
                        <div className={styles.imageWrapper}>
                            <img src={doctor.image_url} alt={doctor.name} className={styles.image} />
                        </div>
                        <div className={styles.cardBody}>
                            <h2 className={styles.name}>{doctor.name}</h2>
                            <div className={styles.detailsContainer}>
                                <p className={styles.details}>
                                    <FaGraduationCap className={styles.icon} />
                                    {doctor.degree} - {doctor.specification}
                                </p>
                                <p className={styles.experience}>
                                    <FaBriefcase className={styles.icon} />
                                    {doctor.experience} years experience
                                </p>
                                <p className={styles.rating}>
                                    <FaStar className={styles.icon} />
                                    {doctor.rating?doctor.rating:0}
                                </p>
                                <p className={styles.location}>
                                    <FaMapMarkerAlt className={styles.icon} />
                                    {doctor.location}
                                </p>
                            </div>
                            <div className={styles.descriptionContainer}>
                                <p className={styles.description}>{doctor.description}</p>
                            </div>
                        </div>
                        <div className={styles.cardFooter}>
                            <DeleteDoctorButton doc_id={doctor.doc_id} />
                        </div>
                    </div>
                ))}
            </section>
        </main>
    );
}
