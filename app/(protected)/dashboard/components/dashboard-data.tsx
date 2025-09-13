import { TableColumn } from "../types/dashboard";
import StatusIndicator from "./status-indicator";

export const dashboardData = {
  pipeline: [
    {
      entity: 'Overall Pipeline',
      targetVsDelivered: '1,247/1,500',
      connectionRequests: '2,180',
      connectionAcceptance: '57.2%',
      newConversations: '1,247',
      positiveResponse: '42.3%',
      timeToResponse: '2.4 hrs',
      speedToMeeting: '1.8 days',
      meetingsPerSource: '18%',
      showUpRate: '78.5%',
      qualifiedMeetings: '65.4%',
      salesAcceptedLeads: '187',
      responseSLA: '94.2%',
      leadDeliverySLA: '89.7%',
      followUpSLA: '91.3%',
      meetingBookingSLA: '87.9%',
      leadRefreshSLA: '92.1%',
      feedbackLoggingSLA: '88.4%',
      leadBurnRate: '45/day',
      daysUntilDepletion: '23 days',
      campaignsAtRisk: '2',
      followUpCompletion: '91.7%',
      recoveryRate: '34.2%',
      errorRate: '2.1%',
      experimentationRate: '15.3%',
      clientOnTrack: '8/10',
      campaignOnTrack: '12/15'
    },
    {
      entity: 'Q4 Performance',
      targetVsDelivered: '987/1,200',
      connectionRequests: '1,890',
      connectionAcceptance: '61.4%',
      newConversations: '987',
      positiveResponse: '45.1%',
      timeToResponse: '1.9 hrs',
      speedToMeeting: '1.5 days',
      meetingsPerSource: '21%',
      showUpRate: '82.3%',
      qualifiedMeetings: '69.8%',
      salesAcceptedLeads: '203',
      responseSLA: '96.8%',
      leadDeliverySLA: '93.2%',
      followUpSLA: '94.7%',
      meetingBookingSLA: '91.5%',
      leadRefreshSLA: '95.3%',
      feedbackLoggingSLA: '92.1%',
      leadBurnRate: '38/day',
      daysUntilDepletion: '31 days',
      campaignsAtRisk: '1',
      followUpCompletion: '94.8%',
      recoveryRate: '38.9%',
      errorRate: '1.7%',
      experimentationRate: '18.2%',
      clientOnTrack: '9/10',
      campaignOnTrack: '14/15'
    },
    {
      entity: 'Enterprise Segment',
      targetVsDelivered: '456/600',
      connectionRequests: '890',
      connectionAcceptance: '52.1%',
      newConversations: '456',
      positiveResponse: '38.7%',
      timeToResponse: '3.2 hrs',
      speedToMeeting: '2.1 days',
      meetingsPerSource: '15%',
      showUpRate: '74.2%',
      qualifiedMeetings: '71.3%',
      salesAcceptedLeads: '94',
      responseSLA: '87.3%',
      leadDeliverySLA: '84.9%',
      followUpSLA: '86.2%',
      meetingBookingSLA: '82.7%',
      leadRefreshSLA: '88.4%',
      feedbackLoggingSLA: '83.6%',
      leadBurnRate: '28/day',
      daysUntilDepletion: '16 days',
      campaignsAtRisk: '3',
      followUpCompletion: '87.9%',
      recoveryRate: '29.4%',
      errorRate: '3.2%',
      experimentationRate: '12.7%',
      clientOnTrack: '4/6',
      campaignOnTrack: '6/9'
    }
  ],

  client: [
    {
      entity: 'Tech Solutions Inc',
      targetVsDelivered: '324/400',
      connectionRequests: '578',
      connectionAcceptance: '56.1%',
      newConversations: '324',
      positiveResponse: '41.7%',
      timeToResponse: '2.1 hrs',
      speedToMeeting: '1.6 days',
      meetingsPerSource: '0.19',
      showUpRate: '79.2%',
      qualifiedMeetings: '67.8%',
      salesAcceptedLeads: '62',
      responseSLA: '95.4%',
      leadDeliverySLA: '91.8%',
      followUpSLA: '93.2%',
      meetingBookingSLA: '89.7%',
      leadRefreshSLA: '94.1%',
      feedbackLoggingSLA: '90.3%',
      leadBurnRate: '18/day',
      daysUntilDepletion: '22 days',
      campaignsAtRisk: '1',
      followUpCompletion: '93.4%',
      recoveryRate: '36.8%',
      errorRate: '1.9%',
      experimentationRate: '16.4%',
      clientOnTrack: '1/1',
      campaignOnTrack: '3/3'
    },
    {
      entity: 'Global Marketing Co',
      targetVsDelivered: '287/350',
      connectionRequests: '487',
      connectionAcceptance: '58.9%',
      newConversations: '287',
      positiveResponse: '43.2%',
      timeToResponse: '2.7 hrs',
      speedToMeeting: '1.9 days',
      meetingsPerSource: '0.17',
      showUpRate: '77.1%',
      qualifiedMeetings: '63.2%',
      salesAcceptedLeads: '48',
      responseSLA: '92.7%',
      leadDeliverySLA: '87.4%',
      followUpSLA: '89.8%',
      meetingBookingSLA: '85.3%',
      leadRefreshSLA: '90.6%',
      feedbackLoggingSLA: '86.9%',
      leadBurnRate: '15/day',
      daysUntilDepletion: '19 days',
      campaignsAtRisk: '0',
      followUpCompletion: '90.1%',
      recoveryRate: '32.7%',
      errorRate: '2.3%',
      experimentationRate: '14.8%',
      clientOnTrack: '1/1',
      campaignOnTrack: '2/2'
    },
    {
      entity: 'Enterprise Corp',
      targetVsDelivered: '198/300',
      connectionRequests: '412',
      connectionAcceptance: '48.1%',
      newConversations: '198',
      positiveResponse: '37.4%',
      timeToResponse: '3.8 hrs',
      speedToMeeting: '2.4 days',
      meetingsPerSource: '0.13',
      showUpRate: '71.8%',
      qualifiedMeetings: '59.7%',
      salesAcceptedLeads: '31',
      responseSLA: '83.2%',
      leadDeliverySLA: '79.6%',
      followUpSLA: '81.7%',
      meetingBookingSLA: '77.4%',
      leadRefreshSLA: '84.9%',
      feedbackLoggingSLA: '80.2%',
      leadBurnRate: '22/day',
      daysUntilDepletion: '14 days',
      campaignsAtRisk: '2',
      followUpCompletion: '82.6%',
      recoveryRate: '25.3%',
      errorRate: '4.1%',
      experimentationRate: '11.2%',
      clientOnTrack: '0/1',
      campaignOnTrack: '1/3'
    }
  ],

  campaign: [
    {
      entity: 'Q1 Outreach Campaign',
      targetVsDelivered: '324/400',
      connectionRequests: '578',
      connectionAcceptance: '56.1%',
      newConversations: '324',
      positiveResponse: '41.7%',
      timeToResponse: '2.1 hrs',
      speedToMeeting: '1.6 days',
      meetingsPerSource: '0.19',
      showUpRate: '79.2%',
      qualifiedMeetings: '67.8%',
      salesAcceptedLeads: '62',
      responseSLA: '95.4%',
      leadDeliverySLA: '91.8%',
      followUpSLA: '93.2%',
      meetingBookingSLA: '89.7%',
      leadRefreshSLA: '94.1%',
      feedbackLoggingSLA: '90.3%',
      leadBurnRate: '18/day',
      daysUntilDepletion: '22 days',
      campaignsAtRisk: '1',
      followUpCompletion: '93.4%',
      recoveryRate: '36.8%',
      errorRate: '1.9%',
      experimentationRate: '16.4%',
      clientOnTrack: '1/1',
      campaignOnTrack: '1/1'
    },
    {
      entity: 'Lead Generation Drive',
      targetVsDelivered: '287/350',
      connectionRequests: '487',
      connectionAcceptance: '58.9%',
      newConversations: '287',
      positiveResponse: '43.2%',
      timeToResponse: '2.7 hrs',
      speedToMeeting: '1.9 days',
      meetingsPerSource: '0.17',
      showUpRate: '77.1%',
      qualifiedMeetings: '63.2%',
      salesAcceptedLeads: '48',
      responseSLA: '92.7%',
      leadDeliverySLA: '87.4%',
      followUpSLA: '89.8%',
      meetingBookingSLA: '85.3%',
      leadRefreshSLA: '90.6%',
      feedbackLoggingSLA: '86.9%',
      leadBurnRate: '15/day',
      daysUntilDepletion: '19 days',
      campaignsAtRisk: '0',
      followUpCompletion: '90.1%',
      recoveryRate: '32.7%',
      errorRate: '2.3%',
      experimentationRate: '14.8%',
      clientOnTrack: '1/1',
      campaignOnTrack: '1/1'
    },
    {
      entity: 'Enterprise Outbound',
      targetVsDelivered: '156/250',
      connectionRequests: '298',
      connectionAcceptance: '52.3%',
      newConversations: '156',
      positiveResponse: '39.1%',
      timeToResponse: '3.4 hrs',
      speedToMeeting: '2.2 days',
      meetingsPerSource: '0.14',
      showUpRate: '73.6%',
      qualifiedMeetings: '61.4%',
      salesAcceptedLeads: '28',
      responseSLA: '88.9%',
      leadDeliverySLA: '84.2%',
      followUpSLA: '86.7%',
      meetingBookingSLA: '82.1%',
      leadRefreshSLA: '89.3%',
      feedbackLoggingSLA: '85.7%',
      leadBurnRate: '12/day',
      daysUntilDepletion: '21 days',
      campaignsAtRisk: '0',
      followUpCompletion: '87.8%',
      recoveryRate: '30.9%',
      errorRate: '2.7%',
      experimentationRate: '13.6%',
      clientOnTrack: '1/1',
      campaignOnTrack: '1/1'
    }
  ]
};

export const categoryConfigurations = {
  performance: {
    name: 'Performance Metrics',
    columns: [
      { key: 'entity', header: 'Entity' },
      { 
        key: 'targetVsDelivered', 
        header: 'Target vs Delivered',
        render: (value: string) => (
          <StatusIndicator value={value} type="ratio" showBadge={false} />
        )
      },
      { key: 'connectionRequests', header: 'Connection Requests' },
      { 
        key: 'connectionAcceptance', 
        header: 'Acceptance Rate',
        render: (value: string) => (
          <StatusIndicator value={value} type="percentage" showBadge={false} />
        )
      },
      { key: 'newConversations', header: 'New Conversations' },
      { 
        key: 'positiveResponse', 
        header: 'Positive Response',
        render: (value: string) => (
          <StatusIndicator value={value} type="percentage" showBadge={false} />
        )
      },
      { key: 'timeToResponse', header: 'Time to Response' },
      { key: 'speedToMeeting', header: 'Speed to Meeting' },
      { key: 'meetingsPerSource', header: 'Meetings/Source' },
      { 
        key: 'showUpRate', 
        header: 'Show-Up Rate',
        render: (value: string) => (
          <StatusIndicator value={value} type="percentage" showBadge={false} />
        )
      },
      { 
        key: 'qualifiedMeetings', 
        header: 'Qualified Meetings',
        render: (value: string) => (
          <StatusIndicator value={value} type="percentage" showBadge={false} />
        )
      },
      { key: 'salesAcceptedLeads', header: 'SALs' }
    ] as TableColumn[]
  },

  sla: {
    name: 'SLA Compliance',
    columns: [
      { key: 'entity', header: 'Entity' },
      { 
        key: 'responseSLA', 
        header: 'Response SLA',
        render: (value: string) => (
          <StatusIndicator value={value} type="percentage" showBadge={false} />
        )
      },
      { 
        key: 'leadDeliverySLA', 
        header: 'Lead Delivery SLA',
        render: (value: string) => (
          <StatusIndicator value={value} type="percentage" showBadge={false} />
        )
      },
      { 
        key: 'followUpSLA', 
        header: 'Follow-Up SLA',
        render: (value: string) => (
          <StatusIndicator value={value} type="percentage" showBadge={false} />
        )
      },
      { 
        key: 'meetingBookingSLA', 
        header: 'Meeting Booking SLA',
        render: (value: string) => (
          <StatusIndicator value={value} type="percentage" showBadge={false} />
        )
      },
      { 
        key: 'leadRefreshSLA', 
        header: 'Lead Refresh SLA',
        render: (value: string) => (
          <StatusIndicator value={value} type="percentage" showBadge={false} />
        )
      },
      { 
        key: 'feedbackLoggingSLA', 
        header: 'Feedback Logging SLA',
        render: (value: string) => (
          <StatusIndicator value={value} type="percentage" showBadge={false} />
        )
      }
    ] as TableColumn[]
  },

  health: {
    name: 'Campaign Health',
    columns: [
      { key: 'entity', header: 'Entity' },
      { key: 'leadBurnRate', header: 'Lead Burn Rate' },
      { 
        key: 'daysUntilDepletion', 
        header: 'Days Until Depletion',
        render: (value: string) => (
          <StatusIndicator value={value} type="days" showBadge={false} />
        )
      },
      { 
        key: 'campaignsAtRisk', 
        header: 'Campaigns at Risk',
        render: (value: string) => (
          <StatusIndicator value={value} type="count" showBadge={false} />
        )
      },
      { 
        key: 'followUpCompletion', 
        header: 'Follow-Up Completion',
        render: (value: string) => (
          <StatusIndicator value={value} type="percentage" showBadge={false} />
        )
      },
      { 
        key: 'recoveryRate', 
        header: 'Recovery Rate',
        render: (value: string) => (
          <StatusIndicator value={value} type="percentage" showBadge={false} />
        )
      },
      { 
        key: 'errorRate', 
        header: 'Error Rate',
        render: (value: string) => (
          <StatusIndicator value={value} type="error" showBadge={false} />
        )
      },
      { 
        key: 'experimentationRate', 
        header: 'Experimentation Rate',
        render: (value: string) => (
          <StatusIndicator value={value} type="percentage" showBadge={false} />
        )
      },
      { 
        key: 'clientOnTrack', 
        header: 'Client On-Track',
        render: (value: string) => (
          <StatusIndicator value={value} type="ratio" showBadge={false} />
        )
      },
      { 
        key: 'campaignOnTrack', 
        header: 'Campaign On-Track',
        render: (value: string) => (
          <StatusIndicator value={value} type="ratio" showBadge={false} />
        )
      }
    ] as TableColumn[]
  }
};
