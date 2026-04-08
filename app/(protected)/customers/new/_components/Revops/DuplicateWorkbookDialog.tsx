import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { LoadingButton } from "@/components/loader-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface DuplicateWorkbookDialogProps {
  isOpen: boolean;
  onClose: () => void;
  workbookName: string;
  newName: string;
  userEmail: string;
  isLoading: boolean;
  onNewNameChange: (value: string) => void;
  onUserEmailChange: (value: string) => void;
  onConfirm: () => void;
}

export const DuplicateWorkbookDialog = ({
  isOpen,
  onClose,
  workbookName,
  newName,
  userEmail,
  isLoading,
  onNewNameChange,
  onUserEmailChange,
  onConfirm,
}: DuplicateWorkbookDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Share Workbook</DialogTitle>
          <DialogDescription>
            Create a copy of "{workbookName}".
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="workbook-name">
              New Workbook Name
            </Label>
            <Input
              id="workbook-name"
              type="text"
              value={newName}
              onChange={(e) => onNewNameChange(e.target.value)}
              disabled={isLoading}
              placeholder="Enter workbook name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="user-email">
              User Email
            </Label>
            <Input
              id="user-email"
              type="email"
              value={userEmail}
              onChange={(e) => onUserEmailChange(e.target.value)}
              disabled={isLoading}
              placeholder="user@example.com"
            />
          </div>
        </div>

        <DialogFooter>
          <div className="flex justify-end gap-3 w-full">
            <Button
              variant="outline"
              onClick={onClose}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <LoadingButton
              isLoading={isLoading}
              loadingText="Sharing..."
              onClick={onConfirm}
            >
              Share
            </LoadingButton>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};