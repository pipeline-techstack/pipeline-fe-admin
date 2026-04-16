import { LoadingButton } from "@/components/loader-button";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";

function UpdateOwnerModal({
  open,
  onClose,
  campaign,
  notificationName,
  setNotificationName,
  loading,
  error,
  handleSubmit,
}: {
  open: boolean;
  onClose: () => void;
  campaign: any;
  notificationName: string;
  setNotificationName: (val: string) => void;
  loading: boolean;
  error: string;
  handleSubmit: () => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>Edit Notification</DialogTitle>
        </DialogHeader>

        <div className="space-y-5 mt-4">
          {/* Notification Name Input */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-sm">
              Notification Name
            </Label>

            <Input
              placeholder="e.g. Campaign Alerts - Alex"
              value={notificationName}
              onChange={(e) => setNotificationName(e.target.value)}
            />
          </div>

          {/* Error */}
          {error && (
            <div className="bg-red-50 px-3 py-2 border border-red-200 rounded-md text-red-600 text-xs">
              {error}
            </div>
          )}

          {/* Actions */}
          <DialogFooter>
            <div className="flex justify-end gap-2 pt-2 w-full">
              <Button
                variant="outline"
                onClick={onClose}
                disabled={loading}
                className="h-9"
              >
                Cancel
              </Button>

              <LoadingButton
                isLoading={loading}
                loadingText="Saving..."
                onClick={handleSubmit}
                disabled={loading || !notificationName}
                className="h-9"
              >
                Save
              </LoadingButton>
            </div>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default UpdateOwnerModal;
