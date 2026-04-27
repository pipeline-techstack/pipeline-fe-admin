import { Input } from "@/components/ui/input";
import DateFilter from "../../../../components/common/filters/date-filter";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import { useEffect, useState } from "react";
import CampaignSelect from "@/components/common/filters/campaigns-select";
import CompaniesSelect from "@/components/common/filters/companies-select";

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
      <Input
        placeholder="Search Senders..."
        className="flex-1 h-10"
        value={localFilters.sender_name}
        onChange={(e) =>
          setLocalFilters({
            ...localFilters,
            sender_name: e.target.value,
          })
        }
      />

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

      <div className="flex border rounded-md">
        <Button
          variant={"ghost"}
          size={"icon"}
          onClick={() => onChange(localFilters)}
          className="hover:bg-green-500/30 rounded-tr-none rounded-br-none"
        >
          <Check className="size-4" />
        </Button>
        <div className="border-r"></div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setLocalFilters(INITIAL_FILTERS)}
              className="hover:bg-red-500/30 rounded-tl-none rounded-bl-none"
        >
          <X className="size-4" />
        </Button>
      </div>
    </div>
  );
}
