import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import DateFilter from "./date-filter"

export function SenderFilters() {
  return (
    <div className="flex justify-between gap-3">
      <Input placeholder="Search Senders..." className="flex-1 h-10" />

      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="All Companies" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Companies</SelectItem>
          <SelectItem value="acme">Acme corp</SelectItem>
          <SelectItem value="hitashi">Hitashi</SelectItem>
        </SelectContent>
      </Select>

      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="All Campaigns" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Campaigns</SelectItem>
        </SelectContent>
      </Select>

      <DateFilter />
    </div>
  )
}