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
          <DialogTitle>Duplicate Workbook</DialogTitle>
          <DialogDescription>
            Create a copy of "{workbookName}".
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label htmlFor="workbook-name" className="text-sm font-medium text-gray-700">
              New Workbook Name
            </label>
            <input
              id="workbook-name"
              type="text"
              value={newName}
              onChange={(e) => onNewNameChange(e.target.value)}
              disabled={isLoading}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm  disabled:bg-gray-50 disabled:text-gray-500"
              placeholder="Enter workbook name"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="user-email" className="text-sm font-medium text-gray-700">
              User Email
            </label>
            <input
              id="user-email"
              type="email"
              value={userEmail}
              onChange={(e) => onUserEmailChange(e.target.value)}
              disabled={isLoading}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm disabled:bg-gray-50 disabled:text-gray-500"
              placeholder="user@example.com"
            />
          </div>
        </div>

        <DialogFooter>
          <div className="flex justify-center gap-3 w-full">
            <Button
              variant="outline"
              onClick={onClose}
              disabled={isLoading}
              className="w-36 px-6 h-10 text-sm border border-gray-300 bg-white text-gray-700 hover:bg-red-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </Button>
            <LoadingButton
              isLoading={isLoading}
              loadingText="Duplicating..."
              onClick={onConfirm}
              className="w-36 px-6 h-10 text-sm bg-[#4A5BAA] text-white rounded-md hover:bg-[#3B4A8D] disabled:opacity-50"
            >
              Duplicate
            </LoadingButton>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};