"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Column, FormData } from "../types/api";


type Props = {
  formData: FormData;
  columns: Column[];
  onChange: (field: keyof FormData, val: string) => void;
};

export const ConfigurationForm = ({ formData, columns, onChange }: Props) => (
  <Card>
    <CardContent className="space-y-4 p-4">
      <h3 className="font-medium text-gray-700 text-lg">
        {formData.researchType === "company" ? "Company Research Configuration" : "Lead Research Configuration"}
      </h3>

      {formData.researchType === "company" ? (
        <>
          {["companyNameColumn", "companyLinkedInUrlColumn", "accountScoringColumn"].map((field) => (
            <div key={field}>
              <Label>{field.replace(/([A-Z])/g, " $1")}</Label>
              <Select value={formData[field as keyof FormData]} onValueChange={(val) => onChange(field as keyof FormData, val)}>
                <SelectTrigger><SelectValue placeholder="Select column" /></SelectTrigger>
                <SelectContent>
                  {columns.map((c) => (
                    <SelectItem key={c.column_id} value={c.column_id}>
                      {c.column_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ))}
        </>
      ) : (
        <>
          {["leadLinkedInUrlColumn", "leadScoringColumn"].map((field) => (
            <div key={field}>
              <Label>{field.replace(/([A-Z])/g, " $1")}</Label>
              <Select value={formData[field as keyof FormData]} onValueChange={(val) => onChange(field as keyof FormData, val)}>
                <SelectTrigger><SelectValue placeholder="Select column" /></SelectTrigger>
                <SelectContent>
                  {columns.map((c) => (
                    <SelectItem key={c.column_id} value={c.column_id}>
                      {c.column_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ))}
        </>
      )}
    </CardContent>
  </Card>
);
