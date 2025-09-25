// import React, { useState } from "react";
// import { ListFilter, Calendar } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
// import {
//   DateRangePicker as ReactDateRangePicker,
//   Range,
// } from "react-date-range";
// import AsyncMultiSelect from "@/components/common/multiselect-wrapper";
// import { SelectOption } from "@/lib/types/misc";
// import "react-date-range/dist/styles.css";
// import "react-date-range/dist/theme/default.css";
// import { getCampaignsApi } from "@/lib/api";

// export interface FeedbackFilters {
//   status: 'all' | 'responded' | 'follow-up';
//   responded?: boolean;
//   // sent?: boolean;
//   campaign: boolean;
//   dateOfMeeting: boolean;
//   dateOfMeetingRange?: {
//     start: string;
//     end: string;
//   };
//   selectedCampaigns?: SelectOption[];
// }


// interface FeedbackFilterButtonProps {
//   filter: FeedbackFilters;
//   setFilter: React.Dispatch<React.SetStateAction<FeedbackFilters>>;
// }

// const FilterButton: React.FC<FeedbackFilterButtonProps> = ({
//   filter,
//   setFilter,
// }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [campaignOptions, setCampaignOptions] = useState<SelectOption[]>([]);

//   // keep pending filters in local state
//   const [pendingCampaigns, setPendingCampaigns] = useState<SelectOption[]>(
//     filter.selectedCampaigns || []
//   );
//   const [pendingDateRange, setPendingDateRange] = useState<Range>({
//     startDate: filter.dateOfMeetingRange?.start
//       ? new Date(filter.dateOfMeetingRange.start)
//       : new Date(),
//     endDate: filter.dateOfMeetingRange?.end
//       ? new Date(filter.dateOfMeetingRange.end)
//       : new Date(),
//     key: "selection",
//   });

//   const [showDateOfMeetingPicker, setShowDateOfMeetingPicker] = useState(false);

//   const formatDate = (date: Date) =>
//     `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(
//       date.getDate()
//     ).padStart(2, "0")}`;

//   const handleMeetingDateSelect = (ranges: { [key: string]: Range }) => {
//     const range = ranges.selection;
//     setPendingDateRange(range);
//   };

//   const applyFilters = () => {
//     setFilter({
//       ...filter,
//       selectedCampaigns: pendingCampaigns,
//       dateOfMeetingRange: {
//         start: pendingDateRange.startDate ? formatDate(pendingDateRange.startDate) : "",
//         end: pendingDateRange.endDate ? formatDate(pendingDateRange.endDate) : "",
//       },
//     });
//     setIsOpen(false);
//   };

//   const clearFilters = () => {
//     setFilter({
//       ...filter,
//       selectedCampaigns: [],
//       dateOfMeetingRange: { start: "", end: "" },
//     });
//     setPendingCampaigns([]);
//     setPendingDateRange({
//       startDate: new Date(),
//       endDate: new Date(),
//       key: "selection",
//     });
//   };

// const hasActiveFilters =
//   (filter.selectedCampaigns?.length ?? 0) > 0 ||
//   (!!filter.dateOfMeetingRange?.start && !!filter.dateOfMeetingRange?.end);

//   return (
//     <Popover open={isOpen} onOpenChange={setIsOpen}>
//       <PopoverTrigger asChild>
//         <Button
//           variant="outline"
//           size="sm"
//           className={`relative ${hasActiveFilters ? "border-blue-600" : ""}`}
//         >
//           <ListFilter className="w-4 h-4" />
//           {hasActiveFilters && (
//             <div className="-top-1 -right-1 absolute bg-blue-600 rounded-full w-2 h-2" />
//           )}
//         </Button>
//       </PopoverTrigger>

//       <PopoverContent align="start" side="bottom" className="mt-2 p-0 w-80 -translate-x-6">
//         <div className="space-y-4 p-4">
//           {/* Campaigns */}
//           <div className="space-y-2">
//             <div className="font-medium text-gray-700 text-sm">Campaigns</div>
//             <AsyncMultiSelect
//               label=""
//               queryKey={["campaigns"]}
//               queryFn={getCampaignsApi}
//               selected={pendingCampaigns}
//               onChange={setPendingCampaigns}
//               enabled={isOpen}
//               onOptionsLoad={setCampaignOptions}
//             />
//           </div>

//           {/* Date */}
//           <div className="space-y-2">
//             <div className="font-medium text-gray-700 text-sm">Date of Meeting</div>
//             <div
//               className="flex justify-between items-center bg-white px-3 py-2 border border-gray-300 hover:border-gray-400 rounded-md text-sm transition-colors cursor-pointer"
//               onClick={() => setShowDateOfMeetingPicker(!showDateOfMeetingPicker)}
//             >
//               <span className="text-xs truncate">
//                 {pendingDateRange.startDate
//                   ? formatDate(pendingDateRange.startDate)
//                   : "Start"}{" "}
//                 –{" "}
//                 {pendingDateRange.endDate
//                   ? formatDate(pendingDateRange.endDate)
//                   : "End"}
//               </span>
//               <Calendar className="ml-2 w-4 h-4 text-gray-500" />
//             </div>

//             {showDateOfMeetingPicker && (
//               <div className="-top-32 right-80 z-30 absolute bg-white shadow-lg mt-2 border border-gray-200 rounded-lg min-w-[20rem] max-w-[calc(100vw-2rem)] overflow-auto">
//                 <ReactDateRangePicker
//                   ranges={[pendingDateRange]}
//                   onChange={handleMeetingDateSelect}
//                   showSelectionPreview
//                   moveRangeOnFirstSelection={false}
//                   months={1}
//                   direction="horizontal"
//                   className="border-0"
//                 />
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Footer */}
//         <div className="flex gap-2 p-4 pt-0">
//           <Button variant="outline" size="sm" onClick={clearFilters} className="flex-1">
//             Clear
//           </Button>
//           <Button
//             size="sm"
//             onClick={applyFilters}
//             className="flex-1 bg-[#4A5BAA]/80 hover:bg-[#4A5BAA]"
//           >
//             Apply
//           </Button>
//         </div>
//       </PopoverContent>
//     </Popover>
//   );
// };


// export default FilterButton;
