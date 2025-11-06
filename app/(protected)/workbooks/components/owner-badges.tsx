import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface OwnerBadgesProps {
  owners: string[];
}

export const OwnerBadges = ({ owners }: OwnerBadgesProps) => {
  const visibleOwners = owners.slice(0, 2);
  const hiddenOwners = owners.slice(2);
  const hasMoreOwners = owners.length > 2;

  return (
    <div className="flex flex-wrap gap-2">
      {visibleOwners.map((owner, idx) => (
        <span
          key={idx}
          className="bg-blue-100 px-2 py-1 rounded-md text-blue-700 text-xs"
        >
          {owner}
        </span>
      ))}

      {hasMoreOwners && (
        <Tooltip>
          <TooltipTrigger asChild>
            <span className="bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded-md text-gray-700 text-xs cursor-pointer">
              +{hiddenOwners.length} more
            </span>
          </TooltipTrigger>
          <TooltipContent className="max-w-xs max-h-80 overflow-y-auto">
            <div className="flex flex-wrap gap-1">
              {hiddenOwners.map((owner, idx) => (
                <span
                  key={idx}
                  className="bg-blue-50 px-2 py-0.5 rounded text-blue-700 text-xs"
                >
                  {owner}
                </span>
              ))}
            </div>
          </TooltipContent>
        </Tooltip>
      )}
    </div>
  );
};
