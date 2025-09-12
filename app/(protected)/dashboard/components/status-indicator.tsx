"use client";

interface StatusIndicatorProps {
  value: string;
  target?: string;
  type?: 'percentage' | 'ratio' | 'days' | 'count' | 'error';
  showBadge?: boolean;
}

export const StatusIndicator = ({ 
  value, 
  target = '90', 
  type = 'percentage',
  showBadge = false 
}: StatusIndicatorProps) => {
  const getStatusDisplay = () => {
    let percentage;
    
    switch (type) {
      case 'percentage':
        percentage = parseFloat(value.replace('%', ''));
        break;
      case 'ratio':
        const [actual, targetVal] = value.split('/').map(v => parseInt(v));
        percentage = (actual / targetVal) * 100;
        break;
      case 'days':
        const days = parseInt(value.replace(' days', ''));
        return days >= 30 ? 
          { icon: '🟢', status: 'Good', class: 'bg-green-100 text-green-800' } :
          days >= 15 ? 
          { icon: '🟡', status: 'Warning', class: 'bg-yellow-100 text-yellow-800' } :
          { icon: '🔴', status: 'Critical', class: 'bg-red-100 text-red-800' };
      case 'count':
        const count = parseInt(value);
        return count === 0 ? 
          { icon: '🟢', status: 'Good', class: 'bg-green-100 text-green-800' } :
          count <= 2 ? 
          { icon: '🟡', status: 'Warning', class: 'bg-yellow-100 text-yellow-800' } :
          { icon: '🔴', status: 'Critical', class: 'bg-red-100 text-red-800' };
      case 'error':
        const errorRate = parseFloat(value.replace('%', ''));
        return errorRate <= 2 ? 
          { icon: '🟢', status: 'Good', class: 'bg-green-100 text-green-800' } :
          errorRate <= 5 ? 
          { icon: '🟡', status: 'Warning', class: 'bg-yellow-100 text-yellow-800' } :
          { icon: '🔴', status: 'Critical', class: 'bg-red-100 text-red-800' };
      default:
        percentage = (parseFloat(value) / parseFloat(target)) * 100;
    }

    if (type === 'percentage' || type === 'ratio' || !percentage) {
      if (percentage >= 90) {
        return { icon: '🟢', status: 'On Track', class: 'bg-green-100 text-green-800' };
      } else if (percentage >= 80) {
        return { icon: '🟡', status: 'At Risk', class: 'bg-yellow-100 text-yellow-800' };
      } else {
        return { icon: '🔴', status: 'Off Track', class: 'bg-red-100 text-red-800' };
      }
    }
  };

  const statusDisplay = getStatusDisplay();

  if (!statusDisplay) {
    return null;
  }

  if (showBadge) {
    return (
      <div className="flex items-center space-x-2">
        <span>{statusDisplay.icon}</span>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusDisplay.class}`}>
          {value}
        </span>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-2">
      <span>{statusDisplay.icon}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
};

export default StatusIndicator;