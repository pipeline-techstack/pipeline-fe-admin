import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { shareCampaign } from "@/services/campaign-apis";
import { toast } from "sonner";
import { LoadingButton } from "@/components/loader-button";

const ShareModal = ({ open, onClose, campaign }: any) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (open) {
      setEmail("");
      setError("");
    }
  }, [open]);

  const handleSubmit = async () => {
    if (!email) {
      setError("Email is required");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const res = await shareCampaign(email, campaign?.id);
      if (res.success) {
        toast.success(res.message);
      }
      onClose(); // close modal on success
    } catch (err: any) {
      setError(err.message || "Something went wrong");
      toast.error(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>Share Campaign</DialogTitle>
        </DialogHeader>

        <div className="space-y-5 mt-4">
          {/* Campaign Info */}
          <div className="bg-gray-50 px-3 py-2 border rounded-md">
            <p className="text-muted-foreground text-sm">Campaign</p>
            <p className="text-gray-900 text-sm truncate">{campaign?.name}</p>
          </div>

          {/* Email Input */}
          <div className="space-y-1">
            <Label>Email address</Label>

            <Input
              type="email"
              placeholder="Enter email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
                loadingText="Sharing..."
                onClick={handleSubmit}
                disabled={loading || !email}
                className="h-9"
              >
                Share
              </LoadingButton>
            </div>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShareModal;
