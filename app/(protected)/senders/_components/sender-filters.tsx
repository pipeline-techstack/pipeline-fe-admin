import { Input } from "@/components/ui/input";
import DateFilter from "../../../../components/common/filters/date-filter";
import { Button } from "@/components/ui/button";
import { Check, Search, X } from "lucide-react";
import { useEffect, useState } from "react";
import CampaignSelect from "@/components/common/filters/campaigns-select";
import CompaniesSelect from "@/components/common/filters/companies-select";
import { TooltipWrapper } from "@/components/common/tooltip-wrapper";

const INITIAL_FILTERS = {
  sender_name: "",
  companies: [],
  campaigns: [],
  start_date: "",
  end_date: "",
};

export function SenderFilters({ filters, onChange }: any) {
  const [localFilters, setLocalFilters] = useState(INITIAL_FILTERS);

  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  return (
    <div className="flex justify-between gap-3">
      <div className="flex gap-2 w-full">
        <div className="flex items-center gap-2 px-3 border rounded-md focus-within:ring-2 focus-within:ring-ring w-[250px] h-10">
          <Search className="size-4 text-muted-foreground" />
          <Input
            placeholder="Search Senders..."
            className="shadow-none p-0 border-0 border-none focus:border-none outline-none focus:outline-none focus-visible:ring-0 h-full"
            value={localFilters.sender_name}
            onChange={(e) =>
              setLocalFilters({
                ...localFilters,
                sender_name: e.target.value,
              })
            }
          />
        </div>

        <CompaniesSelect
          value={localFilters.companies}
          onChange={(companies: string[]) =>
            setLocalFilters({
              ...localFilters,
              companies,
            })
          }
        />

        <CampaignSelect
          value={localFilters.campaigns}
          onChange={(campaigns: string[]) =>
            setLocalFilters({
              ...localFilters,
              campaigns,
            })
          }
        />
        <DateFilter
          value={{
            start_date: localFilters.start_date,
            end_date: localFilters.end_date,
          }}
          onChange={({ start_date, end_date }: any) =>
            setLocalFilters({
              ...localFilters,
              start_date,
              end_date,
            })
          }
        />
      </div>

      <div className="flex border rounded-md">
        <TooltipWrapper content="Apply">
          <Button
            variant={"ghost"}
            size={"icon"}
            onClick={() => onChange(localFilters)}
            className="hover:bg-green-500/30 rounded-tr-none rounded-br-none"
          >
            <Check className="size-4" />
          </Button>
        </TooltipWrapper>

        <div className="border-r"></div>
        <TooltipWrapper content="Clear">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              setLocalFilters(INITIAL_FILTERS);
              onChange(INITIAL_FILTERS); // 👈 triggers API
            }}
            className="hover:bg-red-500/30 rounded-tl-none rounded-bl-none"
          >
            <X className="size-4" />
          </Button>
        </TooltipWrapper>
      </div>
    </div>
  );
}
