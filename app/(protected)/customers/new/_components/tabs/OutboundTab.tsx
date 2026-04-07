import { Shield } from "lucide-react";
import RevopsTable from "../Revops/RevopsTable";
import { campaignsColumns } from "@/lib/config/outboud/headers";
import { useOutbound } from "@/hooks/use-outbound";
import { useParams, useRouter } from "next/navigation";

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
  const { data } = useOutbound(id as string);

  const handleViewMore = () => {
    router.push(
      `/customers/new/${id}/revops/campaigns?name=${name}&email=${email}`,
    );
  };

  return (
    <div className="flex flex-col gap-5">
      <RevopsTable
        title="Campaigns"
        subtitle="All campaigns for this user, share to give access to other users"
        icon={<Shield className="w-4 h-4" />}
        data={data as any}
        handleViewMore={handleViewMore}
        columns={campaignsColumns}
        loading={false}
      />
    </div>
  );
};

export default OutboundTab;
