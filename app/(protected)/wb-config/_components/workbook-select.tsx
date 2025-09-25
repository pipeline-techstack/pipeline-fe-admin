"use client";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { WorkbookConfiguration } from "../types/api";


type Props = {
  value: string;
  workbooks: WorkbookConfiguration[];
  onChange: (val: string) => void;
};

export const WorkbookSelect = ({ value, workbooks, onChange }: Props) => (
  <div>
    <Label className="block mb-2">Workbook Name</Label>
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger>
        <SelectValue placeholder="Select workbook" />
      </SelectTrigger>
      <SelectContent>
        {workbooks.map((c) => (
          <SelectItem key={c.id} value={String(c.id)}>
            {c.workbooks[0]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
);
