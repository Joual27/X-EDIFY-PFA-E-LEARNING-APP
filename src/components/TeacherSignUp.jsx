
const TeacherSignUp = () => {
    return(
        <>

            <div className='w-[80%] mx-auto flex flex-col gap-[1rem]'>
                <div className='w-full flex justify-between'>
                    <input type="text" placeholder='First Name'
                           className='bg-slate bg-opacity-40 text-[0.9rem] w-[47.5%] px-[1rem] py-[0.75rem] rounded-xl text-main focus:outline-none'/>
                    <input type="text" placeholder='Family Name'
                           className='bg-slate bg-opacity-40 text-[0.9rem] w-[47.5%] px-[1rem] py-[0.75rem] rounded-xl text-main focus:outline-none'/>
                </div>
                <input type="text" placeholder='Email'
                       className='bg-slate w-full bg-opacity-40 text-[0.9rem] px-[1rem] py-[0.75rem] rounded-xl text-main focus:outline-none'/>
                <select name=""
                        className='bg-slate w-full bg-opacity-40 text-[0.9rem] px-[1rem] py-[0.9rem] rounded-xl text-gray focus:outline-none'>
                    <option className='text-gray text-[0.8rem]' value="">Select a Speciality</option>
                </select>
                <div className='w-full flex justify-between'>
                    <input type="password" placeholder='Password'
                           className='bg-slate bg-opacity-40 text-[0.9rem] w-[47.5%] px-[1rem] py-[0.75rem] rounded-xl text-main focus:outline-none'/>
                    <input type="password" placeholder='Confirm Password'
                           className='bg-slate bg-opacity-40 text-[0.9rem] w-[47.5%] px-[1rem] py-[0.75rem] rounded-xl text-main focus:outline-none'/>
                </div>
            </div>
            <div className='w-[80%] mx-auto flex items-center justify-center'>
                <button
                    className='w-full rounded-xl py-[0.75rem] bg-primary text-white font-medium hover:bg-hovers'>Sign Up
                </button>
            </div>
            <div className='w-[80%] mx-auto flex items-center justify-center'>
                <p className='text-gray font-medium text-[0.9rem]'>Already have an account? <span
                    className='text-primary text-[1rem] cursor-pointer hover:text-hovers underline'>Sign In</span></p>
            </div>
        </>
    )
}


export default TeacherSignUp;