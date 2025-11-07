import { Search } from "lucide-react";

interface WorkbookSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export const WorkbookSearch = ({ value, onChange }: WorkbookSearchProps) => {
  return (
    <div className="relative w-64">
      <Search className="top-2.5 left-3 absolute w-5 h-5 text-gray-400" />
      <input
        type="text"
        placeholder="Search workbooks..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="py-2 pr-4 pl-10 border border-gray-300 rounded-md w-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
  );
};