import LinkedInBtn from "@/components/common/linkedin-button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sender } from "@/lib/types/senders";
import { getStatusBg, getStatusTextColor } from "@/lib/utils";
import { Activity, Briefcase, Building, MapPin } from "lucide-react";
import React from "react";

type SenderUserProps = {
  user: Sender;
  showHover?: boolean;
};

const AvatarStatusRingDemo = ({
  user,
  size = "size-10",
}: {
  user: Sender;
  size?: string;
}) => {
  return (
    <div className="relative w-fit shrink-0">
      <Avatar
        className={`rounded-full p-0.5 ${size} ${getStatusBg(user.status)}`}
      >
        <AvatarImage
          src={user.avatar}
          alt={user.name}
          className="rounded-full"
        />
        <AvatarFallback className="bg-muted text-sm">
          {user.name?.charAt(0).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <span
        className={`absolute bottom-0.5 right-0 size-2 rounded-full ring-2 ring-white ${getStatusBg(user.status)}`}
      />
    </div>
  );
};

export const SenderUser = ({ user, showHover = false }: SenderUserProps) => {
  const content = (
    <div className="flex items-center gap-3">
      <AvatarStatusRingDemo user={user} />
      <div className="flex flex-col">
        <div className="flex items-center gap-1">
          <p className="text-sm">{user.name}</p>
          {user.linkedin && <LinkedInBtn url={user.linkedin} />}
        </div>
        <p className={`text-xs ${getStatusTextColor(user.status)}`}>
          {user.status} ({user.statusCount})
        </p>
      </div>
    </div>
  );

  if (!showHover) return content;

  return (
    <div className="group relative w-fit">
      {content}

      {/* Hover Card */}
      <div className="invisible group-hover:visible top-full left-0 z-50 absolute opacity-0 group-hover:opacity-100 pt-2 transition-opacity duration-150">
        <div className="bg-white shadow-lg p-4 border rounded-xl w-72">
          {/* Header */}
          <div className="flex items-start gap-3">
            <AvatarStatusRingDemo user={user} size="size-12" />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <p className="text-sm truncate">{user.name}</p>
                {user.linkedin && <LinkedInBtn url={user.linkedin} />}
              </div>
              {user.headline && (
                <p className="mt-0.5 text-muted-foreground text-xs line-clamp-2">
                  {user.headline}
                </p>
              )}
            </div>
          </div>

          {/* Meta details */}
          {(user.jobTitle || user.company || user.location) && (
            <div className="space-y-1.5 mt-3 text-muted-foreground text-xs">
              {user.jobTitle && (
                <div className="flex items-center gap-2">
                  <Briefcase className="size-3.5 shrink-0" />
                  <span className="truncate">{user.jobTitle}</span>
                </div>
              )}
              {user.company && (
                <div className="flex items-center gap-2">
                  <Building className="size-3.5 shrink-0" />
                  <span className="truncate">{user.company}</span>
                </div>
              )}
              {user.location && (
                <div className="flex items-center gap-2">
                  <MapPin className="size-3.5 shrink-0" />
                  <span className="truncate">{user.location}</span>
                </div>
              )}
            </div>
          )}

          {/* Campaigns */}
          {user.campaignList && user.campaignList.length > 0 && (
            <div className="mt-3 pt-3 border-t">
              <p className="mb-1.5 font-medium text-xs">
                Campaigns ({user.campaigns ?? user.campaignList.length})
              </p>
              <div className="flex flex-wrap gap-1">
                {user.campaignList.map((campaign, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center bg-muted px-2 py-0.5 rounded-md text-[11px] text-foreground"
                  >
                    {campaign}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
