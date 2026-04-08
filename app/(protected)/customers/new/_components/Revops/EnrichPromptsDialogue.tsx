"use client";

import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

import { getPrompts, editPrompts } from "@/services/enrichments-apis";
import { toast } from "sonner";
import { Copy, Pencil } from "lucide-react";
import SpinLoader from "@/components/common/spin-loader";
import { Textarea } from "@/components/ui/textarea";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data: any;
};

const PROMPT_TYPES = [
  { key: "profile_scoring", label: "Profile Scoring" },
  { key: "account_scoring", label: "Account Scoring" },
  { key: "research", label: "Research" },
];

export function EnrichPromptsDialogue({ open, onOpenChange, data }: Props) {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [promptData, setPromptData] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState("");
  const [selectedType, setSelectedType] = useState("profile_scoring");

  const flowId = data?._id || data?.id;
  const enrichmentName = data?.name || "Enrichment";

  // 🔥 helper: check if prompt exists
  const isEmptyPrompt = (type: string) => {
    if (!promptData) return true;

    if (type === "profile_scoring") {
      return !promptData?.profile_scoring?.prompt_text;
    }

    if (type === "account_scoring") {
      return !promptData?.account_scoring?.prompt_text;
    }

    if (type === "research") {
      const arr = promptData?.research?.prompts;
      return !arr || arr.length === 0;
    }

    return true;
  };

  const isEmpty = isEmptyPrompt(selectedType);

  // ✅ Fetch
  useEffect(() => {
    if (!open || !flowId) return;

    const fetchPrompts = async () => {
      try {
        setLoading(true);
        const res = await getPrompts({ flow_id: flowId });

        setPromptData(res);
      } catch {
        toast.error("Failed to load prompt");
      } finally {
        setLoading(false);
      }
    };

    fetchPrompts();
  }, [open, flowId]);

  // ✅ Update content when type changes
  useEffect(() => {
    if (!promptData) return;

    let text = "";

    if (selectedType === "profile_scoring") {
      text = promptData?.profile_scoring?.prompt_text || "";
    } else if (selectedType === "account_scoring") {
      text = promptData?.account_scoring?.prompt_text || "";
    } else if (selectedType === "research") {
      const arr = promptData?.research?.prompts || [];
      text = arr.length ? JSON.stringify(arr, null, 2) : "";
    }

    setEditedText(text);
    setIsEditing(false);
  }, [selectedType, promptData]);

  // ✅ Save
  const handleSave = async () => {
    try {
      setSaving(true);

      const payload = {
        account_scoring_prompt_text:
          selectedType === "account_scoring"
            ? editedText
            : promptData?.account_scoring?.prompt_text || "",

        profile_scoring_prompt_text:
          selectedType === "profile_scoring"
            ? editedText
            : promptData?.profile_scoring?.prompt_text || "",

        research_prompts:
          selectedType === "research"
            ? JSON.parse(editedText || "[]")
            : promptData?.research?.prompts || [],
      };

      await editPrompts({ flow_id: flowId, payload });

      toast.success("Updated successfully");
      setIsEditing(false);
    } catch (err: any) {
      toast.error(err.message || "Save failed");
    } finally {
      setSaving(false);
    }
  };

  // ✅ Copy
  const handleCopy = async () => {
    if (!editedText) return;
    await navigator.clipboard.writeText(editedText);
    toast.success("Copied");
  };

  if (!data) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex justify-between items-start gap-2">
            <div>
              <DialogTitle className="text-xl">{enrichmentName}</DialogTitle>

              <p className="mt-2 text-muted-foreground text-sm">Prompt Type</p>

              <div className="mt-1 w-[250px]">
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>

                  <SelectContent>
                    {PROMPT_TYPES.map((type) => (
                      <SelectItem key={type.key} value={type.key}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2 mr-10">
              {!isEditing ? (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setIsEditing(true)}
                  disabled={isEmpty}
                >
                  <Pencil />
                  Edit
                </Button>
              ) : (
                <>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setIsEditing(false);
                      setEditedText(originalText); // reset changes
                    }}
                  >
                    Cancel
                  </Button>

                  <Button size="sm" onClick={handleSave} disabled={saving}>
                    {saving ? "Saving..." : "Save"}
                  </Button>
                </>
              )}
            </div>
          </div>
        </DialogHeader>

        {/* Content */}
        <div className="mt-2">
          {loading ? (
            <SpinLoader />
          ) : isEmpty ? (
            <div className="p-4 border rounded text-muted-foreground text-sm">
              No prompt available for this type.
            </div>
          ) : isEditing ? (
            <Textarea
              value={editedText}
              onChange={(e) => setEditedText(e.target.value)}
              className="p-4 border rounded-md w-full h-[500px] font-mono text-sm"
            />
          ) : (
            <div className="relative p-3 border rounded-md font-mono text-muted-foreground text-sm leading-6 whitespace-pre-wrap">
              {/* ✅ Copy button inside content */}
              <button
                onClick={handleCopy}
                className="top-2 right-2 absolute hover:bg-gray-100 p-1 rounded"
              >
                <Copy className="w-4 h-4" />
              </button>

              {editedText}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
