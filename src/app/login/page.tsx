"use client";
import { useState } from "react";
import { useRouter,useSearchParams } from "next/navigation"; // ✅ Fixed import
import Image from "next/image";

import styles from "./page.module.css";
import SearchDBTN from "@/app/components/UI/SearchDBTN/SearchDBTN";
import { Montserrat } from "next/font/google";
import InputField from "@/app/components/UI/InputField/InputField";
import { useAuth } from "@/context/authContext"; // ✅ Import auth context

const MontserratFont = Montserrat({
    subsets: [],
    weight: "500",
});

const Page = () => {
    const { isAuthenticated, setAuthenticated } = useAuth(); // ✅ Access Auth Context
    const router = useRouter(); // ✅ Moved inside component
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(""); // ✅ Handle errors
    const searchParams = useSearchParams(); // ✅ Get query params
    const redirect = searchParams.get("redirect") || "/";
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(""); // Clear previous errors

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/v1/users/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include", // ✅ Important for sending cookies
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                throw new Error("Invalid credentials, please try again.");
            }

            setAuthenticated(true); // ✅ Update authentication state
            router.replace(redirect); // ✅ Redirect to previous page
        } catch (err) {
            setError((err as Error).message);
        }
    };

    const handleReset = () => {
        setEmail("");
        setPassword("");
        setError("");
    };

    return (
        <main className={styles.container}>
            <Image
                src="/sign-up-bg.png"
                alt="a doctor's desk"
                width={2493}
                height={911}
                style={{ objectFit: "cover" }}
                className={styles.bgImage}
            />
            <section className={`${styles.searchField} ${MontserratFont.className}`}>
                <span className={styles.head}>Admin Login</span>

                {isAuthenticated ? (
                    <div className={styles.alreadyLoggedIn}>
                        <p>You are already logged in.</p>
                        <SearchDBTN text="Go Back" bgColor="#1C4A2A" 
                        onClick={() => document.referrer? router.back(): router.replace("/")} />
                    </div>
                ) : (
                    <form className={styles.searchDetails2} onSubmit={handleLogin}>
                        {/* Email Input */}
                        <InputField
                            inputLabel="Email"
                            vectorURL="/email-vector.png"
                            placeholder="Enter your email"
                            type="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        
                        {/* Password Input */}
                        <InputField
                            inputLabel="Password"
                            vectorURL="/passwd-vector.png"
                            placeholder="••••••••••"
                            type="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        {/* Error Message */}
                        {error && <p className={styles.error}>{error}</p>}

                        {/* Buttons */}
                        <SearchDBTN text="Login" bgColor="#1C4A2A" type="submit" />
                        <SearchDBTN text="Reset" bgColor="#C6B09A" type="button" onClick={handleReset} />
                    </form>
                )}
            </section>
        </main>
    );
};

export default Page;
