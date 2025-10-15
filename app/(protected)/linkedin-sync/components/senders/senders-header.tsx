"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import AddSenderDialog from "./add-sender-dialog";

interface SendersHeaderProps {
  onAddSender: (data: { fullName: string; email: string }) => void;
}

const SendersHeader = ({ onAddSender }: SendersHeaderProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-1">LinkedIn Senders</h2>
          <p className="text-sm text-gray-600">Manage your LinkedIn sender profiles and engagement</p>
        </div>
        <Button onClick={() => setIsDialogOpen(true)}
            className="bg-[#4A5BAA] hover:bg-[#3d4c92] text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add New Sender
        </Button>
      </div>

      <AddSenderDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onAddSender={onAddSender}
      />
    </>
  );
};

export default SendersHeader;