import React from 'react'

interface Location {
    latitude: number;
    longitude: number;
}

interface ModalProps {
    sn: string,
    user: string,
    tilt: string,
    loc: Location | null,
    time: string
}

const DeviceModal: React.FC<ModalProps> = () => {
    return (
        <dialog id="device_modal" className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg">Device Details</h3>
                <div className='w-full'>
                    <div className="w-full">
                        <div className="label">
                            <span className="label-text font-bold">Device Serial Number:</span>
                            {/* <span className="label-text font-semibold !select-text">{sn}</span> */}
                        </div>
                        <div className="label">
                            <span className="label-text font-bold">User:</span>
                            {/* <span className="label-text font-semibold !select-text">{user}</span> */}
                        </div>
                        <div className="label">
                            <span className="label-text font-bold">Tilt Angle:</span>
                            {/* <span className="label-text font-semibold !select-text">{tilt}</span> */}
                        </div>
                        <div className="label">
                            <span className="label-text font-bold">Location:</span>
                            {/* <a className='link link-primary' href={googleMapsLink} target="_blank" rel="noopener noreferrer">
                                View on Google Maps
                            </a> */}
                            {/* <span className="label-text font-semibold">{loc}</span> */}
                        </div>
                        <div className="label">
                            <span className="label-text font-bold">Time of Incident:</span>
                            {/* <span className="label-text font-semibold !select-text">{readableDate}</span> */}
                        </div>
                    </div>
                </div>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
    )
}

export default DeviceModal