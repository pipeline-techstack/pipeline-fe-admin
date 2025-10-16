import { LinkedInSenderProfile } from '../types/sender';

export const formatSenderDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

export const filterSenders = (
  senders: LinkedInSenderProfile[],
  searchQuery: string
): LinkedInSenderProfile[] => {
  if (!searchQuery) return senders;

  const query = searchQuery.toLowerCase();
  return senders.filter(sender => {
    const name = sender.name?.toLowerCase() || "";
    const email = sender.email?.toLowerCase() || "";
    return name.includes(query) || email.includes(query);
  });
};

export const filterByStatus = (
  senders: LinkedInSenderProfile[],
  status: 'all' | 'active' | 'inactive' | 'paused'
): LinkedInSenderProfile[] => {
  if (status === 'all') return senders;
  return senders.filter(sender => sender.status === status);
};

export const sortSendersByMessages = (
  senders: LinkedInSenderProfile[],
  order: 'asc' | 'desc' = 'desc'
): LinkedInSenderProfile[] => {
  return [...senders].sort((a, b) =>
    order === 'desc'
      ? b.messages_sent - a.messages_sent
      : a.messages_sent - b.messages_sent
  );
};

