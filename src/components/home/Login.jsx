import googleAuth from "../../assets/google_login.png";
import twitter from "../../assets/twitter.png";
import {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import {signIn} from "../../data/auth/authenticationData.js";
import {useUser} from "../../hooks/contexts/UserContext.jsx";


export default function Login(){
    const { updateUser, updateToken , updateRole} = useUser();


    const [formData,setFormData] = useState([]);
    const [errors,setErrors] = useState({});
    const [loginSuccess,setLoginSuccess] = useState(false);
    const [loginIssue,setLoginIssue] = useState('');
    let navigate = useNavigate();


    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name] : e.target.value
        })
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();
        const res = await signIn(formData);
        if(res.data.case === 'success'){
            let token = res.data.authorisation.token;
            setLoginSuccess(true);
            updateToken(token);
            updateUser(res.data.user);
            updateRole(res.data.role);
            if(res.data.role === 'student'){
                setTimeout(()=>{
                    navigate('/courses/all');
                },2000)
            }
            else if(res.data.role === 'instructor'){
                setTimeout(()=>{
                    navigate('/instructor/dashboard');
                },2000)
            }
        }
        else if(res.data.case === 'incorrect_password'){
            setLoginIssue('incorrect_password');
        }
        else if(res.data.case === 'invalid_email'){
            setLoginIssue('invalid_email');
        }
        else{
            const errorData = res.data.errors;
            setErrors(errorData);
        }
    }

    useEffect(() => {
        if (loginIssue !== '') {
            const timer = setTimeout(() => {
                setLoginIssue('');
            }, 2500);
            return () => clearTimeout(timer);
        }
    }, [loginIssue]);

    useEffect(() => {
        if (errors) {
            const timer = setTimeout(() => {
                setErrors({});
            }, 2500);
            return () => clearTimeout(timer);
        }
    }, [errors]);

    return(
        <>
            {Object.keys(errors).length > 0 && (
                <div className="bg-secRed text-white text-[0.85rem] font-medium w-[80%] mx-auto py-[0.5rem] rounded-lg px-[5%]">
                    {Object.entries(errors).map(([field, messages]) => (
                        messages.map((message, index) => (
                            <p key={`${field}-${index}`}>{message}</p>
                        ))
                    ))}
                </div>
            )}
            {
                loginIssue === 'incorrect_password' &&
                <div className="bg-secRed text-white text-[0.85rem] font-medium w-[80%] mx-auto py-[0.5rem] rounded-lg px-[5%]">
                    <p>Incorrect Password. Try Again !</p>
                </div>
            }
            {
                loginIssue === 'invalid_email' &&
                <div className="bg-secRed text-white text-[0.85rem] font-medium w-[80%] mx-auto py-[0.5rem] rounded-lg px-[5%]">
                    <p>No User Found with this email !</p>
                </div>
            }

            {
                loginSuccess &&
                <div
                    className="bg-primary text-white font-medium w-[80%] mx-auto py-[0.5rem] flex items-center justify-center rounded-md">
                    <p>Logging in ...</p>
                </div>
            }

            <div className='flex w-full justify-center items-center gap-[20px] py-[0.5rem]'>
                <div
                    className='w-[48px] h-[48px] flex items-center border-1 border rounded-xl justify-center cursor-pointer hover:bg-slate hover:border-primary'>
                    <img src={googleAuth} className='w-[24px] h-[24px]' alt=""/>
                </div>
                <div
                    className='w-[48px] h-[48px] flex items-center border-1 border rounded-xl justify-center cursor-pointer hover:bg-slate hover:border-primary'>
                    <img src={twitter} className='w-[24px] h-[24px]' alt=""/>
                </div>
            </div>
            <div className='w-[80%] mx-auto flex justify-between items-center '>
                <div className='bg-gray w-[45%] h-[1px] rounded-lg'></div>
                <div className='text-gray'>OR</div>
                <div className='bg-gray w-[45%] h-[1px] rounded-lg'></div>
            </div>
            <form method='POST' onSubmit={handleSubmit} className='w-full'>
                <div className='w-[80%] mx-auto flex flex-col gap-[1rem]'>
                    <input type="text" placeholder='Email'
                           name='email'
                           className='bg-slate w-full bg-opacity-40 text-[0.9rem] px-[1rem] py-[0.75rem] rounded-xl text-main focus:outline-none'
                           onChange={handleChange}
                    />
                    <input type="password" placeholder='Password'
                           name='password'
                           className='bg-slate w-full bg-opacity-40 text-[0.9rem] px-[1rem] py-[0.75rem] rounded-xl text-main focus:outline-none'
                           onChange={handleChange}
                    />
                    <div className='w-full flex justify-end'>
                        <p className='text-main text-[0.9rem] font-medium cursor-pointer underline hover:text-gray mb-[1rem]'>Forgot
                            Password?</p>
                    </div>
                </div>
                <div className='w-[80%] mx-auto flex items-center justify-center'>
                    <button
                        className='w-full rounded-xl py-[0.75rem] bg-primary text-white font-medium hover:bg-hovers' type='submit'>Sign
                        In
                    </button>
                </div>
            </form>
            <div className='w-[80%] mx-auto flex items-center justify-center'>
                <p className='text-gray font-medium text-[0.9rem]'> Don't have an account yet? <span
                    className='text-primary text-[1rem] cursor-pointer hover:text-hovers hover:underline'>Sign In</span>
                </p>
            </div>
        </>
    )
}