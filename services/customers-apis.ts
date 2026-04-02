import { getToken } from "@/lib/auth";
import { Payment } from "@/lib/types/customer-types";

export const getCustomers = async (): Promise<any> => {
  const token = getToken();
  if (!token) throw new Error("Authentication required");
  const url = `${process.env.NEXT_PUBLIC_CUSTOMER_MANAGEMENT_URL}/admin/users`;
  const res = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });

  if (!res.ok) throw new Error("Failed to fetch customers");

  const data = await res.json();
  return data;
};

export const fetchCustomer = async (userId: string): Promise<any> => {
  const token = getToken();
  if (!token) throw new Error("Authentication required");
  const url = `${process.env.NEXT_PUBLIC_CUSTOMER_MANAGEMENT_URL}/admin/users/?user_id=${userId}`;
  const res = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });

  if (!res.ok) throw new Error("Failed to fetch customer");

  const data = await res.json();
  return data;
};

export const updateCustomer = async ({
  payload,
}: {
  payload: {
    firstName?: string;
    lastName?: string;
    phone_e164: string;
    email: string;
    slack_channel_id?: string;
    campaign_role?: string;
  };
}): Promise<any> => {
  const token = getToken();
  if (!token) throw new Error("Authentication required");
  console.log("payload", payload);
  const url = `${process.env.NEXT_PUBLIC_CUSTOMER_MANAGEMENT_URL}/engagements/profile`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error("Failed to update customer");

  const data = await res.json();
  return data;
};

export const updateCustomerPayment = async ({
  user_id,
  payload,
}: {
  user_id: string;
  payload: Payment;
}): Promise<any> => {
  const token = getToken();
  if (!token) throw new Error("Authentication required");
  const url = `${process.env.NEXT_PUBLIC_CUSTOMER_MANAGEMENT_URL}/admin/users/${user_id}/payment-details`;
  const res = await fetch(url, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      payment_mode: payload.payment_mode,
      platform: payload.platform,
      payment_terms: payload.payment_terms,
      notes: payload.notes
    }),
  });

  if (!res.ok) throw new Error("Failed to update customer");

  const data = await res.json();
  return data;
};