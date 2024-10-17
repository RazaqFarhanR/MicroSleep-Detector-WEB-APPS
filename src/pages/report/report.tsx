import { useEffect, useState } from 'react';
import TableComponent from '../../components/common/TableComponent';
import LoadingComponent from '../../components/common/LoadingComponent';

const Device = () => {
  const [isLoading, setLoading] = useState(true)

  const columns = [
    { header: 'Device ID', accessor: 'device_id' },
    { header: 'User ID', accessor: 'user_id' },
    { header: 'Location', accessor: 'location' },
    { header: 'Tilt Angle', accessor: 'tilt_angle' },
    { header: 'Timestamp', accessor: 'timestamp' },
  ];

  const reports = [
    {
      device_id: 'DEV001',
      user_id: 'USR001',
      location: { latitude: -6.1234, longitude: 106.1234 },
      tilt_angle: 15.5,
      timestamp: '2024-10-17T10:30:00Z', // ISO 8601 format
    },
    {
      device_id: 'DEV002',
      user_id: 'USR002',
      location: { latitude: -6.5678, longitude: 106.5678 },
      tilt_angle: 25.0,
      timestamp: '2024-10-17T11:00:00Z', // ISO 8601 format
    },
    {
      device_id: 'DEV003',
      user_id: 'USR001',
      location: { latitude: -6.9101, longitude: 106.9101 },
      tilt_angle: 10.2,
      timestamp: '2024-10-17T11:30:00Z', // ISO 8601 format
    },
    {
      device_id: 'DEV004',
      user_id: 'USR003',
      location: { latitude: -6.2345, longitude: 106.2345 },
      tilt_angle: 30.7,
      timestamp: '2024-10-17T12:00:00Z', // ISO 8601 format
    },
    {
      device_id: 'DEV005',
      user_id: 'USR002',
      location: { latitude: -6.3456, longitude: 106.3456 },
      tilt_angle: 5.0,
      timestamp: '2024-10-17T12:30:00Z', // ISO 8601 format
    },
  ];

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    },2000);
  }, [])

  const handleDetails = (): void => {
    const modalElement = document.getElementById('my_modal_2') as HTMLDialogElement;
    if (modalElement) {
      modalElement.showModal();
    }
  };

  return (
    <div className='h-[96%] relative overflow-x-auto overflow-y-hidden max-w-[100%] bg-white px-4 py-3 rounded-xl'>
      {/* headers */}
      <div className='mb-4 flex justify-between items-center'>
        <h1 className='text-2xl font-semibold font-sans'>Accident Reports</h1>
      </div>

      <div className='w-full h-full'>
          {isLoading ? 
          <div className='h-full items-center justify-center'>
            <LoadingComponent />
          </div>
          :
          
          <TableComponent 
            columns={columns} 
            data={reports}
            currentPage={1} 
            setPage={() => {}} 
            totalPages={1}
            itemsPerPage={10}
            onViewDetails={() => handleDetails()}
            onDelete={() => {}}
            onEdit={() => {}}
          />
        }
      </div>
      <dialog id="my_modal_2" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Accident Report Details</h3>
          <ul className="timeline timeline-vertical">
          <li>
            <div className="timeline-start">1984</div>
            <div className="timeline-middle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-5 w-5">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                  clipRule="evenodd" />
              </svg>
            </div>
            <div className="timeline-end timeline-box">First Macintosh computer</div>
            <hr />
          </li>
          <li>
            <hr />
            <div className="timeline-start">1998</div>
            <div className="timeline-middle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-5 w-5">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                  clipRule="evenodd" />
              </svg>
            </div>
            <div className="timeline-end timeline-box">iMac</div>
            <hr />
          </li>
          <li>
            <hr />
            <div className="timeline-start">2001</div>
            <div className="timeline-middle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-5 w-5">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                  clipRule="evenodd" />
              </svg>
            </div>
            <div className="timeline-end timeline-box">iPod</div>
            <hr />
          </li>
          <li>
            <hr />
            <div className="timeline-start">2007</div>
            <div className="timeline-middle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-5 w-5">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                  clipRule="evenodd" />
              </svg>
            </div>
            <div className="timeline-end timeline-box">iPhone</div>
            <hr />
          </li>
          <li>
            <hr />
            <div className="timeline-start">2015</div>
            <div className="timeline-middle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-5 w-5">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                  clipRule="evenodd" />
              </svg>
            </div>
            <div className="timeline-end timeline-box">Apple Watch</div>
          </li>
        </ul>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  )
}

export default Device