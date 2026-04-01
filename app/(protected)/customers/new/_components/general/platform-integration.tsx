import { Customer } from "@/lib/types/customer-types";
import SectionCard, { Badge } from "../Card";
import { Link } from "lucide-react";
import ShowCompanyLogo from "@/components/common/show-company-logo";

function IntegrationsCard({ customer }: { customer: Customer }) {
  return (
    <SectionCard
      title="Platforms Integrated"
      subtitle="Platforms this user is integrated with."
      icon={<Link className="w-4 h-4" />}
    >
      <div className="flex flex-wrap gap-2">
        {customer.integrations.map((f) => (
          <Badge
            key={f.name}
            label={f.name}
            logo={<ShowCompanyLogo domain={f.name} />}
            variant={f.connected ? "success" : "warning"}
            disabled={!f.connected}
            className="capitalize"
          />
        ))}
      </div>
    </SectionCard>
  );
}

export default IntegrationsCard;