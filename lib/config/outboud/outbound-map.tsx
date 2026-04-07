import { Shield } from "lucide-react";
import { campaignsColumns } from "../outboud/headers";
import { useOutbound } from "@/hooks/use-outbound";

export const outboudConfigMap = {
  campaigns: {
    title: "Campaigns",
    subtitle:
      "All campaigns for this user, share to give access to other users",
    icon: <Shield className="w-4 h-4" />,
    getColumns: campaignsColumns,
    hook: useOutbound,
    Dialog: null,
    dataKey: null,
    route: "campaigns",
    isPaginated: false,
  },
};
