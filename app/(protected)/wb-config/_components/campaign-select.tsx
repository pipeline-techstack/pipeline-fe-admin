"use client";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type Props = {
  value: string;
  options: { id: string; name: string }[];
  onChange: (val: string) => void;
  disabled?: boolean;
};

export const CampaignSelect = ({ value, options, onChange, disabled }: Props) => (
  <div className="flex flex-col">
    <Label className="mb-1 font-medium text-gray-700 text-sm">Select Campaign</Label>
    <Select value={value} onValueChange={onChange} disabled={disabled}>
      <SelectTrigger>
        <SelectValue placeholder="Select Campaign..." />
      </SelectTrigger>
      <SelectContent>
        {options.map((c) => (
          <SelectItem key={c.id} value={c.id}>
            {c.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
);
