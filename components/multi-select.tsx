"use client";
import React, { useState, useEffect, useRef } from "react";
import { Check, X, ChevronDown, Search } from "lucide-react";

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
}

const MultiSelect: React.FC<MultiSelectProps> = ({
  value,
  onChange,
  options,
  placeholder = "Select options...",
  isLoading = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // debounce
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearch(search), 400);
    return () => clearTimeout(handler);
  }, [search]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  const filteredOptions = options.filter((o) =>
    o.name.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

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

  const handleDropdownToggle = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setSearch("");
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        className="bg-white px-3 py-2 border border-gray-300 focus-within:border-blue-500 rounded-lg cursor-pointer"
        onClick={handleDropdownToggle}
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
                    className="hover:bg-blue-200 p-0.5 rounded-full"
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
          {/* Search */}
          <div className="flex items-center px-3 py-2 border-b">
            <Search size={14} className="mr-2 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search campaigns..."
              className="flex-1 outline-none text-sm"
              onClick={(e) => e.stopPropagation()} 
            />
          </div>

          {isLoading ? (
            <p className="p-3 text-gray-500 text-sm">Loading...</p>
          ) : filteredOptions.length === 0 ? (
            <p className="p-3 text-gray-500 text-sm">No campaigns found</p>
          ) : (
            filteredOptions.map((option) => (
              <div
                key={option.id}
                className="flex justify-between items-center hover:bg-gray-50 px-3 py-2 cursor-pointer"
                onClick={() => handleToggle(option)}
              >
                <span>{option.name}</span>
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

export default MultiSelect;