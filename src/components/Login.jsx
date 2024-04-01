import googleAuth from "../assets/google_login.png";
import twitter from "../assets/twitter.png";


export default function Login(){
    return(
        <>
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
            <div className='w-[80%] mx-auto flex flex-col gap-[1rem]'>
                <input type="text" placeholder='Email'
                       className='bg-slate w-full bg-opacity-40 text-[0.9rem] px-[1rem] py-[0.75rem] rounded-xl text-main focus:outline-none'/>
                <input type="password" placeholder='Password'
                       className='bg-slate w-full bg-opacity-40 text-[0.9rem] px-[1rem] py-[0.75rem] rounded-xl text-main focus:outline-none'/>
                <div className='w-full flex justify-end'>
                    <p className='text-main text-[0.9rem] font-medium cursor-pointer underline hover:text-gray'>Forgot Password?</p>
                </div>
            </div>
            <div className='w-[80%] mx-auto flex items-center justify-center'>
                <button className='w-full rounded-xl py-[0.75rem] bg-primary text-white font-medium hover:bg-hovers'>Sign In</button>
            </div>
            <div className='w-[80%] mx-auto flex items-center justify-center'>
                <p className='text-gray font-medium text-[0.9rem]'> Don't have an account yet? <span className='text-primary text-[1rem] cursor-pointer hover:text-hovers hover:underline'>Sign In</span></p>
            </div>
        </>
    )
}