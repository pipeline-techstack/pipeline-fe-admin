"use client";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

type Props = {
  value: "company" | "lead";
  onChange: (val: "company" | "lead") => void;
};

export const ResearchTypeSelector = ({ value, onChange }: Props) => (
  <div>
    <Label className="block mb-4">Research Type</Label>
    <RadioGroup value={value} onValueChange={(val) => onChange(val as "company" | "lead")} className="flex space-x-6">
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="company" id="company" />
        <Label htmlFor="company">Company Search</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="lead" id="lead" />
        <Label htmlFor="lead">Lead Search</Label>
      </div>
    </RadioGroup>
  </div>
);
