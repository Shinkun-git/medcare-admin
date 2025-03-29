import { cookies } from "next/headers";

export async function isUserAuthenticated(): Promise<boolean> {
    
    //check if token exists if not then return false immediately
    const token = (await cookies()).get("token")?.value;
    console.log("token extracted in server method :- ",token);
    if(!token) return false;
    
    // Validate token with backend
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/v1/check/check-token`, {
        method: "GET",
        headers: {
            Cookie: `token=${token}`, // Attach token manually
        },
        credentials: "include", // Automatically includes HTTP-only cookies
    });

    return response.ok; // Backend confirms authentication
}