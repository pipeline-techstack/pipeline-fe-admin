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
//       <Search className="top-1/2 left-3 absolute w-4 h-4 text-gray-400 -translate-y-1/2 transform" />
//       <input
//         type="text"
//         value={value}
//         onChange={(e) => onChange(e.target.value)}
//         placeholder={placeholder}
//         className="py-2 pr-10 pl-10 border border-gray-200 focus:border-blue-800 rounded-lg outline-none focus:ring-2 focus:ring-blue-800 w-64"
//       />
//       {value && (
//         <button
//           aria-label="Clear search"
//           onClick={clearSearch}
//           className="top-1/2 right-3 absolute text-gray-400 hover:text-gray-600 -translate-y-1/2 transform"
//         >
//           <X className="w-4 h-4" />
//         </button>
//       )}
//     </div>
//   );
// };

// export default FeedbackSearch;
