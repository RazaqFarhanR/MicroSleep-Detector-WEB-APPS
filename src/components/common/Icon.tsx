import React from 'react';
import { ReactComponent as HomeIcon } from '../../assets/icons/home.svg';
import { ReactComponent as UsersIcon } from '../../assets/icons/users.svg';
import { ReactComponent as DeviceIcon } from '../../assets/icons/device.svg';
import { ReactComponent as ReportIcon } from '../../assets/icons/report.svg';
import { ReactComponent as IoTDevicesIcon } from '../../assets/icons/iotDevices.svg';

interface IconProps {
  name: 'home' | 'users' | 'device' | 'report' | 'iotDevices';
  className?: string;
  alt?: string;
}

const Icon: React.FC<IconProps> = ({ name, className, alt = 'icon' }) => {
  const icons = {
    home: <HomeIcon className={className} aria-label={alt} />,
    users: <UsersIcon className={className} aria-label={alt} />,
    device: <DeviceIcon className={className} aria-label={alt} />,
    report: <ReportIcon className={className} aria-label={alt} />,
    iotDevices: <IoTDevicesIcon className={className} aria-label={alt}/>,
  };

  return icons[name];
};

export default Icon;
