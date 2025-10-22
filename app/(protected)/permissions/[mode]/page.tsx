"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Check, ChevronsUpDown } from "lucide-react";
import MultiSelect from "@/components/multi-select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useHeyreach } from "@/hooks/use-heyreach";
import { assignCampaignsApi, getUserCampaigns } from "@/services/heyreach-apis";
import { useCustomerSearch } from "@/hooks/use-customers";

const CampaignFormPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { campaignsQuery } = useHeyreach({ enableCampaigns: true });
  const { data: campaigns = [] } = campaignsQuery;

  const mode = pathname.includes("edit") ? "edit" : "new";

  const { customers, isLoading: customersLoading } = useCustomerSearch();

  const [email, setEmail] = useState("");
  const [selectedCampaigns, setSelectedCampaigns] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  const campaignOptions = Array.isArray(campaigns)
    ? campaigns.map((campaign) => ({
        ...campaign,
        id: String(campaign.id),
      }))
    : Object.entries(campaigns || {}).map(([id, name]) => ({
        id,
        name: String(name),
      }));

  // 🔹 Fetch user campaigns in edit mode
  useEffect(() => {
    const fetchUserData = async () => {
      const emailFromQuery = searchParams.get("email");
      if (mode === "edit" && emailFromQuery) {
        setLoading(true);
        try {
          const data = await getUserCampaigns({ email: emailFromQuery });
          setEmail(data.email);

          // Normalize campaigns: object → array of IDs
          const campaignIds = Object.keys(data.heyreach?.campaigns || {});
          setSelectedCampaigns(campaignIds);
        } catch (err: any) {
          console.error("Failed to fetch user campaigns", err);
          setError(
            err.detail || "Failed to fetch user campaigns. Please try again."
          );
        } finally {
          setLoading(false);
        }
      }
    };
    fetchUserData();
  }, [mode, searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await assignCampaignsApi({ email, campaign_ids: selectedCampaigns });
      alert("Permissions saved successfully");
    } catch (err: any) {
      console.error(err);
      alert("Failed to save permissions");
    } finally {
      setSaving(false);
    }
  };

  const selectedCustomer = customers.find(
    (customer: any) => customer.email === email
  );

  return (
    <div className="bg-gray-50 px-4 py-8">
      <div className="bg-white shadow-sm mx-auto p-8 rounded-xl max-w-2xl">
        <h2 className="mb-4 font-bold text-gray-900 text-2xl">
          {mode === "edit" ? "Edit Campaigns" : "Assign Campaigns"}
        </h2>

        {loading ? (
          <p className="text-gray-500">Loading user data...</p>
        ) : error ? (
          <p className="font-semibold text-red-500">{error}</p>
        ) : (
          <form onSubmit={handleSubmit}>
            {/* Email */}
            <div className="space-y-2">
              <label className="block font-semibold text-gray-700 text-sm">
                Email *
              </label>
              {mode === "edit" ? (
                <Input
                  type="email"
                  required
                  value={email}
                  disabled
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-gray-50"
                />
              ) : (
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={open}
                      className="justify-between w-full font-normal"
                    >
                      {selectedCustomer ? (
                        <span className="truncate">
                          {selectedCustomer.email}
                        </span>
                      ) : (
                        <span className="text-muted-foreground">
                          Select user email...
                        </span>
                      )}
                      <ChevronsUpDown className="opacity-50 ml-2 w-4 h-4 shrink-0" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    align="start"
                    className="p-0 w-[--radix-popover-trigger-width]"
                  >
                    <Command>
                      <CommandInput
                        placeholder="Search users..."
                        className="h-9"
                      />
                      <CommandList>
                        <CommandEmpty>
                          {customersLoading ? "Loading..." : "No users found."}
                        </CommandEmpty>
                        <CommandGroup>
                          {customers.map((customer: any) => (
                            <CommandItem
                              key={customer.userId}
                              value={`${customer.email} ${customer.firstName} ${customer.lastName}`}
                              onSelect={() => {
                                setEmail(customer.email);
                                setOpen(false);
                              }}
                              className="flex justify-between items-center w-full"
                            >
                              <div className="flex flex-col">
                                <span className="font-medium">
                                  {customer.email}
                                </span>
                                <span className="text-muted-foreground text-sm">
                                  {customer.firstName} {customer.lastName}
                                </span>
                              </div>
                              <Check
                                className={cn(
                                  "ml-auto w-4 h-4",
                                  email === customer.email
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              )}
            </div>

            {/* Campaigns */}
            <div className="space-y-2 mt-6">
              <label className="block font-semibold text-gray-700 text-sm">
                Select Campaigns *
              </label>
              <MultiSelect
                options={campaignOptions}
                value={selectedCampaigns}
                onChange={setSelectedCampaigns}
                placeholder="Choose campaigns..."
              />
            </div>

            {/* Actions */}
            <div className="flex justify-center gap-3 mt-8">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/permissions")}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={!email || selectedCampaigns.length === 0 || saving}
              >
                {saving ? "Saving..." : "Save Permissions"}
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default CampaignFormPage;
