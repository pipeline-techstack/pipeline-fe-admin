import { fetchWrapper } from "@/lib/api";
import { SenderDashboardPayload } from "@/lib/types/senders";

const BASE_URL = process.env.NEXT_PUBLIC_SENDER_MANAGEMENT_URL;

export const getSenderDashboard = async (payload: SenderDashboardPayload) => {
  return fetchWrapper(`${BASE_URL}/admin/sender-dashboard`, {
    method: "POST",
    body: JSON.stringify(payload),
    credentials: "include", // keep if backend uses cookies
  });
};

export const getSenderData = async (sender_id, payload) => {
  return fetchWrapper(
    `${BASE_URL}/admin/sender-dashboard/${sender_id}/detail`,
    {
      method: "POST",
      body: JSON.stringify(payload),
      credentials: "include", // keep if backend uses cookies
    },
  );
};

export const getAllCompanies = async () => {
  return fetchWrapper(`${BASE_URL}/admin/sender-dashboard/companies`, {
    method: "GET",
    credentials: "include", // keep if backend uses cookies
  });
};

export const addLinkedinSender = async (
  senderId: string,
  profileUrl: string,
) => {
  return fetchWrapper(`${BASE_URL}/linkedin-senders/admin/link`, {
    method: "POST",
    body: JSON.stringify({
      sender_id: senderId,
      linkedin_profile_url: profileUrl,
    }),
  });
};

export const refetchLinkedinSenderApi = async (senderId: string) => {
  return fetchWrapper(`${BASE_URL}/linkedin-senders/refresh/${senderId}`, {
    method: "PUT",
  });
};
