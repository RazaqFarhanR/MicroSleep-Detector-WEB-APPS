import { FC } from "react";

interface ModalProps {
    name: string,
    email: string,
    phone: string,
    relation: string,
    emergency_phone: string
};

const UserModal:FC<ModalProps> = ({name, email, phone, relation, emergency_phone}) => {
    return (
        <div>
            <dialog id="user_detail_modal" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-2xl text-center mb-4">User Information</h3>
                    <div className="w-full">
                        <div className="label">
                            <span className="label-text font-bold">Name:</span>
                            <span className="label-text font-semibold !select-text">{name}</span>
                        </div>
                        <div className="label">
                            <span className="label-text font-bold">Email:</span>
                            <span className="label-text font-semibold !select-text">{email}</span>
                        </div>
                        <div className="label">
                            <span className="label-text font-bold">Phone Number:</span>
                            <span className="label-text font-semibold !select-text">{phone}</span>
                        </div>
                        <div className="label">
                            <span className="label-text font-bold text-black">Emergency Contact:</span>
                        </div>
                        <div className="ml-6">
                            <div className="label">
                                <span className="label-text font-bold">Relationship:</span>
                                <span className="label-text font-semibold !select-text">{relation}</span>
                            </div>
                            <div className="label">
                                <span className="label-text font-bold">Phone Number:</span>
                                <span className="label-text font-semibold !select-text">{emergency_phone}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <form method="dialog" className="modal-backdrop">
                <button>close</button>
                </form>
            </dialog>
        </div>
    )
};

export default UserModal;