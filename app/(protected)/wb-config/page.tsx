"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { fetchWorkbookConfigurations } from "./services/config-apis";
import { WorkbookConfiguration } from "./types/api";
import { Pencil, Plus } from "lucide-react";

const WorkbookConfigurationPage = () => {
  const router = useRouter();
  const [workbookConfigurations, setWorkbookConfigurations] = useState<
    WorkbookConfiguration[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const configs = await fetchWorkbookConfigurations();
        setWorkbookConfigurations(configs);
      } catch (err: any) {
        setError(err.message || "Failed to load configurations");
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  return (
    <TooltipProvider>
      <div className="bg-gray-50 px-4 py-8">
        <div className="bg-white shadow-sm mx-auto p-8 rounded-xl">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="font-bold text-gray-900 text-2xl">
                Workbook Configuration
              </h2>
              <p className="mt-1 text-gray-600 text-sm">
                What is user and campaign Permission
              </p>
            </div>

            <Button
              className="flex items-center gap-2 bg-[#4A5BAA] hover:bg-[#3d4c92]"
              onClick={() => router.push("/wb-config/new")}
            >
              <Plus className="w-4 h-4" />
              New Configuration
            </Button>

          </div>

          {isLoading ? (
            <p className="text-gray-500">Loading workbook configurations...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : workbookConfigurations.length === 0 ? (
            <p className="text-gray-500">No workbook configurations found</p>
          ) : (
            <table className="border border-gray-200 rounded-md w-full">
              <thead>
                <tr className="bg-gray-100 font-semibold text-gray-700 text-sm text-left">
                  <th className="p-3 border-b">Campaigns</th>
                  <th className="p-3 border-b">Workbooks</th>
                  <th className="p-3 border-b text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {workbookConfigurations.map((config) => (
                  <tr
                    key={config.campaign_id}
                    className="hover:bg-gray-50 text-gray-800 text-sm"
                  >
                    <td className="p-3 border-b">
                      <span className="font-medium">{config.campaign}</span>
                    </td>
                    <td className="p-3 border-b">
                      <div className="flex flex-wrap gap-2">
                        {/* Show first 2 workbooks */}
                        {config.workbooks.slice(0, 2).map((workbook) => (
                          <span
                            key={workbook.id}
                            className="bg-blue-100 px-2 py-1 rounded-md text-[#4A5BAA] text-xs"
                          >
                            {workbook.name}
                          </span>
                        ))}

                        {/* Show tooltip if more than 2 workbooks */}
                        {config.workbooks.length > 2 && (
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <span className="bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded-md text-gray-700 text-xs cursor-pointer">
                                +{config.workbooks.length - 2} more
                              </span>
                            </TooltipTrigger>
                            <TooltipContent className="max-w-xs max-h-80 overflow-y-auto">
                              <div className="flex flex-wrap gap-1">
                                {config.workbooks.slice(2).map((workbook) => (
                                  <span
                                    key={workbook.id}
                                    className="bg-blue-50 px-2 py-0.5 rounded text-[#4A5BAA] text-xs"
                                  >
                                    {workbook.name}
                                  </span>
                                ))}
                              </div>
                            </TooltipContent>
                          </Tooltip>
                        )}

                        {/* If additionalCount > 0 */}
                        {config.additionalCount > 0 && (
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <span className="bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded-md text-gray-700 text-xs cursor-pointer">
                                +{config.additionalCount} more additional
                              </span>
                            </TooltipTrigger>
                            <TooltipContent className="max-w-xs">
                              <div className="text-xs">
                                <p className="mb-1 font-medium">
                                  Additional Workbooks:
                                </p>
                                <div className="space-y-1">
                                  {Array.from(
                                    { length: config.additionalCount },
                                    (_, i) => (
                                      <div key={i}>
                                        Workbook {config.workbooks.length + i + 1} Ready
                                      </div>
                                    )
                                  )}
                                </div>
                              </div>
                            </TooltipContent>
                          </Tooltip>
                        )}
                      </div>
                    </td>
                    <td className="p-3 border-b text-center">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          router.push(`/wb-config/edit?campaign=${config.campaign_id}`)
                        }
                      >
                        <Pencil className="mr-2 w-4 h-4" />
                        Edit
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </TooltipProvider>
  );
};

export default WorkbookConfigurationPage;
