"use client";
import React, { useEffect, useState } from "react";
import { Check, X, ChevronDown, Search } from "lucide-react";
import { useCampaigns } from "@/hooks/use-campaigns";
import { Button } from "@/components/ui/button";

const MultiSelect = ({
  value,
  onChange,
  placeholder = "Select options...",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(search);

  // debounce search
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearch(search), 400);
    return () => clearTimeout(handler);
  }, [search]);

  // fetch campaigns based on debounced search
  const { data: options = [], isLoading } = useCampaigns(debouncedSearch);

  const handleToggle = (option) => {
    const newValue = value.includes(option.id)
      ? value.filter((id) => id !== option.id)
      : [...value, option.id];
    onChange(newValue);
  };

  const handleRemove = (id, e) => {
    e.stopPropagation();
    onChange(value.filter((item) => item !== id));
  };

  return (
    <div className="relative">
      <div
        className="bg-white px-3 py-2 border border-gray-300 focus-within:border-blue-500 rounded-lg focus-within:ring-2 focus-within:ring-blue-500 min-h-[42px] transition-all duration-200 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex flex-wrap items-center gap-1">
          {value.length === 0 ? (
            <span className="text-gray-500">{placeholder}</span>
          ) : (
            value.map((id) => {
              const campaign = options.find((c) => c.id === id);
              return (
                <span
                  key={id}
                  className="inline-flex items-center gap-1 bg-blue-100 px-2 py-1 rounded-md font-medium text-blue-800 text-sm"
                >
                  {campaign?.name || id}
                  <button
                    type="button"
                    onClick={(e) => handleRemove(id, e)}
                    className="hover:bg-blue-200 p-0.5 rounded-full transition-colors"
                  >
                    <X size={12} />
                  </button>
                </span>
              );
            })
          )}
          <ChevronDown
            size={16}
            className={`ml-auto text-gray-400 transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </div>
      </div>

      {isOpen && (
        <div className="z-10 absolute bg-white shadow-lg mt-1 border border-gray-300 rounded-lg w-full max-h-72 overflow-auto">
          {/* Search box */}
          <div className="flex items-center px-3 py-2 border-gray-200 border-b">
            <Search size={14} className="mr-2 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search campaigns..."
              className="flex-1 border-none outline-none focus:ring-0 text-sm"
            />
          </div>

          {isLoading ? (
            <p className="p-3 text-gray-500 text-sm">Loading...</p>
          ) : options.length === 0 ? (
            <p className="p-3 text-gray-500 text-sm">No campaigns found</p>
          ) : (
            options.map((option) => (
              <div
                key={option.id}
                className="flex justify-between items-center hover:bg-gray-50 px-3 py-2 transition-colors cursor-pointer"
                onClick={() => handleToggle(option)}
              >
                <span className="text-gray-900">{option.name}</span>
                {value.includes(option.id) && (
                  <Check size={16} className="text-blue-600" />
                )}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

const PermissionsPage = () => {
  const [email, setEmail] = useState("");
  const [selectedCampaigns, setSelectedCampaigns] = useState<number[]>([]);
  const { data: campaigns, isLoading, isError } = useCampaigns("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Campaign IDs:", selectedCampaigns);
  };

  return (
    <div className="bg-gray-50 px-4 py-8">
      <div className="mx-auto">
        <div className="bg-white p-8 rounded-xl">
          <h2 className="mb-2 font-bold text-gray-900 text-2xl">
            Assign Campaigns
          </h2>

          {/* Email input */}
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg w-full"
            placeholder="Enter user email address"
          />

          {/* Campaigns */}
          <div className="mt-6">
            <label className="block font-semibold text-gray-700 text-sm">
              Select Campaigns *
            </label>
            {isLoading && <p className="text-gray-500">Loading campaigns...</p>}
            {isError && (
              <p className="text-red-500">Failed to load campaigns</p>
            )}
            {campaigns && (
              <MultiSelect
                options={campaigns}
                value={selectedCampaigns}
                onChange={setSelectedCampaigns}
                placeholder="Choose campaigns..."
              />
            )}
          </div>

          {/* Submit */}
          <Button
            type="submit"
            disabled={!email || selectedCampaigns.length === 0}
            onClick={handleSubmit}
            className="mt-4 w-full"
          >
            Save Permissions
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PermissionsPage;
