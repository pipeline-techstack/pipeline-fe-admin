import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";

const DateFilter = () => {
  return (
    <Select>
      <SelectTrigger className="w-[150px]">
        <SelectValue placeholder="All Time" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All Time</SelectItem>
        <SelectItem value="7">Last 7 days</SelectItem>
        <SelectItem value="30">Last 30 days</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default DateFilter;
