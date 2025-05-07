import { getToken } from "./auth";

const AUTH_API_URL = "https://authapi.techstack.management/api/v1";
const API_URL = "https://auth-apis-p4de.onrender.com/api/v1";

interface LoginResponse {
  user: {
    id: string;
    email: string;
    isAuth: boolean;
    st_access_token: string;
  };
}

interface SubscriptionData {
  name: string;
  enterprisePriceId: string;
  email: string;
}

interface UsageData {
  email: string;
  count: number;
}

// Login API call
export async function login(
  email: string,
  password: string
): Promise<LoginResponse> {
  const response = await fetch(`${AUTH_API_URL}/user/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Login failed");
  }

  const data = await response.json();
  if (data?.user?.role !== "admin") {
    throw new Error("Unauthorized: Only admin users can log in");
  }
  // Store the token in localStorage
  localStorage.setItem("st_access_token", data.user.st_access_token);

  return data;
}

// Add subscription API call
export async function addSubscription(
  subscriptionData: SubscriptionData
): Promise<any> {
  const token = getToken();

  if (!token) {
    throw new Error("Authentication required");
  }

  const response = await fetch(
    `${API_URL}/payment/admin/enterprise-organizations`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(subscriptionData),
    }
  );

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to add subscription");
  }

  return await response.json();
}

// Manage subscription usage API call
export async function manageSubscriptionUsage(
  usageData: UsageData
): Promise<any> {
  const token = getToken();

  if (!token) {
    throw new Error("Authentication required");
  }

  const response = await fetch(`${API_URL}/payment/users/usage`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(usageData),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to update subscription usage");
  }

  return await response.json();
}
