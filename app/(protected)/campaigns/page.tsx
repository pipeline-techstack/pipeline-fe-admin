"use client";
import { Copy, Search } from "lucide-react";
import { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const CampaignsPage = () => {
  const [search, setSearch] = useState("");

  // Mock data for now - with multiple owners
  const campaigns = [
    {
      id: "1",
      name: "Spring Product Launch",
      owners: ["Sarah Wilson"],
      createdAt: "2025-01-10",
    },
    {
      id: "2",
      name: "Email Nurture Series",
      owners: ["Tom Brown", "Emily Davis"],
      createdAt: "2025-02-15",
    },
    {
      id: "3",
      name: "Social Media Outreach",
      owners: ["Emily Davis", "John Doe", "Mike Johnson", "Sarah Wilson"],
      createdAt: "2025-03-05",
    },
  ];

  const filteredCampaigns = campaigns.filter((campaign) =>
    campaign.name.toLowerCase().includes(search.toLowerCase()) ||
    campaign.owners.some((owner) =>
      owner.toLowerCase().includes(search.toLowerCase())
    )
  );

  return (
    <TooltipProvider>
      <div className="mx-auto p-6 max-w-6xl container">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="mb-2 font-bold text-gray-900 text-3xl">
              Campaigns
            </h1>
            <p className="text-gray-600">Manage your campaigns</p>
          </div>

          {/* 🔍 Search Bar */}
          <div className="relative w-64">
            <Search className="top-2.5 left-3 absolute w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search campaigns..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="py-2 pr-4 pl-10 border border-gray-300 rounded-md w-full"
            />
          </div>
        </div>

        <div className="bg-white shadow-sm border border-gray-200 rounded-lg max-h-[500px] overflow-hidden">
          <div className="max-h-[500px] overflow-y-auto">
            <table className="w-full border-collapse">
              <thead className="top-0 z-10 sticky bg-gray-50 border-gray-200 border-b">
                <tr>
                  <th className="px-6 py-4 font-semibold text-gray-900 text-sm text-left">
                    Campaign
                  </th>
                  <th className="px-6 py-4 font-semibold text-gray-900 text-sm text-left">
                    Owner
                  </th>
                  <th className="px-6 py-4 font-semibold text-gray-900 text-sm text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 text-sm">
                {filteredCampaigns.map((campaign) => (
                  <tr
                    key={campaign.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">
                        {campaign.name}
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-2">
                        {/* Show first 2 owners */}
                        {campaign.owners.slice(0, 2).map((owner, idx) => (
                          <span
                            key={idx}
                            className="bg-blue-100 px-2 py-1 rounded-md text-blue-700 text-xs"
                          >
                            {owner}
                          </span>
                        ))}

                        {/* Show tooltip if more than 2 owners */}
                        {campaign.owners.length > 2 && (
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <span className="bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded-md text-gray-700 text-xs cursor-pointer">
                                +{campaign.owners.length - 2} more
                              </span>
                            </TooltipTrigger>
                            <TooltipContent className="max-w-xs max-h-80 overflow-y-auto">
                              <div className="flex flex-wrap gap-1">
                                {campaign.owners.slice(2).map((owner, idx) => (
                                  <span
                                    key={idx}
                                    className="bg-blue-50 px-2 py-0.5 rounded text-blue-700 text-xs"
                                  >
                                    {owner}
                                  </span>
                                ))}
                              </div>
                            </TooltipContent>
                          </Tooltip>
                        )}
                      </div>
                    </td>

                    <td className="flex justify-end px-6 py-4">
                      <button
                        onClick={() => alert(`Duplicate ${campaign.name}`)}
                        className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-md transition-colors"
                      >
                        <Copy className="w-4 h-4" />
                        Duplicate
                      </button>
                    </td>
                  </tr>
                ))}
                {filteredCampaigns.length === 0 && (
                  <tr>
                    <td
                      colSpan={3}
                      className="px-6 py-4 text-gray-500 text-center"
                    >
                      No matching campaigns found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-4 text-gray-500 text-sm">
          Total campaigns: {filteredCampaigns.length}
        </div>
      </div>
    </TooltipProvider>
  );
};

export default CampaignsPage;