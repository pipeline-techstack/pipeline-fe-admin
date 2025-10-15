"use client";

import { useState } from "react";
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
import { SingleSelectComponent } from "@/app/(protected)/wb-config/_components/campaign-select";
import { useHeyreachSenders } from "../../hooks/useHeyrechSenders";
import { addLinkedinSender } from "@/services/linkedin-senders";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

interface AddSenderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddSender: (data: { id: number; fullName: string; email: string }) => void;
}

const AddSenderDialog = ({
  open,
  onOpenChange,
  onAddSender,
}: AddSenderDialogProps) => {
  const { data: senderOptions = [], isLoading } = useHeyreachSenders(open);
  const queryClient = useQueryClient();

  const [selectedSenderId, setSelectedSenderId] = useState<string>("");
  const [profileUrl, setProfileUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isValidLinkedInUrl = (url: string) => {
    const pattern = /^https:\/\/(www\.)?linkedin\.com\/in\/[A-Za-z0-9-_]+\/?$/;
    return pattern.test(url.trim());
  };

  const handleSubmit = async () => {
    if (!selectedSenderId || !isValidLinkedInUrl(profileUrl)) {
      toast.error("Please enter a valid LinkedIn profile URL");
      return;
    }

    const selected = senderOptions.find(
      (s: any) => String(s.id) === selectedSenderId
    );
    if (!selected) return;

    try {
      setIsSubmitting(true);
      await addLinkedinSender(selectedSenderId, profileUrl.trim());
      toast.success(`Sender "${selected.name}" linked successfully!`);

      // onAddSender({
      //   id: selected.id,
      //   fullName: selected.name,
      //   email: selected.email,
      // });

      queryClient.invalidateQueries({ queryKey: ["linkedin-senders"] });

      // Reset form
      setSelectedSenderId("");
      setProfileUrl("");
      onOpenChange(false);
    } catch (err: any) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setSelectedSenderId("");
    setProfileUrl("");
    onOpenChange(false);
  };

  const selectOptions = senderOptions.map((s: any) => ({
    name: s.name,
    id: String(s.id),
  }));

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-0 sm:max-w-[540px]">
        <DialogHeader className="px-6 pt-6 pb-4">
          <DialogTitle className="mb-2 font-semibold text-gray-700 text-xl">
            Add New Sender
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            Select a Heyreach LinkedIn sender profile and add their LinkedIn
            URL.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5 px-6 pb-6">
          {/* Sender Select */}
          <div className="space-y-2">
            <Label className="font-medium text-gray-900 text-sm">
              Select Sender
            </Label>
            <SingleSelectComponent
              value={selectedSenderId}
              options={selectOptions}
              onChange={(val) => setSelectedSenderId(val)}
              name="Senders"
              placeholder={isLoading ? "Loading senders..." : "Choose a sender"}
              disabled={isLoading || isSubmitting}
            />
          </div>

          {/* LinkedIn URL Input */}
          <div className="space-y-2">
            <Label
              htmlFor="profileUrl"
              className="font-medium text-gray-900 text-sm"
            >
              LinkedIn Profile URL
            </Label>
            <Input
              id="profileUrl"
              placeholder="https://www.linkedin.com/in/username/"
              value={profileUrl}
              onChange={(e) => setProfileUrl(e.target.value)}
              className={`border-gray-300 focus-visible:ring-blue-500 h-12 ${
                profileUrl && !isValidLinkedInUrl(profileUrl)
                  ? "border-red-500 focus-visible:ring-red-500"
                  : ""
              }`}
              disabled={isSubmitting}
            />
            {profileUrl && !isValidLinkedInUrl(profileUrl) && (
              <p className="text-red-600 text-sm">
                Please enter a valid LinkedIn profile URL.
              </p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-center items-center gap-3 pt-4">
            <Button
              variant="outline"
              onClick={handleCancel}
              className="px-6 w-32 h-10"
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={
                !selectedSenderId ||
                !profileUrl.trim() ||
                !isValidLinkedInUrl(profileUrl) ||
                isSubmitting
              }
              className="bg-[#4A5BAA] hover:bg-[#3d4c92] px-6 w-32 h-10 text-white"
            >
              {isSubmitting ? "Adding..." : "Add Sender"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddSenderDialog;
