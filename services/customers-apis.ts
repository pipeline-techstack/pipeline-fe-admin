import { fetchWrapper } from "@/lib/api";
import { Payment } from "@/lib/types/customer-types";

export const getCustomers = async (): Promise<any> => {
  const url = `${process.env.NEXT_PUBLIC_CUSTOMER_MANAGEMENT_URL}/admin/users`;
  return fetchWrapper(url, { method: "GET" });
};

export const fetchCustomer = async (userId: string): Promise<any> => {
  const url = `${process.env.NEXT_PUBLIC_CUSTOMER_MANAGEMENT_URL}/admin/users/?user_id=${userId}`;
  return fetchWrapper(url, { method: "GET" });
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
  console.log("payload", payload);
  const url = `${process.env.NEXT_PUBLIC_CUSTOMER_MANAGEMENT_URL}/engagements/profile`;
  return fetchWrapper(url, {
    method: "POST",
    body: JSON.stringify(payload),
  });
};

export const updateCustomerPayment = async ({
  user_id,
  payload,
}: {
  user_id: string;
  payload: Payment;
}): Promise<any> => {
  const url = `${process.env.NEXT_PUBLIC_CUSTOMER_MANAGEMENT_URL}/admin/users/${user_id}/payment-details`;
  return fetchWrapper(url, {
    method: "PATCH",
    body: JSON.stringify({
      payment_mode: payload.payment_mode,
      platform: payload.platform,
      payment_terms: payload.payment_terms,
      notes: payload.notes
    }),
  });
};