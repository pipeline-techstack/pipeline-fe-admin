"use client";
import { Button } from "@/components/ui/button";
import { Save, X } from "lucide-react";

type Props = {
  loading: boolean;
  onSave: () => void;
  onCancel: () => void;
};

export const ActionButtons = ({ loading, onSave, onCancel }: Props) => (
  <div className="flex space-x-4 pt-6">
    <Button className="bg-zinc-800 hover:bg-zinc-700" onClick={onSave} disabled={loading}>
      <Save className="mr-2 w-4 h-4" />
      {loading ? "Saving..." : "Save"}
    </Button>
    <Button variant="outline" onClick={onCancel}>
      <X className="mr-2 w-4 h-4" />
      Cancel
    </Button>
  </div>
);
