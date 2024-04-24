
import authPic from '../../assets/auth.svg'
import {useState} from "react";
import Register from "../home/Register.jsx";
import Login from "../home/Login.jsx";

export default function MandatoryAuth(){

    const [shownComponent,setShownComponent] = useState('login');
    function switchToLogin(){
        setShownComponent('login')
    }
    function switchToRegister(){
        setShownComponent('register')
    }

    return(
        <div className='w-[50%] flex min-h-[60vh] bg-whiteBg rounded-3xl z-20 relative' style={{zIndex : 10}} >
            <div className='w-[50%] bg-bgYellow flex flex-col gap-[1rem] bg-opacity-70 rounded-l-3xl px-[7.5%]'>
                <img src={authPic} className='w-full h-[60%]' alt=""/>
                <div className='flex flex-col gap-[1rem] text-center'>
                    <h1 className='text-xl font-semibold text-main'>Empower Yourself For Free</h1>
                    <p className='text-[0.9rem] font-medium'> Join our community of 40 million+ learners, upskill with CPD UK accredited courses, explore career development tools and psychometrics - all for free. </p>
                </div>
            </div>
            <div className='w-[50%] h-full flex flex-col items-center gap-[1.75rem] py-[2rem]'>
                <p className='text-center text-[0.8rem] text-secRed font-medium'>The Action You requested requires
                    authentication.</p>
                <div className='flex w-full justify-center items-center gap-[15px] text-main font-medium '>
                    <button onClick={switchToRegister}
                            className={`${shownComponent === 'register' ? 'border-b-2 border-b-primary px-[0.4rem] text-primary' : ''}`}>Sign
                        Up
                    </button>
                    <button onClick={switchToLogin}
                            className={`${shownComponent === 'login' ? 'border-b-2 border-b-primary px-[0.4rem] text-primary' : ''}`}>Sign
                        In
                    </button>
                </div>
                {shownComponent === 'register' ? <Register needsAuthentication={true}/> :
                    <Login needsAuthentication={true}/>}
            </div>
        </div>
    )
}

