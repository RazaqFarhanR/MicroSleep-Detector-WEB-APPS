import React, { useState } from 'react'
import { useAuth } from '../../../hooks/useAuth';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const RegisterUser = () => {
    const { registerUser } = useAuth();
    const [name, setName] = useState('');
    const [EmergencyName, setEmergencyName] = useState('');
    const [EmergencyPhone, setEmergencyPhone] = useState('');
    const [phone, setPhone] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [isLoading, setLoading] = useState(false);
    // const [is]
    const navigate = useNavigate();


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        try {
            await registerUser({ name, phone_number: phone, emergency_name: EmergencyName, emergency_number: EmergencyPhone, password })
            setLoading(false)
            Swal.fire({
                title: 'Success!',
                text: 'register successful!',
                icon: 'success',
                showConfirmButton: false,
                timer: 2000
              }).then(() => {
                const modalElement = document.getElementById('verify_otp_modal') as HTMLDialogElement;
                if (modalElement) {
                  modalElement.showModal();
                }
                // navigate('/helper/login')
              });
        } catch (error) {
            const message = (error as any)?.response?.data?.message || 'An error occurred';
            console.log((error as any));
            setLoading(false)
            Swal.fire({
                title: 'Error!',
                text: message,
                icon: 'error',
                showConfirmButton: false,
                timer: 2000
            });
        }

    }

    const submitOTP = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const modalElement = document.getElementById('verify_otp_modal') as HTMLDialogElement;
            if (modalElement) {
              modalElement.close();
            }
            Swal.fire({
                title: 'OTP Verified!',
                text: 'Your phone number has been confirmed. You’re all set to explore.',
                icon: 'success',
                showConfirmButton: false,
                timer: 3000
              }).then(() => {
                // const modalElement = document.getElementById('verify_otp_modal') as HTMLDialogElement;
                // if (modalElement) {
                //   modalElement.showModal();
                // }
                navigate('/helper/login')
              });
        } catch (error) {
            
        }
    }

    return (
        <div className='flex justify-center items-center h-screen bg-gray-100'>  
            <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8">
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <h5 className="text-center text-xl font-medium text-gray-900">Register Your Account</h5>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900">Name</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900">Phone Number</label>
                        <div className='grid grid-cols-12'>
                            <input value='+62' className="col-span-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" disabled />
                            <input type="number" value={phone} onChange={(e) => setPhone(e.target.value)} className="col-span-10 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                        </div>
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900">Relationship with Emergency Contacts</label>
                        <input type="text" value={EmergencyName} onChange={(e) => setEmergencyName(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900">Emergency Contact Number</label>
                        <div className='grid grid-cols-12'>
                            <input value='+62' className="col-span-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" disabled />
                            <input type="number" value={EmergencyPhone} onChange={(e) => setEmergencyPhone(e.target.value)} className="col-span-10 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                        </div>
                        <p className="text-xs text-gray-500 mt-1">Ensure the number is registered on WhatsApp.</p>
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                    </div>
                    {isLoading ?
                        <button className="btn btn-neutral btn-block">
                            <span className="loading loading-spinner"></span>
                            loading
                        </button>
                    :
                        <button className="btn btn-neutral btn-block">Register</button>
                    }
                </form>
            </div>
            {/* Open the modal using document.getElementById('ID').showModal() method */}
            <dialog id="verify_otp_modal" className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg text-center">Confirm OTP</h3>
                <p className="text-sm text-gray-600 mb-4">
                    We have sent an OTP to your emergency contact's WhatsApp number. Please enter the OTP below to confirm.
                </p>
                <div className="modal-action !justify-center ">
                    <div className='w-full'>
                        <form method="dialog" onSubmit={submitOTP}>
                            <div className='w-full mb-5'>
                                <label className="block mb-2 text-sm font-medium text-gray-900">Enter OTP</label>
                                <input type="number"  className="col-span-10 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                            </div>
                            <div className='flex justify-end'>
                                {isLoading ?
                                    <>
                                        <span className="loading loading-spinner"></span>
                                        loading
                                    </>
                                :
                                    <button className="btn btn-secondary">Submit</button>
                                }
                            </div>
                            {/* <button className="btn">Close</button> */}
                        </form>
                    </div>
                </div>
            </div>
            </dialog>
        </div>
    )
}

export default RegisterUser