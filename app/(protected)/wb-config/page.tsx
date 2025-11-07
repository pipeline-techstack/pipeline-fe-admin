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
import PageHeader from "@/components/ui/page-header";

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
      <div className="p-6 mx-auto max-w-7xl">
        <div className="flex justify-between items-start mb-6">
          <PageHeader
            title="Workbook Configuration"
            subtitle="Manage user and campaign permissions"
          />
          
          <Button 
            className="bg-zinc-800 hover:bg-zinc-700" 
            onClick={() => router.push("/wb-config/new")}
          >
            New Configuration
          </Button>
        </div>

        {isLoading ? (
          <p className="text-gray-500 text-sm">Loading workbook configurations...</p>
        ) : error ? (
          <p className="text-red-500 text-sm">{error}</p>
        ) : workbookConfigurations.length === 0 ? (
          <p className="text-gray-500 text-sm">No workbook configurations found</p>
        ) : (
          <div className="bg-white shadow-sm border border-gray-200 rounded-lg overflow-hidden">
            <div className="max-h-[600px] overflow-y-auto">
              <table className="w-full border-collapse">
                <thead className="top-0 z-10 sticky bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 font-semibold text-gray-900 text-left text-sm">
                      Campaigns
                    </th>
                    <th className="px-6 py-3 font-semibold text-gray-900 text-left text-sm">
                      Workbooks
                    </th>
                    <th className="px-6 py-3 font-semibold text-gray-900 text-center text-sm">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {workbookConfigurations.map((config) => (
                    <tr
                      key={config.campaign_id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <span className="font-medium text-gray-900 text-sm">
                          {config.campaign}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-2">
                          {config.workbooks.slice(0, 2).map((workbook) => (
                            <span
                              key={workbook.id}
                              className="bg-blue-100 px-2 py-1 rounded-md text-blue-700 text-xs"
                            >
                              {workbook.name}
                            </span>
                          ))}

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
                                      className="bg-blue-50 px-2 py-0.5 rounded text-blue-700 text-xs"
                                    >
                                      {workbook.name}
                                    </span>
                                  ))}
                                </div>
                              </TooltipContent>
                            </Tooltip>
                          )}

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
                      <td className="px-6 py-4 text-center">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() =>
                            router.push(`/wb-config/edit?campaign=${config.campaign_id}`)
                          }
                        >
                          Edit
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </TooltipProvider>
  );
};
export default WorkbookConfigurationPage;