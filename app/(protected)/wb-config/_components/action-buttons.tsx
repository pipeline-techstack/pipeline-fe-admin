"use client";
import { Button } from "@/components/ui/button";
import { Save, X } from "lucide-react";

type Props = {
  loading: boolean;
  onSave: () => void;
  onCancel: () => void;
};

export const ActionButtons = ({ loading, onSave, onCancel }: Props) => (
  <div className="flex space-x-4 justify-center pt-6">
    <Button variant="outline" onClick={onCancel} className="w-32 justify-center">
      <X className="mr-1 w-4 h-4 " />
      Cancel
    </Button>
    <Button className=" w-32 justify-center bg-[#4A5BAA] hover:bg-[#3d4c92]" onClick={onSave} disabled={loading}>
      <Save className="mr-1 w-4 h-4" />
      {loading ? "Saving..." : "Save"}
    </Button>
    
  </div>
);
