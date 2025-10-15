"use client";

import { useState, useMemo } from "react";
import { RefreshCw } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import CreateCampaignDialog from "./create-campaign-dialog";
import UpdateCampaignDialog from "./update-campaign-dialog";
import CampaignPreviewDialog from "./campaign-preview-dialog";
import { CampaignTask } from "../../types/campaign";
import { updateCampaignTask, markCampaignAsUpdated } from "../../services/campaign-apis";
import { 
  getLinkedInSenderNames, 
  getTaskTypeDisplay, 
  getTaskType 
} from "../../utils/campaign-utils";

interface CampaignTableProps {
  campaigns: CampaignTask[];
  onRefresh?: () => Promise<void>;
  isLoading?: boolean;
}

const CampaignTable = ({ campaigns, onRefresh, isLoading }: CampaignTableProps) => {
  const [isPreviewDialogOpen, setIsPreviewDialogOpen] = useState(false);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<CampaignTask | null>(null);

  const sortedCampaigns = useMemo(() => {
    if (!campaigns) return [];
    
    return [...campaigns].sort((a, b) => {
      if (a.status === 'pending' && b.status !== 'pending') return -1;
      if (a.status !== 'pending' && b.status === 'pending') return 1;
      return 0;
    });
  }, [campaigns]);

  const handleUpdateClick = (task: CampaignTask) => {
    setSelectedTask(task);
    
    if (task.type === "campaign_creation") {
      // Open preview dialog first for campaign creation
      setIsPreviewDialogOpen(true);
    } else if (task.type === "campaign_update") {
      // Directly open update dialog for campaign updates
      setIsUpdateDialogOpen(true);
    }
  };

  const handlePreviewProceed = () => {
    // Close preview and open create dialog
    setIsPreviewDialogOpen(false);
    setIsCreateDialogOpen(true);
  };

  const handleLinkCampaign = async (taskId: string, heyreachCampaignId: string) => {
    try {
      await updateCampaignTask(taskId, heyreachCampaignId);
      
      toast.success("Campaign linked successfully", {
        description: `HeyReach campaign ${heyreachCampaignId} has been linked.`
      });
      
      setIsCreateDialogOpen(false);
      setSelectedTask(null);
      
      if (onRefresh) {
        await onRefresh();
      }
    } catch (error) {
      const err = error as Error;
      toast.error("Failed to link campaign", {
        description: err.message
      });
      throw error;
    }
  };

  const handleUpdateCampaign = async (taskId: string) => {
    try {
      await markCampaignAsUpdated(taskId);
      
      toast.success("Campaign marked as updated", {
        description: "The campaign has been successfully updated."
      });
      
      setIsUpdateDialogOpen(false);
      setSelectedTask(null);
      
      if (onRefresh) {
        await onRefresh();
      }
    } catch (error) {
      const err = error as Error;
      toast.error("Failed to update campaign", {
        description: err.message
      });
      throw error;
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-8">
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-16 w-full" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!campaigns || campaigns.length === 0) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <p className="text-gray-600">No campaigns found</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Campaign Name</TableHead>
                <TableHead>LinkedIn Senders</TableHead>
                <TableHead>Task Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {sortedCampaigns.map((task) => {
                const senderNames = getLinkedInSenderNames(task);
                const taskType = getTaskType(task.type);
                const taskTypeDisplay = getTaskTypeDisplay(task.type);

                return (
                  <TableRow key={task._id}>
                    <TableCell className="font-medium" title={task.campaign_id}>
                      {task.fields?.campaign_name?.trim() || task.campaign_name?.trim() || "Unknown"}
                    </TableCell>

                    <TableCell>
                      <div className="flex flex-wrap gap-2">
                        {senderNames.length > 0 ? (
                          senderNames.map((name, index) => (
                            <Badge key={index} variant="outline">
                              {name}
                            </Badge>
                          ))
                        ) : (
                          <span className="text-sm text-gray-500">No senders</span>
                        )}
                      </div>
                    </TableCell>

                    <TableCell>
                      <Badge
                        className={`px-3 py-1 font-medium transition-colors ${
                          taskType === "create"
                            ? "bg-green-100 text-green-800 hover:bg-green-200"
                            : "bg-blue-100 text-blue-800 hover:bg-blue-200"
                        }`}
                      >
                        {taskTypeDisplay}
                      </Badge>
                    </TableCell>

                    <TableCell>
                      <Badge 
                        className={
                          task.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : task.status === 'completed'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }
                      >
                        {task.status}
                      </Badge>
                    </TableCell>

                    <TableCell>
                      {task.status !== 'completed' && (
                        <Button
                          size="sm"
                          className="bg-[#5569c0] text-white hover:bg-[#3d4c92]"
                          onClick={() => handleUpdateClick(task)}
                        >
                          <RefreshCw className="w-4 h-4" />
                          Update
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <CampaignPreviewDialog
        open={isPreviewDialogOpen}
        onOpenChange={setIsPreviewDialogOpen}
        onProceed={handlePreviewProceed}
        selectedTask={selectedTask}
      />

      <CreateCampaignDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onLinkCampaign={handleLinkCampaign}
        taskId={selectedTask?._id}
      />

      <UpdateCampaignDialog
        open={isUpdateDialogOpen}
        onOpenChange={setIsUpdateDialogOpen}
        onUpdateCampaign={handleUpdateCampaign}
        selectedTask={selectedTask}
      />
    </>
  );
};

export default CampaignTable;