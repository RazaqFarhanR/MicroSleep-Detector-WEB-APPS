import { useState } from 'react';
import TableComponent from '../../components/common/TableComponent';
import LoadingComponent from '../../components/common/LoadingComponent';
// import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useDevices } from '../../hooks/useDevices';

const Device = () => {
  // const navigate = useNavigate();

  const [page, setPage] = useState<number>(1)
  const limit = 10
  const {devices, loading, totalCount} = useDevices(page, limit)
  const totalPages = Math.ceil(totalCount / limit);

  const columns = [
    { header: 'Serial Number', accessor: 'serial_number' },
    { header: 'Owner',  accessor: (row: any) => row.user?.name || 'No Owner'  },
    { header: 'Status', accessor: 'status' },
  ];

  const handleDetails = (): void => {
    const modalElement = document.getElementById('device_modal') as HTMLDialogElement;
    if (modalElement) {
      modalElement.showModal();
    }
  };

  const handleEdit = (): void => {
    const modalElement = document.getElementById('my_modal_1') as HTMLDialogElement;
    if (modalElement) {
      modalElement.showModal();
    }
  };

  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
      }
    });
  }

  return (
    <div className='h-[96%] relative overflow-x-auto overflow-y-hidden max-w-[100%] bg-white px-4 py-3 rounded-xl'>
      {/* headers */}
      <div className='mb-4 flex justify-between items-center'>
        <h1 className='text-2xl font-semibold font-sans'>Devices</h1>
        {/* <button
          className='btn btn-sm btn-primary rounded-md'
          onClick={() => navigate('./adddevice')}>
          New Device
        </button> */}
      </div>

      <div className='w-full h-full'>
          {loading ? 
          <div className='h-full items-center justify-center'>
            <LoadingComponent />
          </div>
          :
          
          <TableComponent 
            columns={columns} 
            data={devices}
            currentPage={page} 
            setPage={setPage} 
            totalPages={totalPages}
            itemsPerPage={limit}
            onDelete={() => handleDelete()}
            onEdit={() => handleEdit()}
            onViewDetails={() => handleDetails()}
        />
        }
      </div>

      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">Press ESC key or click the button below to close</p>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  )
}

export default Device