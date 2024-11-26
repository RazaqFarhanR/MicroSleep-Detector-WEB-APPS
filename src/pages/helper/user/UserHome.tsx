import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import Icon from '../../../components/common/Icon';
import { useNavigate } from 'react-router-dom';

interface User {
  id: string,
  name: string;
  email: string;
  phone_number: string;
  emergency_contact: {
    name: string,
    phone_number: string
  }
}

interface Device {
  id: string
  device_name: string
  serial_number: string
  status: string
}

interface HistoryItem {
  timestamp: string
  location: Location
  tilt_angle: number
  latitude: string
  longitude: string
};

interface Location {
  latitude: string
  longitude: string
}

const baseURL = import.meta.env.VITE_API_URL

const UserHome: React.FC = () => {
  const navigate = useNavigate()

  const [user, setUser] = useState<User | null>(null);
  const [device, setDevice] = useState<Device | null>(null);
  const [history, setHistory] = useState<HistoryItem[] | null>([]);
  const [sn, setSn] = useState('')
  const [isDevice, setIsDevice] = useState(false)


  const getDataUser = async () => {
    try {
      const response = await axios.get(baseURL+'/api/users/me', {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('userToken')}`,
          },
      });
      setUser(response.data.data.user)
      if (response.data.data.user.devices) {
        setDevice(response.data.data.user.devices)
        setIsDevice(true)        
      }
    } catch (error) {
      console.error('Failed to fetch user profile:', error);
      throw error;
    }
  };

  const openModal2 = () => {
    const modalElement = document.getElementById('my_modal_2') as HTMLDialogElement;
    if (modalElement) {
      modalElement.showModal();
    }
  }

  const submitSN = async (e: React.FormEvent) => {
    e.preventDefault();
    const modalElement = document.getElementById('my_modal_2') as HTMLDialogElement;
    try {
        const inData = {
            user_id: user?.id,
            serial_number: sn
        }
        const response = await axios.put(baseURL+'/api/devices/register', inData, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('userToken')}`,
            },
        });
        getDataUser()
        modalElement.close()
        Swal.fire({
            title: 'Success',
            text: 'Device Register Successfully',
            icon: 'success',
            showConfirmButton: false,
            timer: 2000
        });
    } catch (error) {
        console.log(error)
        modalElement.close()
        Swal.fire({
            title: 'Error!',
            text: 'Operation Failed',
            icon: 'error',
            showConfirmButton: false,
            timer: 2000
        });
    }
  }


  const historyAccident = async () => {
    try {
      const response = await axios.get(baseURL+'/api/accidents/user/'+user?.id, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('userToken')}`,
          },
      });
      // console.log(response.data.data);
      
      setHistory(response.data.data)
    } catch (error) {
      console.error('Failed to fetch user profile:', error);
      throw error;
    }
  }

  useEffect(() => {
    getDataUser()
    historyAccident()
  }, []);

  useEffect(() => {
    if (user?.id) {
      historyAccident();
    }
  }, [user?.id]);
  

  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    navigate('/helper/login')
  };

const createGoogleMapsLink = (loc: Location | null) => {
  return `https://www.google.com/maps?q=${loc?.latitude},${loc?.longitude}`;
};

const formatDate = (isoString: string): string => {
    const date = new Date(isoString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });
};
  

  return (
    <div className="container">
      <div className="navbar">
          <div className='flex-1'>
            <button onClick={() => toggleSidebar()} data-drawer-target="default-sidebar" data-drawer-toggle="default-sidebar" aria-controls="default-sidebar" type="button" className='rounded-full bg-[#f9fafb] pr-2 pl-0 space-x-2 btn btn-sm'>
              <div className="relative w-8 h-8 overflow-hidden bg-gray-100 border-gray-200 border-2 rounded-full">
                <svg className="absolute w-9 h-9 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
              </div>
              <p className='font-semibold capitalize'>{user?.name?.split(' ')[0] || ''}</p>
            </button>
          </div>
          <div className='flex-none'>
          <button 
            type="button" 
            className="text-white bg-neutral focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center me-2"
            onClick={handleLogout}
          >
            <svg 
              className="w-5 h-5" 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 512 512"
              fill="currentColor"
            >
              <path 
                d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"
              />
            </svg>
            <span className="sr-only">Logout button</span>
          </button>
        </div>
      </div>

      {isSidebarOpen && (
        <aside 
          id="default-sidebar" 
          className="fixed inset-0 z-40 h-full w-full bg-gray-50 transition-transform transform translate-x-0"
          aria-label="Sidebar"
        >
          <div className="relative h-full px-3 py-4 overflow-y-auto">
            <div className="w-full flex items-center justify-between">
              <h1 className="font-semibold text-lg mx-auto">Profile</h1>
              <button 
                onClick={toggleSidebar} 
                type="button" 
                className="rounded-full bg-gray-200 p-2 hover:bg-gray-300 focus:outline-none"
                aria-label="Close Sidebar"
              >
                <svg className="w-6 h-6 text-gray-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
                </svg>
              </button>
            </div>

            <div className="mt-2">
             <div className="max-w-sm mx-auto">
                <div className="mb-5">
                  <label className="block text-sm font-medium text-gray-900">Name:</label>
                  <label className="block text-sm font-medium text-gray-800 capitalize">{user?.name}</label>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-900">Phone Number:</label>
                  <label className="block text-sm font-medium text-gray-800 capitalize">+{user?.phone_number}</label>
                </div>
                
                <details className="collapse collapse-arrow">
                  <summary className="collapse-title text-base font-medium !pl-0">Emergency Contact</summary>
                  <div className="collapse-content">
                    <div className="max-w-sm mx-auto">
                        <div className="mb-5">
                          <label className="block text-sm font-medium text-gray-900">Name:</label>
                          <label className="block text-sm font-medium text-gray-800 capitalize">{user?.emergency_contact.name}</label>
                        </div>
                        <div className="mb-5">
                          <label className="block text-sm font-medium text-gray-900">Phone Number:</label>
                          <label className="block text-sm font-medium text-gray-800 capitalize">+{user?.emergency_contact.phone_number}</label>
                        </div>
                      {/* <button type="submit" className="text-white btn btn-neutral btn-block rounded-full">Save</button> */}
                    </div>
                    
                  </div>
                </details>

              </div>
            </div>
          </div>
        </aside>
      )}
      
      <div className='mx-3'>
        <div className='rounded-xl bg-[#f9fafb] p-2 border-gray-200 border-2'>
          <h1 className='font-semibold text-xl mb-2'>My Devices</h1>
            {isDevice? 
              <>
                <div className='grid grid-cols-12'>
                  <div className='col-span-3 flex justify-center'>
                    <Icon className='w-14 h-14' name='iotDevices'/>
                  </div>
                  <div className="col-span-9 py-2 flex flex-col justify-between">
                    <p className="font-semibold text-xs text-gray-900">Name: {device?.device_name}</p>
                    <p className="font-semibold text-xs text-gray-900">Serial Number: {device?.serial_number}</p>
                    <p className="font-semibold text-xs text-gray-900">Status: {device?.status}</p>
                  </div>
                </div>
              </>
              :
              <>
                <div className='grid grid-cols-12 mb-2'>
                  <div className='col-span-3'>
                    <Icon className='w-14 h-14' name='iotDevices'/>
                  </div>
                  <div className="col-span-9 py-2 flex flex-col items-center">
                    <p className="font-semibold text-lg leading-none text-center text-gray-900">No devices have been registered yet</p>
                  </div>
                </div>
                <button onClick={() => openModal2()} className='btn btn-neutral btn-block rounded-full btn-md text-lg !py-0'>
                  Regiter New Devices
                </button>
              </>
            }
        </div>
      </div>

      <div className='mx-3 my-2'>
        <div className='rounded-xl bg-[#f9fafb] p-2 border-gray-200 border-2'>
          <h1 className='font-semibold text-xl text-center mb-4'>History of Emergency<br></br>Events Detected</h1>
          
          <div className='h-[50vh] overflow-auto'>
            {history?.map((item, index) => (
                <div key={`${index}`} className="rounded-xl bg-white p-2 border-gray-200 border-2 mb-2">
                  <p className="font-semibold text-xs text-gray-900">Time of Event: {formatDate(item.timestamp)}</p>
                  <p className="font-semibold text-xs text-gray-900">Location: {item.latitude}, {item.longitude}</p>
                  <p className="font-semibold text-xs text-gray-900">Tilt Y Angle: {item.tilt_angle}</p>
                  <a href={createGoogleMapsLink({ latitude: item.latitude, longitude: item.longitude })}>
                    <button className='btn btn-neutral btn-block rounded-full btn-sm text-md !py-0 mt-4'>
                      View Location on Gmaps
                    </button>
                  </a>
                </div>
            ))}
          </div>
        </div>
      </div>

      <div className='mx-3 my-2'>
        <button className='btn btn-block rounded-full bg-red-700 text-white' onClick={() => navigate('/helper/emergency')}>
          Emergency
        </button>
      </div>

      {/* <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-lg font-semibold">Name: {user?.name}</h2>
          <p className="text-gray-600">Email: {user?.email}</p>
          <p className="text-gray-600">Phone Number: {user?.phone_number}</p>
          <h2 className="text-lg font-semibold">Emergency Contact</h2>
          <p className="ml-6 text-gray-600">Relationship: {user?.emergency_contact.name}</p>
          <p className="ml-6 text-gray-600">Phone Number: {user?.emergency_contact.phone_number}</p>
          <div className="mt-4 flex space-x-2">
          <button className="btn btn-primary" onClick={() => openModal1()}>Add Emergency Contact</button>
          <button className="btn btn-secondary" onClick={() => openModal2()}>Add Device</button>
          </div>
      </div>

      <dialog id="my_modal_1" className="modal">
      <div className="modal-box">
          <h3 className="font-bold text-lg">Emergency Number</h3>
          <div className='w-full'>
              <form method="dialog w-full" onSubmit={submitEmergency}>
                  <label className="form-control w-full">
                      <div className="label">
                          <span className="label-text">Relationship:</span>
                      </div>
                      <input type="text" value={rel} onChange={(e) => setRel(e.target.value)} placeholder="Type here" className="input input-bordered w-full" />
                  </label>
                  <label className="form-control w-full">
                      <div className="label">
                          <span className="label-text">Phone Number:</span>
                      </div>
                      <input type="number" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Type here" className="input input-bordered w-full" />
                  </label>
                  <button type="submit" className="btn btn-primary w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                      {
                          'Submit'
                      }

                  </button>
              </form>
          </div>
      </div>
      </dialog> */}

      <dialog id="my_modal_2" className="modal">
      <div className="modal-box">
          <h3 className="font-bold text-lg font-sans">Register New Device</h3>
          <div className='w-full'>
              <form method="dialog w-full" onSubmit={submitSN}>
                  <label className="form-control w-full mb-4">
                      <div className="label -ml-1">
                          <span className="label-text">Serial Number:</span>
                      </div>
                      <input type="text" value={sn} onChange={(e) => setSn(e.target.value)} placeholder="Type here" className="input input-bordered w-full" />
                  </label>
                  <button type="submit" className="btn btn-neutral btn-block rounded-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium text-sm px-5 py-2.5 text-center">
                      {
                          'Submit'
                      }

                  </button>
              </form>
          </div>
          </div>
      </dialog>
     </div>
  );
};

export default UserHome;
