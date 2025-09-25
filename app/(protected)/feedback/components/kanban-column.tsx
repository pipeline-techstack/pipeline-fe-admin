"use client";

import KanbanCard from "./kanban-card";
import { FeedbackItem } from "../types/feedback";

interface KanbanColumnProps {
  id: string;
  title: string;
  items: FeedbackItem[];
  color: string;
  headerColor: string;
  count: number;
}

const KanbanColumn = ({ id, title, items, color, headerColor, count }: KanbanColumnProps) => {
  return (
    <div className={`flex flex-col w-80 min-w-80 border-2 rounded-lg ${color} h-fit max-h-[600px]`}>
      {/* Column Header */}
      <div className={`px-4 py-3 rounded-t-lg ${headerColor} border-b`}>
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-sm">{title}</h3>
          <span className="bg-white px-2 py-1 rounded-full text-xs font-medium">
            {count}
          </span>
        </div>
      </div>

      {/* Column Content */}
      <div className="flex-1 p-3 overflow-y-auto">
        {items.length === 0 ? (
          <div className="text-center text-gray-500 text-sm py-8">
            No items in this stage
          </div>
        ) : (
          <div className="space-y-3">
            {items.map((item) => (
              <KanbanCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default KanbanColumn;