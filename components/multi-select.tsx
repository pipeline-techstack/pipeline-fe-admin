"use client";
import React, { useState, useEffect, useRef } from "react";
import { Check, X, ChevronDown, Search } from "lucide-react";
import { createPortal } from "react-dom";

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
  const [dropdownStyles, setDropdownStyles] = useState<React.CSSProperties>({});
  const portalRef = useRef<HTMLDivElement>(null);

  // debounce
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearch(search), 400);
    return () => clearTimeout(handler);
  }, [search]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        portalRef.current &&
        !portalRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsOpen(false);
    window.addEventListener("scroll", handleScroll, true);
    return () => window.removeEventListener("scroll", handleScroll, true);
  }, []);

  const filteredOptions = options.filter((o) =>
    o.name.toLowerCase().includes(debouncedSearch.toLowerCase()),
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

  const handleDropdownToggle = () => {
    if (!isOpen && dropdownRef.current) {
      const rect = dropdownRef.current.getBoundingClientRect();

      setDropdownStyles({
        position: "absolute",
        top: rect.bottom + window.scrollY + 4,
        left: rect.left + window.scrollX,
        width: rect.width,
        zIndex: 9999,
      });
    }

    setIsOpen(!isOpen);
    if (!isOpen) setSearch("");
  };

  const handleSelectAllToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (allFilteredSelected) {
      // Deselect all filtered
      const remaining = value.filter(
        (id) => !filteredOptions.some((o) => o.id === id),
      );
      onChange(remaining);
    } else {
      // Select all filtered
      const newIds = Array.from(
        new Set([...value, ...filteredOptions.map((o) => o.id)]),
      );
      onChange(newIds);
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
                  className="inline-flex items-center gap-1 bg-blue-50 px-2 py-1 border border-blue-200 rounded-full text-blue-700 text-sm"
                >
                  {campaign?.name || id}
                  <button
                    type="button"
                    aria-label="Remove"
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

      {isOpen &&
        createPortal(
          <div
            ref={portalRef} 
            style={dropdownStyles}
            className="bg-white shadow-lg border border-gray-300 rounded-lg max-h-72 overflow-auto"
          >
            {/* Search + Select All toggle */}
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
          </div>,
          document.body,
        )}
    </div>
  );
};

export default MultiSelect;
