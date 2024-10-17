import React from 'react';
import { Link } from 'react-router-dom';
import Icon from './Icon';



interface SidebarItemProps {
    to: string;
    iconName: 'home' | 'users' | 'device' | 'report';
    label: string;
    isActive: boolean,
}

const SidebarItem: React.FC<SidebarItemProps> = ({ to, iconName, label, isActive }) => {
  return (
    <li>
      <Link to={to} className={`rounded-lg flex items-start font-semibold ${isActive ? 'active' : ''}`}>
        <Icon name={iconName} className="h-5 w-5" alt={`${label} icon`} />
          {label}
      </Link>
    </li>
  );
};

export default SidebarItem;
