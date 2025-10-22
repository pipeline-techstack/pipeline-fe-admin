"use client";
import { Button } from "@/components/ui/button";
import { Save, X } from "lucide-react";

type Props = {
  loading: boolean;
  onSave: () => void;
  onCancel: () => void;
};

export const ActionButtons = ({ loading, onSave, onCancel }: Props) => (
  <div className="flex justify-center space-x-4 pt-6">
    <Button
      variant="outline"
      onClick={onCancel}
      className="justify-center w-32"
    >
      <X className="mr-1 w-4 h-4" />
      Cancel
    </Button>
    <Button onClick={onSave} disabled={loading}>
      <Save className="mr-1 w-4 h-4" />
      {loading ? "Saving..." : "Save"}
    </Button>
  </div>
);
