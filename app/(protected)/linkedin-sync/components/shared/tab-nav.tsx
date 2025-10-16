"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface TabNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const TabNavigation = ({ activeTab, onTabChange }: TabNavigationProps) => {
  return (
    <Tabs value={activeTab} onValueChange={onTabChange} className="mb-6">
      <TabsList className="bg-gray-50 shadow-sm rounded-lg p-1">
        <TabsTrigger
          value="senders"
          className={`px-6 py-2.5 rounded-md transition-all font-medium ${
            activeTab === "senders"
              ? "bg-[#4A5BAA] text-white shadow-sm"
              : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          LinkedIn Senders
        </TabsTrigger>

        <TabsTrigger
          value="campaigns"
          className={`px-6 py-2.5 rounded-md transition-all font-medium ${
            activeTab === "campaigns"
              ? "bg-[#4A5BAA] text-white shadow-sm"
              : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          Campaign Task
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default TabNavigation;
