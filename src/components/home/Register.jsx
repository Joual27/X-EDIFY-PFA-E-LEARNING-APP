import TeacherSignUp from "./TeacherSignUp.jsx";
import student from "../../assets/audience.png";
import teacher from "../../assets/teacher.png";
import {useState} from "react";
import StudentSignUp from "./StudentSignUp.jsx";


export default function Register({needsAuthentication}){

    const [registrationType,setRegistrationType] = useState('student');
    const switchToStudent = () => {
        setRegistrationType('student');
    }
    const switchToTeacher = () => {
        setRegistrationType('teacher');
    }

    return (
        <>
            <div
                className='w-[80%] mx-auto flex gap-[0.75rem] text-gray font-medium text-[0.9rem] justify-center items-center py-[0.5rem]'>
                <div className='flex gap-[10px] items-center'>
                    <img src={student} className='w-[40px] h-[40px] rounded-full' alt="student icon"/>
                    <button onClick={switchToStudent} className={`${(registrationType === 'student' ) ? ' text-secondary' : '' }`}>As a Student</button>
                </div>
                {
                    !needsAuthentication && <div className='flex gap-[10px] items-center'>
                        <img src={teacher} className='w-[40px] h-[40px] rounded-full' alt="student icon"/>
                        <button onClick={switchToTeacher}
                                className={`${(registrationType === 'teacher') ? ' text-secondary' : ''}`}>As a Teacher
                        </button>
                    </div>
                }
            </div>
            {needsAuthentication && <StudentSignUp needsAuthentication={needsAuthentication}/>}
            {!needsAuthentication && registrationType === 'student' &&
                <StudentSignUp needsAuthentication={needsAuthentication}/>}
            {!needsAuthentication && registrationType === 'teacher' && <TeacherSignUp/>}
        </>
    )
}