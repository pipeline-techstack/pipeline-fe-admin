// "use client";
// import { useState } from "react";
// import FeedbackCard from "./feedback-card";
// import LeadDetailModal from "./lead-detail-modal";
// import { FeedbackLead } from "../types/feedback";

// interface FeedbackGridProps {
//   data: FeedbackLead[];
//   isLoading: boolean;
// }

// const FeedbackGrid = ({ data, isLoading }: FeedbackGridProps) => {
//   const [selectedLead, setSelectedLead] = useState<FeedbackLead | null>(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const handleCardClick = (lead: FeedbackLead) => {
//     setSelectedLead(lead);
//     setIsModalOpen(true);
//   };

//   const handleModalClose = () => {
//     setIsModalOpen(false);
//     setSelectedLead(null);
//   };

//   if (isLoading) {
//     return (
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
//         {[...Array(8)].map((_, index) => (
//           <div key={index} className="bg-white rounded-lg border border-gray-200 p-4 animate-pulse">
//             <div className="flex items-start justify-between mb-3">
//               <div className="flex items-center space-x-3">
//                 <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
//                 <div className="flex-1">
//                   <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
//                   <div className="h-3 bg-gray-300 rounded w-1/2"></div>
//                 </div>
//               </div>
//               <div className="h-3 bg-gray-300 rounded w-12"></div>
//             </div>
//             <div className="h-6 bg-gray-300 rounded w-20"></div>
//           </div>
//         ))}
//       </div>
//     );
//   }

//   if (data.length === 0) {
//     return (
//       <div className="text-center py-12">
//         <div className="text-gray-500 text-lg mb-2">No feedback found</div>
//         <div className="text-gray-400 text-sm">Try adjusting your filters or search query</div>
//       </div>
//     );
//   }

//   return (
//     <>
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
//         {data.map((lead) => (
//           <FeedbackCard 
//             key={lead.id} 
//             lead={lead} 
//             onClick={handleCardClick}
//           />
//         ))}
//       </div>

//       {/* Lead Detail Modal */}
//       <LeadDetailModal
//         lead={selectedLead}
//         isOpen={isModalOpen}
//         onClose={handleModalClose}
//       />
//     </>
//   );
// };

// export default FeedbackGrid;