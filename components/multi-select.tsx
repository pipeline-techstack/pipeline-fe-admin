"use client";
import React, { useState, useEffect, useRef } from "react";
import { Check, X, ChevronDown, Search } from "lucide-react";
import { Button } from "./ui/button";

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

  const selectedOptions = options.filter(option => value.includes(option.id));

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

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange([]);
  };

  const handleDropdownToggle = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setSearch("");
    }
  };

  const getDisplayText = () => {
    if (value.length === 0) return placeholder;
    if (value.length === 1) return selectedOptions[0]?.name || '';
    return `${value.length} selected`;
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Main trigger button */}
      <button
        type="button"
        onClick={handleDropdownToggle}
        className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2.5 text-left text-sm
                   hover:border-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500
                   transition-colors duration-200 flex items-center justify-between min-h-[42px]"
      >
        <span className={`flex-1 truncate ${value.length === 0 ? 'text-gray-500' : 'text-gray-900'}`}>
          {getDisplayText()}
        </span>
        <div className="flex items-center gap-2 ml-2">
          {value.length > 0 && (
            <Button
              type="button"
              onClick={handleClear}
              className="p-0.5 h-auto hover:bg-gray-100 rounded-full transition-colors bg-transparent border-0 shadow-none"
            >
              <X className="h-3.5 w-3.5 text-gray-400" />
            </Button>
          )}
          <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform duration-200 flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
        </div>
      </button>

      {/* Selected items tags - only show if multiple selected */}
      {value.length > 1 && (
        <div className="flex flex-wrap gap-1 mt-2">
          {selectedOptions.slice(0, 3).map((option) => (
            <span
              key={option.id}
              className="inline-flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-md"
            >
              <span className="max-w-[120px] truncate">{option.name}</span>
              <button
                type="button"
                onClick={(e) => handleRemove(option.id, e)}
                className="p-0.5 hover:bg-blue-200 rounded-full transition-colors ml-1 flex-shrink-0"
                title={`Remove ${option.name}`}
              >
                <X className="h-3 w-3 text-blue-600 hover:text-blue-800" />
              </button>
            </span>
          ))}
          {selectedOptions.length > 3 && (
            <span className="inline-flex items-center px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-md">
              +{selectedOptions.length - 3} more
            </span>
          )}
        </div>
      )}

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-80 overflow-hidden">
          {/* Search input */}
          <div className="p-3 border-b border-gray-100">
            <div className="flex items-center">
              <Search size={14} className="mr-2 text-gray-400 flex-shrink-0" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search..."
                className="w-full text-sm outline-none focus:outline-none"
                onClick={(e) => e.stopPropagation()}
                autoFocus
              />
            </div>
          </div>

          {/* Options list */}
          <div className="max-h-60 overflow-y-auto">
            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
              </div>
            ) : filteredOptions.length === 0 ? (
              <div className="px-3 py-8 text-center text-sm text-gray-500">
                {search ? 'No options found' : 'No options available'}
              </div>
            ) : (
              filteredOptions.map((option) => {
                const isSelected = value.includes(option.id);
                return (
                  <button
                    key={option.id}
                    onClick={() => handleToggle(option)}
                    className="w-full px-3 py-2.5 text-left text-sm hover:bg-gray-50 flex items-center justify-between group transition-colors"
                  >
                    <span className={`flex-1 truncate ${isSelected ? 'font-medium text-blue-700' : 'text-gray-900'}`}>
                      {option.name}
                    </span>
                    {isSelected && (
                      <Check className="h-4 w-4 text-blue-600 flex-shrink-0 ml-2" />
                    )}
                  </button>
                );
              })
            )}
          </div>

          {/* Selected count footer */}
          {value.length > 0 && (
            <div className="px-3 py-2 bg-gray-50 border-t border-gray-100 text-xs text-gray-600">
              {value.length} item{value.length !== 1 ? 's' : ''} selected
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MultiSelect;