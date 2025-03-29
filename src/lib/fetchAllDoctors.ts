import { cookies } from "next/headers";

export async function fetchAllDoctors() {
    console.log("Server fetch starting .")
    const cookieStore = cookies();
    const token = (await cookieStore).get("token")?.value;
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/v1/doctors/all`, {
        credentials: "include",
        cache: "no-store", // Prevent caching (optional)
        headers: {
            "Content-Type": "application/json",
            ...(token ? { Cookie: `token=${token}` } : {}), // Include auth cookie if available
        },
    });

    console.log("Server fetch end.")
    if (!response.ok) throw new Error("Failed to fetch doctors");
    const { data } = await response.json();
    return data;
}
