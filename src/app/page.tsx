"use client"
import styles from "./page.module.css";
import { useRouter } from "next/navigation";
export default function Home() {
  const router = useRouter();
  return (
    <main className={styles.container}>
      <div className={styles.header}>
        <h1>Healthcare Admin Portal</h1>
        <p className={styles.subtitle}>Streamline your medical practice management</p>
      </div>
      
      <div className={styles.features}>
        <div className={styles.featureCard}>
          <h3>Doctor Management</h3>
          <p>Add, update, and manage doctor profiles and schedules</p>
        </div>
        
        <div className={styles.featureCard}>
          <h3>Appointment Tracking</h3>
          <p>Monitor and manage patient appointments efficiently</p>
        </div>
      </div>

      <div className={styles.quickActions}>
        <h2>Quick Actions</h2>
        <div className={styles.actionButtons}>
          <button className={styles.actionButton} onClick={()=>router.push('/booking-request')}>View Appointments</button>
          <button className={styles.actionButton} onClick={()=>router.push('/doctor')}>Manage Doctors</button>
        </div>
      </div>
    </main>
  );
}
