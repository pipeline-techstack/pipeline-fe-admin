import DateRangePicker from "../../../app/(protected)/dashboard/components/date-picker";
import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const DateFilter = ({ value, onChange }: any) => {
  const [open, setOpen] = useState(false);

  return (
    <DateRangePicker
      filters={{
        client: [],
        campaign: [],
        dateRange: {
          start: value.start_date,
          end: value.end_date,
        },
      }}
      label=""
      show={open}
      onToggle={() => setOpen((p) => !p)}
      onChange={(range: any) => {
        onChange({
          start_date: range.start,
          end_date: range.end,
        });

        setOpen(false);
      }}
    >
      <Button variant="secondary" onClick={() => setOpen((p) => !p)}>
        <Calendar className="w-4 h-4" />
      </Button>
    </DateRangePicker>
  );
};

export default DateFilter;
