import { LoginResponse } from "@/lib/types/auth-types";

// Login API call
export async function loginApi(
  email: string,
  password: string
): Promise<LoginResponse> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_AUTH_API_URL}/user/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    }
  );

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Login failed");
  }

  const data = await response.json();

  if (data?.user?.role !== "admin") {
    throw new Error("Unauthorized: Only admin users can log in");
  }

  // Store the token from user object
  const accessToken = data?.user?.st_access_token;
  if (!accessToken) throw new Error("No access token returned from login API");

  localStorage.setItem("st_access_token", accessToken);

  return data;
}
