"use client";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props = {
  name?: string;
  placeholder?: string;
  value: string;
  options: { id: string; name: string }[];
  onChange: (val: string) => void;
  disabled?: boolean;
  hideLabel?: boolean;
};
export const SingleSelectComponent = ({
  name = "Select Campaign",
  placeholder = "Select Campaign...",
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
        {options.map((c) => (
          <SelectItem key={c.id} value={c.id}>
            {c.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
);
