"use client";
import SpinLoader from "@/components/common/spin-loader";
import { Button } from "@/components/ui/button";
import { Save, X } from "lucide-react";

type Props = {
  loading: boolean;
  onSave: () => void;
  onCancel: () => void;
};

export const ActionButtons = ({ loading, onSave, onCancel }: Props) => (
  <div className="flex space-x-4 pt-6">
    <Button variant={"default"} onClick={onSave} disabled={loading}>
      <Save className="mr-2 w-4 h-4" />
      {loading ? <span> <SpinLoader/>"Saving..."</span> : "Save"}
    </Button>
    <Button variant="outline" onClick={onCancel}>
      <X className="mr-2 w-4 h-4" />
      Cancel
    </Button>
  </div>
);
