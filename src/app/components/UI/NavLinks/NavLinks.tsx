"use client";
import Link from "next/link"; // Import Link from Next.js
import { usePathname } from "next/navigation";
import styles from "./NavLinks.module.css";

export default function NavLinks() {
    const pathname = usePathname();

    return (
        <section className={styles.container}>
            <Link href="/landingPage" className={pathname === "/landingPage" ? styles.currentPageLink : styles.defaultLink}>
                Home
            </Link>
            <Link href="/appointment" className={pathname === "/appointment" ? styles.currentPageLink : styles.defaultLink}>
                Appointments
            </Link>
            <Link href="/appointment1" className={pathname === "/blog" ? styles.currentPageLink : styles.defaultLink}>
                Health Blog
            </Link>
            <Link href="/booking" className={pathname === "/reviews" ? styles.currentPageLink : styles.defaultLink}>
                Reviews
            </Link>
        </section>
    );
}
