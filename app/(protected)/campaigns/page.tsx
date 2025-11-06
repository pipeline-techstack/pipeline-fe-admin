"use client";
import { Copy, Search } from "lucide-react";
import { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import PageHeader from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";

const CampaignsPage = () => {
  const [search, setSearch] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<{
    id: string;
    name: string;
    owners: string[];
    createdAt: string;
  } | null>(null);
  const [newName, setNewName] = useState("");
  const [userEmail, setUserEmail] = useState("");

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

  const filteredCampaigns = campaigns.filter(
    (campaign) =>
      campaign.name.toLowerCase().includes(search.toLowerCase()) ||
      campaign.owners.some((owner) =>
        owner.toLowerCase().includes(search.toLowerCase())
      )
  );

  const handleDuplicateClick = (campaign: typeof campaigns[number]) => {
    setSelectedCampaign(campaign);
    setNewName(`${campaign.name} (Copy)`);
    setUserEmail("");
    setIsDialogOpen(true);
  };

  const handleDuplicate = () => {
    if (!newName.trim() || !userEmail.trim()) {
      alert("Please fill in all fields");
      return;
    }

    alert(
      `Duplicating campaign:\nOriginal: ${selectedCampaign?.name}\nNew Name: ${newName}\nUser Email: ${userEmail}`
    );

    setIsDialogOpen(false);
    setNewName("");
    setUserEmail("");
    setSelectedCampaign(null);
  };

  return (
    <TooltipProvider>
      <div className="p-6 mx-auto max-w-7xl">
        <div className="flex justify-between items-start mb-6">
          <PageHeader title="Campaigns" subtitle="Manage your campaigns" />

          <div className="relative w-64">
            <Search className="top-2.5 left-3 absolute w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search campaigns..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="py-2 pr-4 pl-10 border border-gray-300 rounded-md w-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <div className="bg-white shadow-sm border border-gray-200 rounded-lg overflow-hidden">
          <div className="max-h-[600px] overflow-y-auto">
            <table className="w-full border-collapse">
              <thead className="top-0 z-10 sticky bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 font-semibold text-gray-900 text-left text-sm">
                    Campaigns
                  </th>
                  <th className="px-6 py-3 font-semibold text-gray-900 text-left text-sm">
                    Owner
                  </th>
                  <th className="px-6 py-3 font-semibold text-gray-900 text-right text-sm">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredCampaigns.map((campaign) => (
                  <tr
                    key={campaign.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900 text-sm">
                        {campaign.name}
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-2">
                        {campaign.owners.slice(0, 2).map((owner, idx) => (
                          <span
                            key={idx}
                            className="bg-blue-100 px-2 py-1 rounded-md text-blue-700 text-xs"
                          >
                            {owner}
                          </span>
                        ))}

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
                        onClick={() => handleDuplicateClick(campaign)}
                        className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-md text-sm transition-colors"
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
                      className="px-6 py-8 text-gray-500 text-center text-sm"
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

        {/* Duplicate Campaign Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Duplicate Campaign</DialogTitle>
              <DialogDescription>
                Create a copy of "{selectedCampaign?.name}".
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label htmlFor="campaign-name" className="text-sm font-medium">
                  New Campaign Name
                </label>
                <input
                  id="campaign-name"
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  placeholder="Enter campaign name"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="user-email" className="text-sm font-medium">
                  User Email
                </label>
                <input
                  id="user-email"
                  type="email"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  placeholder="user@example.com"
                />
              </div>
            </div>

            <DialogFooter>
              <div className="flex justify-center gap-3 w-full">
                <Button
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                  className="w-28 h-9 text-sm border border-gray-300 bg-white text-gray-700 hover:bg-red-400 hover:text-white transition-colors"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleDuplicate}
                  className="w-28 h-9 text-sm bg-[#4A5BAA] text-white rounded-md hover:bg-[#3B4A8D] transition-colors"
                >
                  Duplicate
                </Button>
              </div>
            </DialogFooter>

          </DialogContent>
        </Dialog>
      </div>
    </TooltipProvider>
  );
};

export default CampaignsPage;
