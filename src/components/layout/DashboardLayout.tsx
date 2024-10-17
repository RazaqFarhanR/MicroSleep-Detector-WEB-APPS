import React, { useEffect, useState } from 'react';
import TopBar from '../widgets/TopBar';
import Sidebar from '../widgets/Sidebar';
import { Outlet } from 'react-router-dom';

const DashboardLayout: React.FC = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleResize = () => {
        if (window.innerWidth < 768) {
            setIsSidebarOpen(false);
        } else {
            setIsSidebarOpen(true); 
        }
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        handleResize(); 

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className="flex flex-col h-screen bg-base-200 overflow-hidden">
            <TopBar toggleSidebar={toggleSidebar} />
            <div className="flex flex-1 pt-6 overflow-hidden">
                <Sidebar isOpen={isSidebarOpen} />
                <div className={`flex-1 transition-all duration-300 h-full ${isSidebarOpen ? 'ml-0' : '-ml-64'} min-w-0`}>
                    <main className="px-6 h-full w-full overflow-x-auto">
                        <Outlet />
                    </main>
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;
