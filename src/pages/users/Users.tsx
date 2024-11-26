import { useState } from 'react';
import TableComponent from '../../components/common/TableComponent';
import Loading from '../../components/common/LoadingComponent';
import { useUsers } from '../../hooks/useUsers';
import UserModal from '../../components/widgets/UserModal';

const Users = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [pNumber, setPnumber] = useState('')
  const [rel, setRel] = useState('')
  const [emerNumber, setEmerNumber] = useState('')

  const [page, setPage] = useState<number>(1);
  const limit = 10;
  const { loading, totalCount } = useUsers(page, limit);

  const users = [
    {
      name: "Ahmad Pratama",
      email: "ahmad.pratama@email.com",
      phone_number: "6281234567888",
      emergency_contact: {
        name: "Parent",
        phone_number: "6281234567890"
      }

    },
    {
      name: "Putri Lestari",
      email: "putri.lestari@email.com",
      phone_number: "6281345678901",
      emergency_contact: {
        name: "Parent",
        phone_number: "628134567871"
      }
    },
    {
      name: "Budi Santoso",
      email: "budi.santoso@email.com",
      phone_number: "6281456789012",
      emergency_contact: {
        name: "Parent",
        phone_number: "628145678712"
      }
    },
    {
      name: "Siti Rahmawati",
      email: "siti.rahmawati@email.com",
      phone_number: "6281567890123",
      emergency_contact: {
        name: "Parent",
        phone_number: "628156789886"
      }
    },
    {
      name: "Rian Saputra",
      email: "rian.saputra@email.com",
      phone_number: "6281678901234",
      emergency_contact: {
        name: "Parent",
        phone_number: "628167890123"
      }
    }
  ]

  const columns = [
    { header: 'Name', accessor: 'name' },
    { header: 'Email', accessor: 'email' },
    { header: 'Phone Number', accessor: 'phone_number' },
  ];
  
  const totalPages = Math.ceil(totalCount / limit);

  const handleDetails = (item: any): void => {
    setName(item.name)
    setEmail(item.email)
    setPnumber(item.phone_number)
    setRel(item.emergency_contact?.name)
    setEmerNumber(item.emergency_contact?.phone_number)
    
    const modalElement = document.getElementById('user_detail_modal') as HTMLDialogElement;
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
            onViewDetails={(item) => handleDetails(item)}
            onDelete={() => {}}
            onEdit={() => {}}
          />
        }
      </div>
      <UserModal
        name={name}
        email={email}
        phone={pNumber}
        relation={rel}
        emergency_phone={emerNumber}
      />

    </div>
  );
};

export default Users;
