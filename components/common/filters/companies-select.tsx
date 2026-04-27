import MultiSelect from "@/components/multi-select";
import { useGetCompanies } from "@/hooks/use-companies";

const CompaniesSelect = ({ value, onChange }: any) => {
  const { companiesQuery } = useGetCompanies();
  const { data, isLoading } = companiesQuery;

  // ✅ transform API data
  const companyOptions =
    data?.companies?.map((name: string) => ({
      id: name, // use name as id (since no id exists)
      name: name,
    })) ?? [];

  return (
    <MultiSelect
      options={companyOptions}
      value={companyOptions
        .filter((opt) => value?.includes(opt.name))
        .map((opt) => opt.id)}
      onChange={(selectedIds: string[]) => {
        // ✅ ids → names (same here)
        const selectedCompanies = companyOptions.filter((opt) =>
          selectedIds.includes(opt.id),
        );

        const names = selectedCompanies.map((c) => c.name);

        onChange(names);
      }}
      placeholder="Select Companies"
      width="w-[150px]"
    />
  );
};

export default CompaniesSelect;
