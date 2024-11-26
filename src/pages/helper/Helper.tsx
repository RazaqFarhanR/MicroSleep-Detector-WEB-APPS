import { useNavigate } from 'react-router-dom'

const Helper = () => {
  const navigate = useNavigate()
  return (
    <div className='h-screen w-screen grid grid-rows-5 items-center'>
        <div className='text-center w-screen row-span-1 text-5xl font-semibold'>
            <h1>Helper API MicroSleep Detector</h1>
        </div>
        <div className='flex justify-center items-center row-span-4 h-full w-full'>
          <div className='grid grid-cols-2 gap-10'>
            <button onClick={() => navigate('./login')} className='btn btn-primary min-w-[70%] h-auto py-6'>
              <h1 className='text-4xl'>Demo User</h1>
            </button>

            <button className='btn btn-primary min-w-[70%] h-auto py-6'>
              <h1 className='text-4xl'>Accident Signal</h1>
            </button>
          </div>
        </div>
    </div>
  )
}

export default Helper