import { Shield } from "lucide-react";
import RevopsTable from "../revops/RevopsTable";
import { campaignsColumns } from "@/lib/config/outboud/headers";
import { useOutbound } from "@/hooks/use-outbound";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ShareModal from "../outbound/ShareModal";

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

  const [isShareOpen, setIsShareOpen] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<any>(null);

  const handleViewMore = () => {
    router.push(
      `/customers/new/${id}/outbound/campaigns?name=${name}&email=${email}`,
    );
  };

  const handleShare = (row: any) => {
    setSelectedCampaign(row);
    setIsShareOpen(true);
  };

  return (
    <div className="flex flex-col gap-5">
      <RevopsTable
        title="Campaigns"
        subtitle="All campaigns for this user, share to give access to other users"
        icon={<Shield className="w-4 h-4" />}
        data={data as any}
        handleViewMore={handleViewMore}
        columns={campaignsColumns(handleShare)}
        loading={isLoading}
      />

      {isShareOpen && (
        <ShareModal
          open={isShareOpen}
          onClose={() => setIsShareOpen(false)}
          campaign={selectedCampaign}
        />
      )}
    </div>
  );
};

export default OutboundTab;
