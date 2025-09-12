"use client";
import { useState, useRef, useEffect } from "react";
import { ChevronDown, Calendar } from 'lucide-react';
import { DatePickerProps } from "../types/dashboard";

const DatePicker = ({ 
  selected, 
  onChange, 
  placeholderText 
}: DatePickerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(selected || new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const wrapperRef = useRef<HTMLDivElement>(null);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
    onChange(date);
    setIsOpen(false);
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    for (let i = 0; i < startingDayOfWeek; i++) days.push(null);
    for (let day = 1; day <= daysInMonth; day++) days.push(new Date(year, month, day));
    return days;
  };

  const navigateMonth = (direction: number) => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(currentMonth.getMonth() + direction);
    setCurrentMonth(newMonth);
  };

  const navigateYear = (direction: number) => {
    const newMonth = new Date(currentMonth);
    newMonth.setFullYear(currentMonth.getFullYear() + direction);
    setCurrentMonth(newMonth);
  };

  const isSelectedDate = (date: Date) => date && selectedDate && date.toDateString() === selectedDate.toDateString();
  const isToday = (date: Date) => date && new Date().toDateString() === date.toDateString();

  const days = getDaysInMonth(currentMonth);
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={wrapperRef} className="relative">
      <div 
        className="w-full bg-white border border-gray-300 rounded-md px-3 py-2 pr-8 text-sm cursor-pointer
                   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 flex items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Calendar className="h-4 w-4 text-gray-400 mr-2" />
        <span>{formatDate(selectedDate)}</span>
        <ChevronDown className="absolute right-2 top-2.5 h-4 w-4 text-gray-400 pointer-events-none" />
      </div>
      
      {isOpen && (
        <div className="absolute z-50 mt-1 bg-white border border-gray-300 rounded-md shadow-lg w-80 p-4">
          {/* Calendar Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => navigateYear(-1)}
                className="p-1 hover:bg-gray-100 rounded text-gray-600"
              >
                &#171;
              </button>
              <button
                onClick={() => navigateMonth(-1)}
                className="p-1 hover:bg-gray-100 rounded text-gray-600"
              >
                &#8249;
              </button>
            </div>
            
            <div className="flex items-center space-x-2">
              <span className="font-semibold text-gray-900">
                {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
              </span>
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={() => navigateMonth(1)}
                className="p-1 hover:bg-gray-100 rounded text-gray-600"
              >
                &#8250;
              </button>
              <button
                onClick={() => navigateYear(1)}
                className="p-1 hover:bg-gray-100 rounded text-gray-600"
              >
                &#187;
              </button>
            </div>
          </div>

          {/* Day Names */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {dayNames.map((day) => (
              <div key={day} className="text-center text-xs font-medium text-gray-500 py-2">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Days */}
          <div className="grid grid-cols-7 gap-1">
            {days.map((date, index) => (
              <div key={index} className="text-center">
                {date ? (
                  <button
                    onClick={() => handleDateChange(date)}
                    className={`w-8 h-8 text-sm rounded-full hover:bg-blue-100 ${
                      isSelectedDate(date) 
                        ? 'bg-blue-500 text-white hover:bg-blue-600' 
                        : isToday(date)
                        ? 'bg-blue-100 text-blue-600 font-semibold'
                        : 'text-gray-700'
                    }`}
                  >
                    {date.getDate()}
                  </button>
                ) : (
                  <div className="w-8 h-8"></div>
                )}
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="flex justify-between mt-4 pt-3 border-t border-gray-200">
            <button
              onClick={() => handleDateChange(new Date())}
              className="text-sm text-blue-600 hover:text-blue-800 font-medium"
            >
              Today
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DatePicker;
