"use client";

import { Card, CardContent } from "@/components/ui/card";

interface CampaignsHeaderProps {
  onUpdate?: () => Promise<void>;
  total: number;
}

const CampaignsHeader = ({ onUpdate, total }: CampaignsHeaderProps) => {
  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-1">Campaign Tasks</h2>
          <p className="text-sm text-gray-600">Link and manage your HeyReach campaigns</p>
        </div>
      </div>

      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <h3 className="text-md font-semibold text-gray-900">Campaign Overview</h3>
            <div className="text-sm text-gray-600">
              Total Campaigns: <span className="font-medium">{total}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default CampaignsHeader;