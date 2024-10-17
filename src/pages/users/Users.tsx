import { useState } from 'react';
import TableComponent from '../../components/common/TableComponent';
import Loading from '../../components/common/LoadingComponent';
import { useUsers } from '../../hooks/useUsers';

const Users = () => {
  const [page, setPage] = useState<number>(1);
  const limit = 10;
  const { users, loading, totalCount } = useUsers(page, limit);

  const columns = [
    { header: 'Name', accessor: 'name' },
    { header: 'Email', accessor: 'email' },
    { header: 'Phone Number', accessor: 'phone_number' },
  ];
  
  const totalPages = Math.ceil(totalCount / limit);

  const handleDetails = (): void => {
    const modalElement = document.getElementById('my_modal_2') as HTMLDialogElement;
    if (modalElement) {
      modalElement.showModal();
    }
  };
  

  return (
    <div className='h-[96%] relative overflow-x-auto overflow-y-hidden max-w-[100%] bg-white px-4 py-3 rounded-xl'>
      <div className='mb-4 flex justify-between items-center'>
        <h1 className='text-2xl font-semibold font-sans'>Users</h1>
      </div>
      <div className='w-full h-full'>
        {loading ? 
          <div className='h-full items-center justify-center'>
            <Loading />
          </div>
          :
          <TableComponent 
            columns={columns} 
            data={users} 
            currentPage={page} 
            setPage={setPage} 
            totalPages={totalPages}
            itemsPerPage={limit}
            onViewDetails={() => handleDetails()}
            onDelete={() => {}}
            onEdit={() => {}}
          />
        }
      </div>
      <dialog id="my_modal_2" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">Press ESC key or click outside to close</p>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>

    </div>
  );
};

export default Users;
