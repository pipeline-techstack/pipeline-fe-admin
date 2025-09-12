import { getToken } from "@/lib/auth";

export const getCustomers = async (): Promise<any> => {
  const token = getToken();
  if (!token) throw new Error("Authentication required");
  const url = `${process.env.NEXT_PUBLIC_PERMISSIONS_URL}/admin/users `;
  const res = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });

  if (!res.ok) throw new Error("Failed to fetch campaigns");

  const data = await res.json();
  return data;
};

export const updateCustomer = async ({
  payload,
}: {
  payload: {
    firstName: string;
    lastName: string;
    phone_e164: string;
    email: string;
  };
}): Promise<any> => {
  const token = getToken();
  if (!token) throw new Error("Authentication required");
  console.log("payload", payload);
  const url = `${process.env.NEXT_PUBLIC_PERMISSIONS_URL}/engagements/profile`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error("Failed to fetch campaigns");

  const data = await res.json();
  return data;
};
