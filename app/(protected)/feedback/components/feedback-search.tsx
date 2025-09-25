// "use client";
// import { Search, X } from "lucide-react";

// interface FeedbackSearchProps {
//   value: string;
//   onChange: (value: string) => void;
//   placeholder?: string;
// }

// const FeedbackSearch = ({ 
//   value, 
//   onChange, 
//   placeholder = "Search Leads..." 
// }: FeedbackSearchProps) => {
//   const clearSearch = () => {
//     onChange("");
//   };

//   return (
//     <div className="relative">
//       <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
//       <input
//         type="text"
//         value={value}
//         onChange={(e) => onChange(e.target.value)}
//         placeholder={placeholder}
//         className="pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-800 focus:border-blue-800 outline-none w-64"
//       />
//       {value && (
//         <button
//           aria-label="Clear search"
//           onClick={clearSearch}
//           className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
//         >
//           <X className="h-4 w-4" />
//         </button>
//       )}
//     </div>
//   );
// };

// export default FeedbackSearch;
