import {useEffect, useState} from "react";
import {signUpAsInstructor, signUpAsStudent} from "../../data/auth/authenticationData.js";
import {useNavigate} from "react-router-dom";
import {useUser} from "../../hooks/contexts/UserContext.jsx";

const TeacherSignUp = () => {
    const [formData, setFormData] = useState({
        name: null,
        email: null,
        field: null,
        password: null,
        confirm_pw: null
    });
    const [errors,setErrors] = useState({});
    const [instructorCreatedSuccess,setInstructorCreatedSuccess] = useState(false);

    const { updateUser, updateToken , updateRole} = useUser();

    let navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name] : e.target.value
        })
    }
    const handleFormSubmission = async (e) =>{
        e.preventDefault();
        setErrors({});

        const response = await signUpAsInstructor(formData);

        if(response.data.case === 'success'){
            let token = response.data.authorisation.token;
            updateUser(response.data.instructor);
            updateToken(token);
            updateRole('instructor');
            setInstructorCreatedSuccess(true)
        }
        else if (response && response.data.case === 'validation_error') {
            const errorData = response.data.errors;
            setErrors(errorData);
        }
    }


    useEffect(() => {
        if (instructorCreatedSuccess) {
            setTimeout(()=>{
                 navigate('/instructor/dashboard');
            },2000)
        }
    }, [instructorCreatedSuccess]);

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
                instructorCreatedSuccess &&
                <div className="bg-primary text-white font-medium w-[80%] mx-auto py-[0.5rem] flex items-center justify-center rounded-md">
                    <p>Account created Successfully , Logging in ...</p>
                </div>
            }

            <form onSubmit={handleFormSubmission} method='POST' className='w-full'>
                <div className='w-[80%] mx-auto flex flex-col gap-[1rem]'>

                    <input type="text" placeholder='Full Name'
                           name='name'
                           onChange={handleChange}
                           className='bg-slate w-full bg-opacity-40 text-[0.9rem] px-[1rem] py-[0.75rem] rounded-xl text-main focus:outline-none'/>
                    <input type="text" placeholder='Email'
                           name='email'
                           onChange={handleChange}

                           className='bg-slate w-full bg-opacity-40 text-[0.9rem] px-[1rem] py-[0.75rem] rounded-xl text-main focus:outline-none'/>
                    <input type="text" placeholder='Field'
                           name='field'

                           onChange={handleChange}
                           className='bg-slate w-full bg-opacity-40 text-[0.9rem] px-[1rem] py-[0.75rem] rounded-xl text-main focus:outline-none'/>
                    <div className='w-full flex justify-between'>
                        <input type="password" placeholder='Password'
                               name='password'
                               onChange={handleChange}
                               className='bg-slate bg-opacity-40 text-[0.9rem] w-[47.5%] px-[1rem] py-[0.75rem] rounded-xl text-main focus:outline-none'/>
                        <input type="password" placeholder='Confirm Password'
                               name='confirm_pw'
                               onChange={handleChange}
                               className='bg-slate bg-opacity-40 text-[0.9rem] w-[47.5%] px-[1rem] py-[0.75rem] rounded-xl text-main focus:outline-none'/>
                    </div>
                </div>
                <div className='w-[80%] mx-auto flex items-center justify-center my-[1rem]'>
                    <button
                        className='w-full rounded-xl py-[0.75rem] bg-primary text-white font-medium hover:bg-hovers'>Sign
                        Up
                    </button>
                </div>
                <div className='w-[80%] mx-auto flex items-center justify-center '>
                    <p className='text-gray font-medium text-[0.9rem] '>Already have an account? <span
                        className='text-primary text-[1rem] cursor-pointer hover:text-hovers underline'>Sign Up</span>
                    </p>
                </div>
            </form>
        </>
    )
}

export default TeacherSignUp;