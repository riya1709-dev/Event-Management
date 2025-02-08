
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import PasswordInput from "../../components/input/PasswordInput"
import { useState } from 'react';
import { validateEmail } from '../../utils/helper';
import axiosInstance from '../../utils/axiosinstance';

const Login = () => {

  const [email,setEmail]= useState("");
  const [password,setPassword]= useState("");
  const [error, setError] = useState(null);


  const navigate = useNavigate(); // Initialize navigate

  const  handleLogin= async (e) => {
    e.preventDefault();
    if(!validateEmail(email)){
      setError("Invalid email");
      return;
    }
    if(!password){
      setError("Password is required");
      return;
    }
    setError("")
  //Login API Call
  try {
    const response = await axiosInstance.post('/event/login', {
      email: email,
      password: password
    });

    // Handle successful login
    if (response.data && response.data.accessToken) { 
        localStorage.setItem('token', response.data.accessToken);
        console.log("Token saved, navigating to dashboard...");
        navigate('/dashboard');
    } else {
        console.error("No token received, login failed.");
        setError("Login failed. Please try again.");
    }
} catch (err) { 
    if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
    } else {
        setError("An error occurred");
    }
}

}
  return (
    <div className='h-screen bg-cyan-50 overflow-hidden relative'>
      <div className='login-ui-box right-10 -top-40'/>
      <div className='login-ui-box bg-cyan-200 -bottom-40 right-1/2'/>

      <div className='container h-screen flex items-center justify-center px-20 mx-auto'>
        <div className="w-2/4 h-[90vh] flex items-end bg-[url('/images/loginbackground.png')] bg-cover bg-center rounded-lg p-10 z-50">
          <div>
            <h4 className='text-5xl text-white font-semibold leading-[58px]'>
              Step outside <br/>
              your comfort zone,
            </h4>
            <p className='text-[15px] text-white leading-6 pr-7  mt-4'>
              that&apos;s where the magic happens
            </p>
          </div>
        </div>
        <div className='w-2/4 h-[75vh] bg-white rounded-r-lg relative p-16 shadow-lg shadow-cyan-200/20'>
          <form onSubmit={handleLogin}>
            <h4 className='text-2xl font-semibold mb-7'>Login</h4>

            <input type="text" placeholder='Email' className='input-box'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />
            <PasswordInput  value={password}
            onChange={(e) => setPassword(e.target.value)}/>

            {error && <p className='text-red-500 text-xs pb-1'>{error}</p>}
            <button type='submit' className='btn-primary'>
              Login
            </button>
            <p className='text-xs text-slate-500 text-center my-4'>Or</p>
            <button type='button' className='btn-primary btn-light' onClick={() => navigate("/signup")}>
              CREATE ACCOUNT
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
