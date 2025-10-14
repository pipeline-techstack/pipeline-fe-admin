"use client";

import { useState } from "react";
import { X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AddSenderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddSender: (data: { fullName: string; email: string }) => void;
}

const AddSenderDialog = ({
  open,
  onOpenChange,
  onAddSender,
}: AddSenderDialogProps) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = () => {
    if (fullName.trim() && email.trim()) {
      onAddSender({ fullName: fullName.trim(), email: email.trim() });
      // Reset form
      setFullName("");
      setEmail("");
      onOpenChange(false);
    }
  };

  const handleCancel = () => {
    setFullName("");
    setEmail("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[540px] p-0">
        <DialogHeader className="px-6 pt-6 pb-4">
          <div className="flex items-start justify-between">
            <div>
              {/* <DialogTitle className="text-2xl font-bold text-[#4A5BAA] mb-2"> */}
              <DialogTitle className="text-xl font-semibold text-gray-700 mb-2">
                Add New Sender
              </DialogTitle>
              <DialogDescription className="text-gray-600">
                Enter the details of the LinkedIn sender profile you want to add.
              </DialogDescription>
            </div>

          </div>
        </DialogHeader>

        <div className="px-6 pb-6 space-y-5">
          <div className="space-y-2">
            <Label htmlFor="fullName" className="text-sm font-medium text-gray-900">
              Full Name
            </Label>
            <Input
              id="fullName"
              placeholder="e.g. John Smith"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="h-12 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:border-transparent"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium text-gray-900">
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="john.smith@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 border-gray-300 focus-visible:ring-blue-500"
            />
          </div>

          <div className="flex items-center justify-center gap-3 pt-4">
            <Button
              variant="outline"
              onClick={handleCancel}
              className="px-6 h-10 w-32"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={!fullName.trim() || !email.trim()}
              className="px-6 h-10 w-32 bg-[#4A5BAA] hover:bg-[#3d4c92] text-white"
            >
              Add Sender
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddSenderDialog;