import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import NotFound from '../pages/NotFound';
import DashboardLayout from '../components/layout/DashboardLayout';
import Login from '../pages/Login';
import Users from '../pages/users/Users';
import Device from '../pages/device/Device';
import Report from '../pages/report/report';
import AddDevice from '../pages/device/AddDevice';

const AppRoutes = () => {
  return (
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
            <Route index element={<Home />} />
            <Route path="/users" element={<Users />} />
            <Route path="/device" element={<Device />} />
            <Route path="/device/adddevice" element={<AddDevice />} />
            <Route path="/report" element={<Report />} />
        </Route>
        <Route path='/login' element={<Login/>}/>
        <Route path="*" element={<NotFound />} />
      </Routes>
  );
};

export default AppRoutes;
