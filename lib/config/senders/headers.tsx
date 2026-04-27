import { Badge } from "@/app/(protected)/customers/new/_components/Card";
import { InfoHover } from "@/components/common/info-hover";
import { Column } from "@/lib/types/table-types";
import {
  Building,
  ChartScatter,
  Check,
  MessageCircle,
  RefreshCcw,
  Send,
  ThumbsUp,
  User,
} from "lucide-react";

export const normalizeStatus = (status: string) => status?.trim().toLowerCase();

import { CheckIcon } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sender } from "@/lib/types/senders";
import { SenderUser } from "@/app/(protected)/senders/_components/sender-user";
import { Button } from "@/components/ui/button";

export const STATUS_MAP: Record<string, { bg: string; text: string }> = {
  active: {
    bg: "bg-green-500",
    text: "text-green-500",
  },
  "less active": {
    bg: "bg-yellow-500",
    text: "text-yellow-500",
  },
  inactive: {
    bg: "bg-red-500",
    text: "text-red-500",
  },
};

export const columns: Column<Sender>[] = [
  {
    key: "name",
    header: "Name",

    icon: <User size={16} />,

    render: (user) => (
      <div className="flex items-center gap-3">
        {/* Avatar with status ring */}

        <SenderUser user={user} showHover />
      </div>
    ),
  },
  {
    key: "company",
    header: "Company",
    icon: <Building size={16} />,
    //render: (row) => <Badge variant="info" label={row.company} />,
    render: (row) => <span>{row.company}</span>,
  },
  {
    key: "campaigns",
    header: "Campaigns",
    icon: <Send size={16} />,
    render: (row) => (
      <div className="flex items-center gap-2">
        <span className="text-secondary-foreground">{row.campaigns}</span>

        <InfoHover
          content={
            <div className="flex flex-col gap-1">
              {row.campaignList?.length ? (
                row.campaignList.map((c: string, i: number) => (
                  <span key={i} className="text-muted-foreground">
                    • {c}
                  </span>
                ))
              ) : (
                <span>No campaigns</span>
              )}
            </div>
          }
        />
      </div>
    ),
  },
  {
    key: "performance",
    header: "Performance",
    icon: <ChartScatter size={16} />,
    render: (row) => {
      const perf = row.performance;
      return (
        <div className="flex gap-2 text-xs">
          <Badge
            variant="outline"
            label={`${perf.sent} `}
            logo={<Send className="size-4" />}
          />
          <Badge
            variant="outline"
            label={`${perf.accepted}%`}
            logo={<Check className="size-4" />}
          />
          <Badge
            variant="outline"
            label={`${perf.reply}%`}
            logo={<MessageCircle className="size-4" />}
          />
          <Badge
            variant="outline"
            label={`${perf.interested}%`}
            logo={<ThumbsUp className="size-4" />}
          />
        </div>
      );
    },
  },
  {
    key: "actions",
    header: "Actions",
    render: (row) => (
      <div className="flex justify-center">
        <Button
          variant={"outline"}
          onClick={(e) => {
            e.stopPropagation(); // ✅ VERY IMPORTANT (prevents row click)
            console.log("Sender ID:", row._id);
          }}
          size={"icon"}
        >
          <RefreshCcw className="size-4" />
        </Button>
      </div>
    ),
  },
];
