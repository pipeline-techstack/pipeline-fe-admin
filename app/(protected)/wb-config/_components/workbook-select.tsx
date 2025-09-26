"use client";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Workbook = {
  id: string;
  name: string;
};

type Props = {
  value: string;
  workbooks: Workbook[]; // ✅ direct list of workbooks
  onChange: (val: string) => void;
};

export const WorkbookSelect = ({ value, workbooks, onChange }: Props) => {
  return (
  <div>
    <Label className="block mb-2">Workbook Name</Label>
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger>
        <SelectValue placeholder="Select workbook" />
      </SelectTrigger>
      <SelectContent>
        {workbooks.map((wb) => (
          <SelectItem key={wb.id} value={wb.id}>
            {wb.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
)};
