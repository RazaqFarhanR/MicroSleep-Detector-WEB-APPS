import { useNavigate } from "react-router-dom";

const AddDevice = () => {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1); // Navigasi ke halaman sebelumnya
    };
    return (
        <div className='max-h-[96%] relative max-w-[100%]'>
            {/* headers */}
            <div className='mb-4 flex justify-between items-center'>
            <h1 className='text-2xl font-semibold font-sans'>Add Devices</h1>
            </div>

            <div className='h-full overflow-y-auto max-h-[79vh]'>    
            <form className="w-full">
                <div className="mb-6">
                    <label className="block mb-2 text-sm font-medium text-gray-900">Device Name</label>
                    <input type="text" id="device_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Device Name" required />
                </div> 
                <div className="mb-6">
                    <label className="block mb-2 text-sm font-medium text-gray-900">Client ID</label>
                    <input type="text" id="device_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="client ID" required />
                </div> 
                <div className="mb-6">
                    <label className="form-control">
                        <label className="block mb-2 text-sm font-medium text-gray-900">Certificate</label>
                        <textarea className="textarea textarea-bordered h-24" placeholder="certificate"></textarea>
                    </label>
                </div> 
                <div className="mb-6">
                    <label className="form-control">
                        <label className="block mb-2 text-sm font-medium text-gray-900">Private Key</label>
                        <textarea className="textarea textarea-bordered h-24" placeholder="Private Key"></textarea>
                    </label>
                </div> 
                <div className="mb-6">
                    <label className="form-control">
                        <label className="block mb-2 text-sm font-medium text-gray-900">Public Key</label>
                        <textarea className="textarea textarea-bordered h-24" placeholder="Public Key"></textarea>
                    </label>
                </div> 
                <div className="md:flex justify-between">
                    <button type="button" onClick={handleBack} className="btn btn-block text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center">Back</button>
                    <button type="submit" className="btn btn-block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center">Submit</button>
                </div>
            </form>
            </div>
        </div>
    )
}

export default AddDevice