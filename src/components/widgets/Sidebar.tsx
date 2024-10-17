import React, { useEffect, useState } from 'react';
import SidebarItem from '../common/sidebarItem';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAdmin } from '../../hooks/useAdmin';

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  const navigate = useNavigate();

  const { me, loading} = useAdmin();
  const [userData, setUserData] = useState<{ id: string; name: string; email: string } | null>(null);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  }

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await me();
        setUserData(data.user);
      } catch (err) {
        console.error('Failed to fetch user data:', err);
      }
    };
    fetchUserData();
  }, [me]);

  const location = useLocation();
  const [isProfile, setProfile] = useState(false); 

  const toggleProfile = () => {
    setProfile((prev) => !prev); 
  };

  return (
    <div className={`grid grid-rows-2 inset-y-0 left-0 w-64 bg-white shadow-lg transition-transform duration-300 rounded-lg mb-6 ${isOpen ? 'translate-x-0 ml-6' : '-translate-x-full'}`}>
      <div className="flex justify-start">
        <ul className="menu rounded-box w-full gap-y-4">
        <SidebarItem to='/' iconName='home' label='Dashboard' isActive={location.pathname === '/'} />
          <SidebarItem to='/users' iconName='users' label='Users' isActive={location.pathname === '/users'} />
          <SidebarItem to='/device' iconName='device' label='Devices' isActive={location.pathname.startsWith('/device')} />
          <SidebarItem to='/report' iconName='report' label='Reports' isActive={location.pathname === '/report'} />
        </ul>
      </div>
      <div className='p-2 flex items-end w-full'>
        <div className="dropdown dropdown-top dropdown-start w-full">
          <button
            tabIndex={0}
            role="button"
            className="w-full flex justify-start !p-2"
            onClick={toggleProfile}
          >
            <div className='w-full flex items-center justify-between gap-4 font-medium'>
              <div className='grid grid-cols-4 items-center gap-4'>
                <div className="relative w-8 h-8 overflow-hidden bg-gray-100 rounded-full col-span-1">
                  <svg
                    className="absolute w-10 h-10 text-gray-400 -left-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className='col-span-3'>
                  {loading ? (
                    <div className="skeleton h-4 w-full"></div>
                  ) : (
                    userData &&
                    <h1 className='col-span-3 text-start'>
                      {userData.name} 
                    </h1>
                  )}
                </div>
              </div>
              <svg
                className={`w-6 h-6 ml-2 transition-transform duration-300 ${isProfile ? 'rotate-180' : 'rotate-0'}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 10l5 5 5-5"
                />
              </svg>
            </div>
          </button>
          {isProfile && (
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-200 rounded-box z-[1] w-52 p-2 shadow"
            >
              <li>
                <button onClick={() => handleLogout()}>Logout</button>
              </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
