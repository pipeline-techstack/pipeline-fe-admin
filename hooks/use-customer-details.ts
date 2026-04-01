import { formatDate, normalizePermissions } from "@/lib/utils";
import { fetchCustomer } from "@/services/customers-apis";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

export function useCustomerDetails() {
  const params = useParams();
  const userId = params.detail;

  const { data, isLoading, error } = useQuery({
    queryKey: ["customer", userId],
    queryFn: () => fetchCustomer(userId as string),
    enabled: !!userId,
    select: (data) => {
      const raw = data?.[0];
      if (!raw) return null;

      return {
        _id: raw.userId,
        name: `${raw.firstName || ""} ${raw.lastName || ""}`.trim(),
        email: raw.email,
        phone: raw.phone_e164,
        slackChannelId: raw.slack_channel_id,
        teamsId: raw.teams_webhook_url,
        notificationMode: "manual", // fallback (not in API)
        createdAt: formatDate(raw.createdAt),
        role: raw.campaign_role || "rep",
        features: normalizePermissions(raw.permissions) || [], // not present → default empty
        paymentDetails: raw.paymentDetails || {},
        integrations: raw.integrations || [],
        organization: {
          company: raw.companyName || "",
          quota: String(raw.plan?.rowQuota || 0),
          seats: raw.plan?.seats || 0,
          plan: raw.plan?.planType || "",
          status: raw.plan?.status || "",
          trialStartDate: formatDate(raw.plan?.trialStartDate),
          trialEndDate: formatDate(raw.plan?.trialEndDate),
          billingCyvle: raw.plan?.billingCycle,
        },
      };
    },
  });

  return {
    customer: data,
    isLoading,
    error,
  };
}