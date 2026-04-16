import { Shield } from "lucide-react";
import { campaignsColumns } from "@/lib/config/outboud/headers";
import { useOutbound } from "@/hooks/use-outbound";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ShareModal from "../outbound/ShareModal";
import OutboundAnalytics from "../outbound/analytics/OutboundAnalytics";
import UpdateOwnerModal from "../outbound/UpdateOwnerModal";
import { useCampaignNotification } from "@/hooks/use-campaign-notification";
import { useCamapignMetricsByUser } from "@/hooks/use-campaign-metrics-by-user";
import RevopsTable from "../Revops/RevopsTable";

const OutboundTab = ({
  id,
  name,
  email,
}: {
  id: string;
  name: string;
  email: string;
}) => {
  const router = useRouter();
  const { data, isLoading } = useOutbound(id as string);
  const { metrics, LoadingMetrics, MetricsError } = useCamapignMetricsByUser(
    id as string,
  );
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isUpdateOwnerOpen, setIsUpdateOwnerOpen] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<any>(null);
  const [notificationName, setNotificationName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { updateOwner } = useCampaignNotification();

  const handleViewMore = () => {
    router.push(
      `/customers/new/${id}/outbound/campaigns?name=${name}&email=${email}`,
    );
  };

  const handleShare = (row: any) => {
    setSelectedCampaign(row);
    setIsShareOpen(true);
  };
  const handleUpdateOwner = (row: any) => {
    setSelectedCampaign(row);
    setNotificationName(row?.ownerName || "");
    setIsUpdateOwnerOpen(true);
  };
  const handleUpdateOwnerSubmit = async () => {
    try {
      setLoading(true);
      setError("");

      await updateOwner(selectedCampaign.id, notificationName);
      setIsUpdateOwnerOpen(false);
    } catch (err: any) {
      setError("Failed to update owner");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-col gap-5">
      <OutboundAnalytics
        campaigns={metrics}
        loading={LoadingMetrics}
        error={MetricsError}
      />

      <RevopsTable
        title="Campaigns"
        subtitle="All campaigns for this user, share to give access to other users"
        icon={<Shield className="w-4 h-4" />}
        data={data as any}
        handleViewMore={handleViewMore}
        columns={campaignsColumns(handleShare, handleUpdateOwner)}
        loading={isLoading}
      />

      {isShareOpen && (
        <ShareModal
          open={isShareOpen}
          onClose={() => setIsShareOpen(false)}
          campaign={selectedCampaign}
        />
      )}
      {isUpdateOwnerOpen && (
        <UpdateOwnerModal
          open={isUpdateOwnerOpen}
          onClose={() => setIsUpdateOwnerOpen(false)}
          campaign={selectedCampaign}
          notificationName={notificationName}
          setNotificationName={setNotificationName}
          loading={loading}
          error={error}
          handleSubmit={handleUpdateOwnerSubmit}
        />
      )}
    </div>
  );
};

export default OutboundTab;
