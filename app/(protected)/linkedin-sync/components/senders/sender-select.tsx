"use client";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type SenderOption = {
  id: string;
  name: string;
  authIsValid: boolean;
  isActive: boolean;
  activeCampaigns: number;
};

type Props = {
  name?: string;
  placeholder?: string;
  value: string;
  options: (SenderOption | { id: string; name: string })[];
  onChange: (val: string) => void;
  disabled?: boolean;
  hideLabel?: boolean;
};

const getBadgeContent = (
  authIsValid: boolean,
  isActive: boolean,
  activeCampaigns: number
): string | null => {
  if (!authIsValid) return null;
  if (!isActive) return "available/new";
  return `in ${activeCampaigns} campaign${activeCampaigns !== 1 ? "s" : ""}`;
};

const getBadgeStyles = (content: string | null): string => {
  if (!content) return "";
  if (content === "available/new") {
    return "bg-green-100 text-green-800";
  }
  return "bg-blue-100 text-blue-800";
};

export const SenderSelectComponent = ({
  name = "Select Sender",
  placeholder = "Select a sender...",
  value,
  options,
  onChange,
  disabled,
  hideLabel = false,
}: Props) => (
  <div className="flex flex-col">
    {!hideLabel && (
      <Label className="mb-1 font-medium text-gray-700 text-sm">{name}</Label>
    )}

    <Select value={value} onValueChange={onChange} disabled={disabled}>
      <SelectTrigger>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((sender) => {
          const isSenderOption = "authIsValid" in sender;
          if (isSenderOption && !sender.authIsValid) return null;

          const badgeContent = isSenderOption
            ? getBadgeContent(sender.authIsValid, sender.isActive, sender.activeCampaigns)
            : null;

          return (
            <SelectItem key={sender.id} value={sender.id}>
              <div className="flex items-center gap-2">
                <span>{sender.name}</span>
                {badgeContent && (
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getBadgeStyles(
                      badgeContent
                    )}`}
                  >
                    {badgeContent}
                  </span>
                )}
              </div>
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  </div>
);
