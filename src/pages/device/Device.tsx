import { useEffect, useState } from 'react';
import TableComponent from '../../components/common/TableComponent';
import LoadingComponent from '../../components/common/LoadingComponent';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Device = () => {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(true)

  const columns = [
    { header: 'Serial Number', accessor: 'sn' },
    { header: 'Owner', accessor: 'owner' },
    { header: 'Status', accessor: 'status' },
  ];

  const devices = [
    { sn: 'MCS1010202400001', owner: 'john@example.com', status: 'active' },
    { sn: 'MCS1010202400001', owner: 'john@example.com', status: 'inactive' },
    { sn: 'MCS1010202400001', owner: 'john@example.com', status: 'inactive' },
    { sn: 'MCS1010202400001', owner: 'john@example.com', status: 'inactive' },
    { sn: 'MCS1010202400001', owner: 'john@example.com', status: 'inactive' },
    { sn: 'MCS1010202400001', owner: '-', status: 'pending activation' },
    { sn: 'MCS1010202400001', owner: '-', status: 'pending activation' },
    { sn: 'MCS1010202400001', owner: '-', status: 'pending activation' },
    { sn: 'MCS1010202400001', owner: '-', status: 'pending activation' },
    { sn: 'MCS1010202400001', owner: '-', status: 'pending activation' }
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
        <button
          className='btn btn-sm btn-primary rounded-md'
          onClick={() => navigate('./adddevice')}>
          Add Device
        </button>
      </div>

      <div className='w-full h-full'>
          {isLoading ? 
          <div className='h-full items-center justify-center'>
            <LoadingComponent />
          </div>
          :
          
          <TableComponent 
          columns={columns} 
          data={devices}
          currentPage={1} 
          setPage={() => {}} 
          totalPages={1}
          itemsPerPage={10}
          onDelete={() => handleDelete()}
          onEdit={() => handleEdit()}
          onViewDetails={() => handleDetails()}
        />
        }
      </div>

      <dialog id="my_modal_2" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Detail</h3>
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