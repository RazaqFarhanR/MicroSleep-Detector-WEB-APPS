import { useState } from 'react';
import TableComponent from '../../components/common/TableComponent';
import LoadingComponent from '../../components/common/LoadingComponent';
import { useAccidents } from '../../hooks/useAccidents';
import AccidentModal from '../../components/widgets/AccidentModal';

interface Location {
  latitude: number;
  longitude: number;
}

const Report = () => {
  const [sn, setSn] = useState('');
  const [usr, setUsr] = useState('');
  const [tilt, setTilt] = useState('');
  const [loc, setLoc] = useState<Location | null>(null);
  const [time, setTIme] = useState('');


  const [page, setPage] = useState<number>(1);
  const limit = 10;
  const { accident, loading, totalCount } = useAccidents(page, limit);
  const totalPages = Math.ceil(totalCount / limit);

  const columns = [
    { header: 'Device', accessor:  (row: any) => row.devices?.serial_number },
    { header: 'User', accessor: (row: any) => row.user?.name },
    { header: 'Location', accessor: 'location' },
    { header: 'Tilt Angle', accessor: 'tilt_angle' },
    { header: 'Timestamp', accessor: 'timestamp' },
  ];

  const handleDetails = (item:any): void => {
    setSn(item.devices?.serial_number)
    setUsr(item.user?.name)
    setTilt(item.tilt_angle)
    setTIme(item.timestamp)
    setLoc({
      latitude: item.location.latitude,
      longitude: item.location.longitude,
    });
    
    const modalElement = document.getElementById('accident_modal') as HTMLDialogElement;
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
          {loading ? 
          <div className='h-full items-center justify-center'>
            <LoadingComponent />
          </div>
          :
          <TableComponent 
            columns={columns} 
            data={accident}
            currentPage={page} 
            setPage={setPage} 
            totalPages={totalPages}
            itemsPerPage={limit}
            onViewDetails={(item) => handleDetails(item)}
            onDelete={() => {}}
            onEdit={() => {}}
          />
        }
      </div>
      <AccidentModal
        sn={sn}
        user={usr}
        tilt={tilt}
        loc={loc}
        time={time}
      />
    </div>
  )
}

export default Report