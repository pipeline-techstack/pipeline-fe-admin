import { useState, useMemo } from "react";
import {
  categoryConfigurations,
  dashboardData,
} from "../components/dashboard-data";
import { DashboardFilters } from "../components/filters-section";
import { getDashboardMetrics } from "@/services/dashboard-apis";
import { useQuery } from "@tanstack/react-query";

type ApiCampaign = {
  campaign_id: number;
  campaign_name: string;
  target_leads: number | null;
  delivered_leads_total?: number; // some APIs only return it in daily
  total_qualified_prospects?: number; // 👈 added this
  avg_response_time_min?: number | null;
  avg_speed_to_meeting_booked_min?: number | null;
  daily: {
    date: string;
    delivered_leads_total?: number;
    hr_api: {
      connectionsSent?: number;
      connectionsAccepted?: number;
      totalMessageReplies?: number;
    };
    internal_raw?: {
      positive_replies?: { total?: number };
      meetings?: {
        meeting_booked_count?: number;
        attended_count?: number;
      };
      avg_response_time_min?: number | null;
      avg_speed_to_meeting_booked_min?: number | null;
    };
    computed?: {
      burn_rate_avg_per_day?: number;
      days_until_depletion?: number;
    };
  }[];
  range_totals: {
    connectionsSent?: number;
    connectionsAccepted?: number;
    messagesSent?: number;
    messageReplies?: number;
    meeting_booked_count?: number;
    attended_count?: number;
  };
};

export const useDashboardFilters = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [filters, setFilters] = useState<DashboardFilters>({
    client: [],
    campaign: [],
    dateRange: { start: "", end: "" },
  });

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
    console.log("Selected date:", date);
  };

  // const handleFilterChange = (filterType: string, value: string) => {
  //   setFilters(prev => ({
  //     ...prev,
  //     [filterType]: value
  //   }));
  //   console.log(`${filterType} filter changed to:`, value);
  // };

  const handleFilterChange = <K extends keyof DashboardFilters>(
    filterType: K,
    value: DashboardFilters[K]
  ) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
  };

  return {
    selectedDate,
    filters,
    handleDateChange,
    handleFilterChange,
  };
};

export const useDashboardNavigation = () => {
  const [activeTable, setActiveTable] = useState("pipeline");
  const [activeCategory, setActiveCategory] = useState("performance");

  return {
    activeTable,
    activeCategory,
    setActiveTable,
    setActiveCategory,
  };
};

type DashboardTableKey = keyof typeof dashboardData;

type CategoryKey = keyof typeof categoryConfigurations;

export const useDashboardData = (
  activeTable: string,
  activeCategory: CategoryKey,
  filters: DashboardFilters
) => {
  const { data: apiData, isLoading } = useQuery({
    queryKey: ["dashboard-metrics", filters],
    queryFn: () => getDashboardMetrics(filters),
    retry: false,
  });

  // const apiData = data; // mocked for now

  const normalizeDashboardData = (apiData: { campaigns: ApiCampaign[] }) => {
    if (!apiData?.campaigns) return { pipeline: [], client: [], campaign: [] };

    // --- Overall Pipeline (aggregated across all campaigns) ---
    const overallPipeline = (() => {
      const delivered = apiData.campaigns.reduce((sum, c) => {
        const campaignDelivered = c.daily.reduce(
          (dailySum, d) => dailySum + (d.delivered_leads_total ?? 0),
          0
        );
        return sum + campaignDelivered;
      }, 0);
      const target = apiData.campaigns.reduce(
        (sum, c) => sum + (c.target_leads ?? 0),
        0
      );

      const connReq = apiData.campaigns.reduce(
        (sum, c) => sum + (c.range_totals.connectionsSent ?? 0),
        0
      );
      const connAccepted = apiData.campaigns.reduce(
        (sum, c) => sum + (c.range_totals.connectionsAccepted ?? 0),
        0
      );
      const connRate = connReq > 0 ? (connAccepted / connReq) * 100 : 0;

      const newConversations = apiData.campaigns.reduce(
        (sum, c) => sum + (c.range_totals.messageReplies ?? 0),
        0
      );
      const positiveReplies = apiData.campaigns.reduce(
        (sum, c) =>
          sum +
          c.daily.reduce(
            (s, d) => s + (d.internal_raw?.positive_replies?.total ?? 0),
            0
          ),
        0
      );
      const positiveRate =
        newConversations > 0 ? (positiveReplies / newConversations) * 100 : 0;

      const avgResponse =
        apiData.campaigns.reduce(
          (sum, c) => sum + (c.avg_response_time_min ?? 0),
          0
        ) / Math.max(apiData.campaigns.length, 1);

      const avgSpeedToMeeting =
        apiData.campaigns.reduce(
          (sum, c) => sum + (c.avg_speed_to_meeting_booked_min ?? 0),
          0
        ) / Math.max(apiData.campaigns.length, 1);

      const lastDay = apiData.campaigns[0]?.daily.at(-1);

      const meetingBooked = apiData.campaigns.reduce(
        (sum, c) =>
          sum +
          c.daily.reduce(
            (s, d) => s + (d.internal_raw?.meetings?.meeting_booked_count ?? 0),
            0
          ),
        0
      );
      const meetingAttended = apiData.campaigns.reduce(
        (sum, c) => sum + (c.range_totals.attended_count ?? 0),
        0
      );

      const qualifiedMeetings = apiData.campaigns.reduce(
        (sum, c) =>
          sum +
          (c.total_qualified_prospects ?? 0) +
          (c.range_totals.attended_count ?? 0),
        0
      );
      const salesAcceptedLeads = apiData.campaigns.reduce(
        (sum, c) => sum + (c.total_qualified_prospects ?? 0),
        0
      );

      const allDailyBurnRates = apiData.campaigns.flatMap((c) =>
        c.daily.map((d) => d.computed?.burn_rate_avg_per_day ?? 0)
      );
      const avgBurnRate =
        allDailyBurnRates.length > 0
          ? allDailyBurnRates.reduce((a, b) => a + b, 0) /
            allDailyBurnRates.length
          : 0;

      return {
        entity: "Overall Pipeline",
        targetVsDelivered: `${target || "-"}/${delivered}`,
        connectionRequests: connReq.toString(),
        connectionAcceptance: `${connRate.toFixed(1)}%`,
        newConversations: newConversations.toString(),
        positiveResponse: `${positiveRate.toFixed(1)}%`,
        timeToResponse: avgResponse
          ? `${(avgResponse / 60).toFixed(1)} hrs`
          : "-",
        speedToMeeting: avgSpeedToMeeting
          ? `${(avgSpeedToMeeting / (60 * 24)).toFixed(1)} days`
          : "-",
        meetingsPerSource:
          connReq > 0 ? (meetingBooked / connReq).toFixed(2) : "-",
        showUpRate:
          meetingBooked > 0
            ? ((meetingAttended / meetingBooked) * 100).toFixed(1) + "%"
            : "-",
        qualifiedMeetings: qualifiedMeetings.toString(),
        salesAcceptedLeads: salesAcceptedLeads.toString(),
        responseSLA: "-",
        leadDeliverySLA: "-",
        followUpSLA: "-",
        meetingBookingSLA: "-",
        leadRefreshSLA: "-",
        feedbackLoggingSLA: "-",
        leadBurnRate: avgBurnRate ? `${avgBurnRate.toFixed(1)}/day` : "-",
        daysUntilDepletion: `${
          lastDay?.computed?.days_until_depletion?.toFixed(0) ?? "-"
        } days`,
        campaignsAtRisk:
          (lastDay?.computed?.days_until_depletion ?? Infinity) < 3
            ? "Yes"
            : "No",
        followUpCompletion: "-",
        recoveryRate: "-",
        errorRate: "-",
        experimentationRate: "-",
        clientOnTrack: "-",
        campaignOnTrack: "-",
      };
    })();

    // --- Daily Rows (flatten across campaigns) ---
    const dailyRows = apiData.campaigns.flatMap((c) =>
      c.daily.map((d) => {
        const connReq = d.hr_api.connectionsSent ?? 0;
        const connAccepted = d.hr_api.connectionsAccepted ?? 0;
        const connRate = connReq > 0 ? (connAccepted / connReq) * 100 : 0;

        const meetingBooked =
          d.internal_raw?.meetings?.meeting_booked_count ?? 0;
        const meetingAttended = d.internal_raw?.meetings?.attended_count ?? 0;

        return {
          entity: `${c.campaign_name} - ${d.date}`,
          targetVsDelivered: `${c.target_leads ?? "-"}/${
            d.delivered_leads_total
          }`,
          connectionRequests: connReq.toString(),
          connectionAcceptance: `${connRate.toFixed(1)}%`,
          newConversations: d.hr_api.totalMessageReplies?.toString(),
          positiveResponse: `${d.internal_raw?.positive_replies?.total ?? 0}`,
          timeToResponse: d.internal_raw?.avg_response_time_min
            ? `${(d.internal_raw.avg_response_time_min / 60).toFixed(1)} hrs`
            : "-",
          speedToMeeting: d.internal_raw?.avg_speed_to_meeting_booked_min
            ? `${(
                d.internal_raw.avg_speed_to_meeting_booked_min /
                (60 * 24)
              ).toFixed(1)} days`
            : "-",
          meetingsPerSource:
            connReq > 0 ? (meetingBooked / connReq).toFixed(2) : "-",
          showUpRate:
            meetingBooked > 0
              ? ((meetingAttended / meetingBooked) * 100).toFixed(1) + "%"
              : "-",
          qualifiedMeetings: (
            (c.total_qualified_prospects ?? 0) + meetingAttended
          ).toString(),
          salesAcceptedLeads: (c.total_qualified_prospects ?? 0).toString(),
          responseSLA: "-",
          leadDeliverySLA: "-",
          followUpSLA: "-",
          meetingBookingSLA: "-",
          leadRefreshSLA: "-",
          feedbackLoggingSLA: "-",
          leadBurnRate: `${
            d.computed?.burn_rate_avg_per_day?.toFixed(1) ?? "-"
          }/day`,
          daysUntilDepletion: `${
            d.computed?.days_until_depletion?.toFixed(0) ?? "-"
          } days`,
          campaignsAtRisk:
            (d.computed?.days_until_depletion ?? Infinity) < 3 ? "Yes" : "No",
          followUpCompletion: "-",
          recoveryRate: "-",
          errorRate: "-",
          experimentationRate: "-",
          clientOnTrack: "-",
          campaignOnTrack: "-",
        };
      })
    );

    // --- Campaign Level (one row per campaign) ---
    const campaign = apiData.campaigns.map((c) => {
      const connReq = c.range_totals.connectionsSent ?? 0;
      const connAccepted = c.range_totals.connectionsAccepted ?? 0;
      const connRate = connReq > 0 ? (connAccepted / connReq) * 100 : 0;

      const meetingBooked = c.daily.reduce(
        (sum, d) => sum + (d.internal_raw?.meetings?.meeting_booked_count ?? 0),
        0
      );
      const meetingAttended = c.range_totals.attended_count ?? 0;

      return {
        entity: c.campaign_name,
        targetVsDelivered: `${c.target_leads ?? "-"}/${
          c.delivered_leads_total ?? 0
        }`,
        connectionRequests: connReq.toString(),
        connectionAcceptance: `${connRate.toFixed(1)}%`,
        newConversations: c.range_totals.messageReplies?.toString(),
        positiveResponse: `${(
          (c.daily.reduce(
            (sum, d) => sum + (d.internal_raw?.positive_replies?.total ?? 0),
            0
          ) /
            Math.max(c.range_totals.messageReplies ?? 1)) *
          100
        ).toFixed(1)}%`,
        timeToResponse: c.avg_response_time_min
          ? `${(c.avg_response_time_min / 60).toFixed(1)} hrs`
          : "-",
        speedToMeeting: c.avg_speed_to_meeting_booked_min
          ? `${(c.avg_speed_to_meeting_booked_min / (60 * 24)).toFixed(1)} days`
          : "-",
        meetingsPerSource:
          connReq > 0 ? (meetingBooked / connReq).toFixed(2) : "-",
        showUpRate:
          meetingBooked > 0
            ? ((meetingAttended / meetingBooked) * 100).toFixed(1) + "%"
            : "-",
        qualifiedMeetings: (
          (c.total_qualified_prospects ?? 0) + meetingAttended
        ).toString(),
        salesAcceptedLeads: (c.total_qualified_prospects ?? 0).toString(),
        responseSLA: "-",
        leadDeliverySLA: "-",
        followUpSLA: "-",
        meetingBookingSLA: "-",
        leadRefreshSLA: "-",
        feedbackLoggingSLA: "-",
        leadBurnRate: `${
          c.daily[c.daily.length - 1]?.computed?.burn_rate_avg_per_day?.toFixed(
            1
          ) ?? "-"
        }/day`,
        daysUntilDepletion: `${
          c.daily[c.daily.length - 1]?.computed?.days_until_depletion?.toFixed(
            0
          ) ?? "-"
        } days`,
        campaignsAtRisk:
          (c.daily[c.daily.length - 1]?.computed?.days_until_depletion ??
            Infinity) < 3
            ? "Yes"
            : "No",
      };
    });

    // --- Client Level (stub until API provides grouping) ---
    const client: any[] = [];

    return { pipeline: [overallPipeline, ...dailyRows], campaign, client };
  };

  const normalized = useMemo(() => normalizeDashboardData(apiData), [apiData]);

  const currentTableData = useMemo(() => {
    const tableKey: DashboardTableKey = (
      ["pipeline", "client", "campaign"].includes(activeTable)
        ? activeTable
        : "pipeline"
    ) as DashboardTableKey;

    const data = dashboardData[tableKey];
    const category =
      categoryConfigurations[activeCategory] ||
      categoryConfigurations.performance;

    return {
      data: normalized[tableKey],
      columns: category.columns,
      title: `${category.name} - ${
        tableKey.charAt(0).toUpperCase() + tableKey.slice(1)
      } Level`,
    };
  }, [activeTable, activeCategory, normalized]);

  return currentTableData;
};
