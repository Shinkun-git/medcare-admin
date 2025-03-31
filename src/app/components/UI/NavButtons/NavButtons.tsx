"use client";
import Link from "next/link";
import { useAuth } from "@/context/authContext";
import styles from "./NavButtons.module.css";

export default function NavButtons() {
  const { isAuthenticated,logout,user} = useAuth();
  return (
    <section className={styles.container}>
      {!isAuthenticated ? (
        <>
          <Link href="/login">
            <button className={styles.loginButton}>Login</button>
          </Link>
        </>
      ) : (<>
      <p>{user?.name}</p>
        <button className={styles.logoutButton} onClick={logout}>
          Logout
        </button>
      </>
      )}
    </section>
  );
}
