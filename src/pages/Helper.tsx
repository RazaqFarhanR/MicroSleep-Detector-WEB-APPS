import React from 'react'

const Helper = () => {
  return (
    <div className='h-screen w-screen grid grid-rows-5 justify-center items-center'>
        <div className='text-center w-screen row-span-1 text-5xl font-semibold'>
            <h1>Helper API for MicroSleep Detector</h1>
        </div>
        <div className='flex justify-center items-center gap-8 row-span-4 h-full w-full'>
            <button className='btn btn-primary w-[20%] h-[50%]'>
            </button>

            <button className='btn btn-primary w-[20%] h-[50%]'>
            </button>

            <button className='btn btn-primary w-[20%] h-[50%]'>
            </button>
        </div>
    </div>
  )
}

export default Helper