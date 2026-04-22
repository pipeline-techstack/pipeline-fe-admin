import { Badge } from "@/app/(protected)/customers/new/_components/Card";
import { InfoHover } from "@/components/common/info-hover";
import LinkedInBtn from "@/components/common/linkedin-button";
import { Column } from "@/lib/types/table-types";
import { getStatusBg, getStatusTextColor } from "@/lib/utils";
import {
  Building,
  ChartScatter,
  Check,
  Linkedin,
  MessageCircle,
  Send,
  ThumbsUp,
  User,
} from "lucide-react";

export const normalizeStatus = (status: string) => status?.trim().toLowerCase();

import { CheckIcon } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const AvatarStatusRingDemo = ({ user }) => {
  return (
    <div className="relative w-fit">
      <Avatar
        className={`rounded-full p-0.5 size-10 ${getStatusBg(user.status)}`}
      >
        <AvatarImage
          src={user.avatar}
          alt={user.name}
          className="rounded-full"
        />
        <AvatarFallback className="bg-muted font-medium text-sm">
          {user.name?.charAt(0).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <span
        className={`absolute right-0 bottom-1 size-2 rounded-full ${getStatusBg(user.status)}`}
      />
    </div>
  );
};

export default AvatarStatusRingDemo;

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

        <AvatarStatusRingDemo user={user} />

        {/* Text */}
        <div className="flex flex-col">
          {/* Name + LinkedIn */}
          <div className="flex items-center gap-1">
            <p className="text-sm">{user.name}</p>

            {user.linkedin && <LinkedInBtn url={user.linkedin} />}
          </div>

          {/* Status */}
          <p className={`text-xs ${getStatusTextColor(user.status)}`}>
            {user.status} ({user.statusCount})
          </p>
        </div>
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
            label={`${perf.accepted}`}
            logo={<Check className="size-4" />}
          />
          <Badge
            variant="outline"
            label={`${perf.reply}`}
            logo={<MessageCircle className="size-4" />}
          />
          <Badge
            variant="outline"
            label={`${perf.interested}`}
            logo={<ThumbsUp className="size-4" />}
          />
        </div>
      );
    },
  },
];
