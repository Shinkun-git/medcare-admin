"use client";
import Link from "next/link"; // Import Link from Next.js
import { usePathname } from "next/navigation";
import styles from "./NavLinks.module.css";

export default function NavLinks() {
    const pathname = usePathname();

    return (
        <section className={styles.container}>
            <Link href="/" className={pathname === "/" ? styles.currentPageLink : styles.defaultLink}>
                Home
            </Link>
            <Link href="/booking-request" className={pathname === "/booking-request" ? styles.currentPageLink : styles.defaultLink}>
                Bookings
            </Link>
            <Link href="/doctor" className={pathname === "/doctor" ? styles.currentPageLink : styles.defaultLink}>
                Doctors
            </Link>
        </section>
    );
}
