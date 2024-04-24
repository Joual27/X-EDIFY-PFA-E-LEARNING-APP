import { useState, useEffect } from "react";
import {useUser} from "../../hooks/contexts/UserContext.jsx";
import {fetchEnrollmentData, isCourseCompleted} from "../../data/course/studentData.js";
import Loading from "../loading/Loading.jsx";
import {Link} from "react-router-dom";

const StudentCourse = ({ course }) => {
    const [remainingTime, setRemainingTime] = useState(0);
    const {user} = useUser();
    const [enrollmentData,setEnrollmentData] = useState([]);
    const [isLoading,setIsLoading] = useState(true);
    const [isCompleted,setIsCompleted] = useState(false);

    const bringEnrollmentData = async () => {
        try {
            const res = await fetchEnrollmentData(course.id, user.student.id);
            if (res.data.case === 'success') {
                setEnrollmentData(res.data.enrollment);
            } else {
                console.log(res.data.message);
            }
        } catch (error) {
            console.error("Error fetching enrollment data:", error);
        }
    };


    const checkForCourseCompletion = async () => {
        const res = await isCourseCompleted(course.id,user.student.id);
        if ( res.data.case === 'success' ) {
            if(res.data.state === true){
                setIsCompleted(true)
            }
        }
        else{
            console.log(res.data.message)
        }

    }

    useEffect(() => {
        bringEnrollmentData();
        checkForCourseCompletion()
    }, []);

    useEffect(() => {
        if (enrollmentData) {
            const maxDuration = parseInt(course.max_duration);
            if (!isNaN(maxDuration)) {
                const expirationTime = new Date(enrollmentData.created_at);
                expirationTime.setMinutes(expirationTime.getMinutes() + maxDuration);
                const currentTime = new Date();
                const timeDifference = expirationTime - currentTime;
                setRemainingTime(Math.max(Math.floor(timeDifference / (1000 * 60)), 0));
            } else {
                setRemainingTime(-1);
            }
        }
        setTimeout(() => {
            setIsLoading(false);
        },500)
    }, [enrollmentData]);

    return (
            <div className='rounded-lg flex flex-col gap-[1rem] w-[18.5%]'>
            <img src={course.image} className='w-full rounded-lg h-[200px] object-cover' alt="course image"/>
            <div className=''>
                <div className='flex flex-col items-center gap-[0.25rem]'>
                    <p className='font-medium'>{course.title}</p>
                    <p className='text-gray text-[0.85rem] font-semibold'>{course.description}</p>
                    <div className='flex gap-[7.5px] items-center'>
                        <p className='text-primary font-medium text-[0.9rem] underline'>Expires in</p>
                        <p className='text-main font-medium text-[0.9rem]'>{remainingTime > 0 ? `${Math.floor(remainingTime / 60)}H ${remainingTime % 60}MIN` : 'Expired'}</p>
                    </div>
                </div>
                <div className='py-[1rem] flex gap-[1.5rem] items-center'>
                    <div className='flex gap-[0.5rem] justify-center w-full'>
                        {
                            isCompleted ?
                                (
                                    <button
                                        className='px-[0.5rem] py-[0.25rem] rounded-sm bg-green bg-opacity-50 text-white font-medium'
                                        disabled={true}>
                                        Completed
                                     </button>
                                ) : (
                                    remainingTime <= 0 ?
                                        <button
                                            className='px-[0.5rem] py-[0.25rem] rounded-sm bg-gray bg-opacity-50 text-white font-medium'
                                            disabled={true}>
                                            Expired
                                        </button>

                                        :

                                        <Link to={`/course/content/${course.id}`}>
                                            <button
                                                className='px-[0.5rem] py-[0.25rem] rounded-sm bg-primary text-white font-medium hover:bg-opacity-70'>
                                                Go To Course
                                            </button>
                                        </Link>
                                )

                        }


                    </div>
                </div>
            </div>
            </div>
    )
}

export default StudentCourse;
