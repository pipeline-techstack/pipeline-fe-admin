"use client";

import LinkedInBtn from "@/components/common/linkedin-button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
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
      <Avatar className={`rounded-full p-0.5 ${size} ${getStatusBg(user.status)}`}>
        <AvatarImage src={user.avatar} alt={user.name} className="rounded-full" />
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

const SenderContent = ({ user }: { user: Sender }) => (
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

export const SenderUser = ({ user, showHover = false }: SenderUserProps) => {
  if (!showHover) return <SenderContent user={user} />;

  return (
    <HoverCard openDelay={200} closeDelay={100}>
      <HoverCardTrigger asChild>
        {/* stopPropagation so hovering doesn't fire the row's onRowClick */}
        <div className="w-fit cursor-default" onClick={(e) => e.stopPropagation()}>
          <SenderContent user={user} />
        </div>
      </HoverCardTrigger>

      {/* HoverCardContent renders in a portal — zero impact on table layout */}
      <HoverCardContent
        side="right"
        align="start"
        className="w-80 p-5"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start gap-3">
          <AvatarStatusRingDemo user={user} size="size-12" />

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <p className="font-medium text-sm truncate">{user.name}</p>
              {user.linkedin && <LinkedInBtn url={user.linkedin} />}
            </div>

            {user.headline && (
              <p className="mt-1 text-muted-foreground text-sm line-clamp-2">
                {user.headline}
              </p>
            )}
          </div>
        </div>

        {/* Meta Info */}
        <div className="space-y-2 mt-4 text-muted-foreground text-sm">
          {user.jobTitle && (
            <div className="flex items-center gap-2">
              <Briefcase className="size-4" />
              <span>{user.jobTitle}</span>
            </div>
          )}
          {user.company && (
            <div className="flex items-center gap-2">
              <Building className="size-4" />
              <span>{user.company}</span>
            </div>
          )}
          {user.location && (
            <div className="flex items-center gap-2">
              <MapPin className="size-4" />
              <span>{user.location}</span>
            </div>
          )}
        </div>

        {/* Campaigns */}
        {user.campaignList?.length > 0 && (
          <>
            <div className="my-4 border-t" />
            <div>
              <p className="mb-2 text-sm">
                Campaigns ({user.campaigns ?? user.campaignList.length})
              </p>
              <div className="space-y-2 pr-1 max-h-[120px] overflow-y-auto">
                {user.campaignList.map((campaign, idx) => (
                  <div
                    key={idx}
                    className="bg-primary/5 px-3 py-2 border rounded-md text-foreground text-sm truncate"
                  >
                    {campaign}
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </HoverCardContent>
    </HoverCard>
  );
};