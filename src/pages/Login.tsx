import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Swal from 'sweetalert2';

const Login = () => {
    const { login, loading} = useAuth();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    // const [isShow, setShow] = useState(false)
    const navigate = useNavigate();

    const handleLogin = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
          await login({ email, password });
          Swal.fire({
            title: 'Success!',
            text: 'Login successful!',
            icon: 'success',
            showConfirmButton: false,
            timer: 2000
          }).then(() => {
            navigate('/');
          });
        } catch (error) {
          Swal.fire({
            title: 'Error!',
            text: 'Incorrect Email Id/Password',
            icon: 'error',
            showConfirmButton: false,
            timer: 2000
          });
        }
      };
    return (
        <div className='min-h-screen min-w-screen w-full bg-slate-100 flex flex-col items-center justify-center'>
            <a href="#" className="flex text-center items-center mb-6 text-4xl font-semibold text-gray-900">
                Microslepp <br/> Detector  
            </a>
            <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                    Sign in to your account
                </h1>
                <form className="space-y-4 md:space-y-6" onSubmit={handleLogin}>
                    <div>
                        <label className="block mb-2 text-sm font-medium">Email</label>
                        <input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required={true}/>
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium">Password</label>
                        <input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"required={true}/>
                    </div>
                    {/* <div className="flex items-center justify-between">
                        <a href="#" className="text-sm font-medium text-primary-600 hover:underline">Forgot password?</a>
                    </div> */}
                    <button type="submit" className="btn btn-primary w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                        {loading? 
                            <>
                                <span className="loading loading-spinner"></span>
                                loading
                            </>
                        :
                            'Sign in'
                        }

                    </button>
                    {/* <p className="text-sm font-light text-gray-500">
                        Don’t have an account yet? <a href="#" className="font-medium text-primary-600 hover:underline">Sign up</a>
                    </p> */}
                </form>
                </div>
            </div>
        </div>
    )
}

export default Login