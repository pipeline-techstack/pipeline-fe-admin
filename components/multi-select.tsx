"use client";

import React, { useState, useEffect } from "react";
import { Check, X, ChevronDown, Search } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface Option {
  id: string;
  name: string;
}

interface MultiSelectProps {
  value: string[];
  onChange: (value: string[]) => void;
  options: Option[];
  placeholder?: string;
  isLoading?: boolean;
  width?: string;
}

const MultiSelect: React.FC<MultiSelectProps> = ({
  value,
  onChange,
  options,
  placeholder = "Select options...",
  isLoading = false,
  width = "w-[250px]",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(search);

  // debounce
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearch(search), 400);
    return () => clearTimeout(handler);
  }, [search]);

  const filteredOptions = options.filter((o) =>
    o.name.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

  const allFilteredSelected =
    filteredOptions.length > 0 &&
    filteredOptions.every((o) => value.includes(o.id));

  const handleToggle = (option: Option) => {
    const newValue = value.includes(option.id)
      ? value.filter((id) => id !== option.id)
      : [...value, option.id];

    onChange(newValue);
  };

  const handleRemove = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(value.filter((item) => item !== id));
  };

  const handleSelectAllToggle = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (allFilteredSelected) {
      const remaining = value.filter(
        (id) => !filteredOptions.some((o) => o.id === id)
      );
      onChange(remaining);
    } else {
      const newIds = Array.from(
        new Set([...value, ...filteredOptions.map((o) => o.id)])
      );
      onChange(newIds);
    }
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <div
          className={`flex items-center bg-white px-2 border border-gray-200 focus-within:border-blue-500 rounded-lg h-10 overflow-hidden cursor-pointer ${width}`}
        >
          <div className="flex items-center gap-1 w-full overflow-hidden whitespace-nowrap">
            {value.length === 0 ? (
              <span className="text-muted-foreground text-sm">
                {placeholder}
              </span>
            ) : (
              value.map((id) => {
                const option = options.find((c) => c.id === id);
                return (
                  <span
                    key={id}
                    className="inline-flex flex-shrink-0 items-center gap-1 bg-blue-50 px-2 py-0.5 border border-blue-200 rounded-full max-w-[120px] text-blue-700 text-sm"
                  >
                    <span className="truncate">
                      {option?.name || id}
                    </span>
                    <button
                      type="button"
                      onClick={(e) => handleRemove(id, e)}
                      className="hover:bg-blue-100 p-0.5 rounded-full"
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
      </PopoverTrigger>

      <PopoverContent
        className="p-0 w-[--radix-popover-trigger-width]"
        align="start"
      >
        {/* Search + Select All */}
        <div className="flex items-center gap-2 px-3 py-2 border-b">
          <Search size={14} className="text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search..."
            className="flex-1 outline-none text-sm"
          />
          <button
            type="button"
            onClick={handleSelectAllToggle}
            className="font-medium text-blue-600 text-xs hover:underline whitespace-nowrap"
          >
            {allFilteredSelected ? "Deselect All" : "Select All"}
          </button>
        </div>

        {/* Options */}
        <div className="max-h-72 overflow-y-auto">
          {isLoading ? (
            <p className="p-3 text-gray-500 text-sm">Loading...</p>
          ) : filteredOptions.length === 0 ? (
            <p className="p-3 text-gray-500 text-sm">
              No options found
            </p>
          ) : (
            filteredOptions.map((option) => (
              <div
                key={option.id}
                className="flex justify-between items-center hover:bg-gray-50 px-3 py-2 cursor-pointer"
                onClick={() => handleToggle(option)}
              >
                <span className="text-secondary-foreground text-sm">
                  {option.name}
                </span>

                {value.includes(option.id) && (
                  <Check size={16} className="text-blue-600" />
                )}
              </div>
            ))
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default MultiSelect;