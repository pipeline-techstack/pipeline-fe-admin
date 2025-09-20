"use client";

interface LeadAvatarProps {
  name: string;
  avatar?: string;
  size?: 'sm' | 'md' | 'lg';
}

const LeadAvatar = ({ name, avatar, size = 'md' }: LeadAvatarProps) => {
  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base'
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part.charAt(0))
      .slice(0, 2)
      .join('')
      .toUpperCase();
  };

  const getAvatarColor = (name: string) => {
    const colors = [
      'bg-blue-600',
      'bg-green-600', 
      'bg-purple-600',
      'bg-red-600',
      'bg-yellow-600',
      'bg-indigo-600',
      'bg-pink-600',
      'bg-teal-600'
    ];
    const index = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[index % colors.length];
  };

  if (avatar) {
    return (
      <img
        src={avatar}
        alt={name}
        className={`${sizeClasses[size]} rounded-full object-cover flex-shrink-0`}
      />
    );
  }

  return (
    <div className={`${sizeClasses[size]} rounded-full ${getAvatarColor(name)} text-white flex items-center justify-center font-medium flex-shrink-0`}>
      {getInitials(name)}
    </div>
  );
};

export default LeadAvatar;