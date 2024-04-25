import Navbar from "../components/home/Navbar.jsx";
import students from '../assets/students.png'
import profile from '../assets/profile.png'
import confirm from '../assets/confirm.png'
import student from '../assets/teacher.png'
import rating from '../assets/star.png'
import {useNavigate, useParams} from "react-router-dom";
import {fetchCourseData} from "../data/course/courseData.js";
import {useEffect, useState} from "react";
import {useUser} from "../hooks/contexts/UserContext.jsx";
import close from "../assets/close.png";
import check from "../assets/check.png";
import {enrollCourse} from "../data/course/studentData.js";

const SpecificCoursePage = () => {
    const {setPageToLoadAfterRequiredAuth,user} = useUser();
    const {id} = useParams();
    let navigate = useNavigate();
    const [courseData,setCourseData] = useState([]);
    const [confirmEnrollmentShown,setConfirmEnrollementShown] = useState(false);
    const [courseEnrolledSuccess,setCourseEnrolledSuccess] = useState(false);
    const [courseAlreadyEnrolled,setCourseAlreadyEnrolled] = useState(false);
    const bringCourseData = async () => {
        const res = await fetchCourseData(id);
        if (res.data.case === 'success'){
            setCourseData(res.data.course);
        }
        else {
            console.log(res.data.message);
        }
    }

    const handleHidingConfirmationPopup = () => {
        setConfirmEnrollementShown(false);
    }

    const handleCourseEnrollment = () => {
        if (!user){
            setPageToLoadAfterRequiredAuth(courseData.id);
            navigate('/auth/required');
        }
        else{
            setConfirmEnrollementShown(true);
        }
    }


    const confirmCourseEnrollment = async () => {
        const res = await enrollCourse(courseData.id,user.student.id);
        if (res.data.case === 'success'){
            setCourseEnrolledSuccess(true);
            setTimeout(()=>{
                navigate('/student/dashboard');
            },2000)
        }
        else if(res.data.case === 'exists'){
            setCourseAlreadyEnrolled(true)
            setTimeout(()=>{
                setConfirmEnrollementShown(false)
            },2000)
        }
        else{
            console.log(res.data.message)
        }
    }

    useEffect(() => {
        bringCourseData();
        // console.log(courseData)
    }, []);

    useEffect(() => {
        if (courseAlreadyEnrolled === true) {
            const timer = setTimeout(() => {
                setCourseAlreadyEnrolled(false);
            }, 2500);
            return () => clearTimeout(timer);
        }
    }, [courseAlreadyEnrolled]);



    return(
        <>
            <div className='bg-background min-h-[100vh] w-full text-main' style={{zIndex: -10}}>
                <Navbar/>
                <div className='w-[80%] ml-[13%] flex mt-[4rem]'>
                    <div className='w-[15%] flex flex-col gap-[1.5rem] py-[2rem] '>
                        <img src={courseData.image} className='w-[180px] h-[150px] rounded-md' alt=""/>
                        <p className='font-semibold text-[1.1rem]'>{courseData.title}</p>
                        <div className='flex  gap-[1rem] items-center font-medium'>
                            <p>Publisher:</p>
                            {courseData.instructor && (
                                <div className='flex gap-[5px] items-center'>
                                    <img src={profile} alt=""/>
                                    <p className='text-[0.85rem] text-gray'>{courseData.instructor.user.name}</p>
                                </div>
                            )}
                        </div>
                        <div className='flex gap-[1rem] items-center font-medium'>
                            <p>Enrolled BY :</p>
                            <div className='flex items-center gap-[0.5rem]'>
                                <p className='text-[0.9rem]  '>25</p>
                                <img src={students} className='w-[25px] h-[25px]' alt=""/>
                            </div>
                        </div>
                    </div>
                    <div className='w-[60%] flex flex-col gap-[2rem] mt-[2.5rem]'>
                        <div className='flex flex-col gap-[2.5rem] w-[95%] px-[5%]'>
                            <p className='text-gray text-[0.9rem] font-medium'>Things u will learn at this course
                                ...</p>
                            <div className='flex flex-col gap-[0.75rem] px-[1rem]'>
                                {
                                    courseData.chapters &&
                                    courseData.chapters.map(chapter => (
                                        <div key={chapter.id}
                                             className='flex items-center gap-[10px] font-medium text-[0.9rem]'>
                                            <img src={check} alt=""/>
                                            <p>{chapter.title}</p>
                                        </div>
                                    ))
                                }
                            </div>
                            <p className='text-gray text-[0.9rem] font-medium'>Join other students who unrolled this
                                course
                                ...</p>
                            <div className='flex w-full justify-between px-[1rem]'>
                                <div className='flex flex-col gap-[0.75rem] items-center w-[15%]'>
                                    <img src={student} className='w-[50px] h-[50px] rounded-full' alt=""/>
                                    <p className=' font-medium text-[0.85rem]'>IM YOUR ATM</p>
                                </div>
                                <div className='flex flex-col gap-[0.75rem] items-center w-[15%]'>
                                    <img src={student} className='w-[50px] h-[50px] rounded-full' alt=""/>
                                    <p className=' font-medium text-[0.85rem]'>IM YOUR ATM</p>
                                </div>
                                <div className='flex flex-col gap-[0.75rem] items-center w-[15%]'>
                                    <img src={student} className='w-[50px] h-[50px] rounded-full' alt=""/>
                                    <p className=' font-medium text-[0.85rem]'>IM YOUR ATM</p>
                                </div>
                                <div className='flex flex-col gap-[0.75rem] items-center w-[15%]'>
                                    <img src={student} className='w-[50px] h-[50px] rounded-full' alt=""/>
                                    <p className=' font-medium text-[0.85rem]'>IM YOUR ATM</p>
                                </div>
                                <div className='flex flex-col gap-[0.75rem] items-center w-[15%]'>
                                    <img src={student} className='w-[50px] h-[50px] rounded-full' alt=""/>
                                    <p className=' font-medium text-[0.85rem]'>IM YOUR ATM</p>
                                </div>
                                <div className='flex flex-col gap-[0.75rem] items-center w-[15%]'>
                                    <img src={student} className='w-[50px] h-[50px] rounded-full' alt=""/>
                                    <p className=' font-medium text-[0.85rem]'>IM YOUR ATM</p>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className='w-[25%] flex flex-col gap-[2.5rem] mt-[2.5rem]'>
                        <p className='text-gray text-[0.9rem] font-medium'>Course detailed description ...</p>
                        <div className='px-[1rem] w-[90%]'>
                            <p className=' text-[0.85rem] font-medium'>{courseData.description}</p>
                        </div>
                        <div className='flex flex-col gap-[1rem]'>
                            <p className='text-gray font-medium text-[0.9rem]'>Category : </p>
                            {
                                courseData.category && <div
                                    className='mx-[1rem] w-[60%] bg-secondary rounded-md px-[0.75rem] py-[0.4rem] flex items-center justify-center font-medium text-white'>
                                    <p className='text-[0.9rem]'>{courseData.category.name}</p>
                                </div>
                            }

                        </div>
                        <div className='flex flex-col gap-[1rem]'>
                            <p className='text-gray font-medium text-[0.9rem]'>Overall rating : </p>
                            <div className='flex gap-[10px]'>
                                <p className='font-medium underline'>5.00</p>
                                <div className='flex gap-[5px]'>
                                    <img src={rating} className='w-[24px] h-[24px]' alt=""/>
                                    <img src={rating} className='w-[24px] h-[24px]' alt=""/>
                                    <img src={rating} className='w-[24px] h-[24px]' alt=""/>
                                    <img src={rating} className='w-[24px] h-[24px]' alt=""/>
                                    <img src={rating} className='w-[24px] h-[24px]' alt=""/>
                                </div>
                            </div>
                        </div>
                        <div>
                            <button onClick={handleCourseEnrollment}
                                    className='px-[1rem] py-[0.4rem] font-medium text-white text-[0.95rem] bg-primary rounded-lg hover:bg-hovers'>Enroll
                                Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div
                className={`fixed inset-0 w-full h-[100vh] bg-overlay bg-opacity-60 flex items-center justify-center ${!confirmEnrollmentShown && 'hidden'}`}>
                <div className='w-[20%] rounded-lg bg-white h-[300px] relative'>
                    <div
                        className='absolute top-0 left-0 w-full bg-primary h-[40px] rounded-t-lg flex justify-end px-[1rem] items-center'>
                        <img src={close} onClick={handleHidingConfirmationPopup} className='w-[24px] h-[24px] cursor-pointer' alt=""/>
                    </div>
                    <div
                        className='h-full flex flex-col w-full items-center justify-center gap-[1rem]  mt-[1.5rem] py-[1.5rem]'>
                        <img src={confirm} className='w-[75px] h-[75px]' alt=""/>
                        <div className='w-full'>
                            {
                                courseEnrolledSuccess &&
                                <p className='text-green font-medium text-[0.85rem] relative z-100 text-center'>Course
                                    enrolled . Redirecting ...</p>
                            }
                            {
                                courseAlreadyEnrolled &&
                                <p className='text-gray font-medium text-[0.85rem] relative z-100 text-center'>Sorry ! You've
                                    already enrolled this course ...</p>
                            }
                        </div>
                        <div>
                            <p className='text-main text-[0.85rem] font-medium'>Are You sure You want to Enroll this
                                course ? </p>
                        </div>
                        <div className='w-full flex justify-center gap-[0.75rem] mt-[0.5rem] '>
                            <button
                                onClick={handleHidingConfirmationPopup}
                                className='bg-gray text-white font-medium px-[0.6rem] py-[0.3rem] bg-opacity-40 rounded-sm hover:bg-opacity-60'
                            >Cancel
                            </button>
                            <button
                                onClick={confirmCourseEnrollment}
                                className='bg-primary text-white font-medium px-[0.6rem] py-[0.3rem]  rounded-sm hover:bg-opacity-80'
                            >Confirm
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SpecificCoursePage