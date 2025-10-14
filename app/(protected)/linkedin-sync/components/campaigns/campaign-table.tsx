"use client";

import { useState } from "react";
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
import CreateCampaignDialog from "./create-campaign-dialog";
import { CampaignTask } from "../../types/campaign";

interface CampaignTableProps {
  campaigns: CampaignTask[];
  onUpdate?: (campaignId: string, heyreachCampaignId: string) => void;
  isLoading?: boolean;
}

const CampaignTable = ({ campaigns, onUpdate, isLoading }: CampaignTableProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedCampaignId, setSelectedCampaignId] = useState<string>("");

  const handleUpdateClick = (campaignId: string) => {
    setSelectedCampaignId(campaignId);
    setIsDialogOpen(true);
  };

  const handleLinkCampaign = (heyreachCampaignId: string) => {
    if (selectedCampaignId && onUpdate) {
      onUpdate(selectedCampaignId, heyreachCampaignId);
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

  if (campaigns.length === 0) {
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
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {campaigns.map((campaign) => {
                const taskType = campaign.task_type?.toLowerCase();

                return (
                  <TableRow key={campaign.id}>
                    <TableCell className="font-medium">
                      {campaign.campaign_name}
                    </TableCell>

                    <TableCell>
                      <div className="flex flex-wrap gap-2">
                        {campaign.linkedin_senders.map((sender) => (
                          <Badge key={sender.id} variant="outline">
                            {sender.name}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>

                    <TableCell>
                      <Badge
                        className={`px-3 py-1 font-medium transition-colors ${
                          taskType === "create"
                            ? "bg-green-100 text-green-800 hover:bg-green-200"
                            : "bg-blue-100 text-blue-800 hover:bg-gray-200"
                        }`}
                      >
                        {taskType === "create"
                          ? "Create Campaign"
                          : "Update Campaign"}
                      </Badge>
                    </TableCell>

                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleUpdateClick(campaign.id)}
                      >
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Update
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <CreateCampaignDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onLinkCampaign={handleLinkCampaign}
      />
    </>
  );
};

export default CampaignTable;