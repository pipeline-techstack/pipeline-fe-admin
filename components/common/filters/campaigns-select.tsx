import MultiSelect from "@/components/multi-select";
import { useHeyreach } from "@/hooks/use-heyreach";

const CampaignSelect = ({ value, onChange }: any) => {
  const { campaignsQuery } = useHeyreach({ enableCampaigns: true });
  const { data: campaigns = [], isLoading } = campaignsQuery;

  const campaignOptions =
    campaigns?.map((c: any) => ({
      id: c.id?.toString(),
      name: c.name || `Campaign #${c.id}`,
    })) ?? [];

  return (
    <MultiSelect
      options={campaignOptions}
      value={
        // convert names → ids for MultiSelect
        campaignOptions
          .filter((opt) => value?.includes(opt.name))
          .map((opt) => opt.id)
      }
      onChange={(selectedIds: string[]) => {
        // convert ids → names for API
        const selectedCampaigns = campaignOptions.filter((opt) =>
          selectedIds.includes(opt.id)
        );

        const names = selectedCampaigns.map((c) => c.name);

        onChange(names);
      }}
      placeholder="Select Campaigns"
    />
  );
};

export default CampaignSelect;