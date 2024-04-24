import Navbar from "../components/home/Navbar.jsx";

import {createContext, useEffect, useState} from "react";
import {useUser} from "../hooks/contexts/UserContext.jsx";
import {fetchCoursesOfStudent} from "../data/course/studentData.js";
import StudentCourses from "../components/courses/StudentCourses.jsx";




export const StudentDashboardContext = createContext();
const StudentDashboard = () => {
    const {user} = useUser();
    const [courses,setCourses] = useState([]);
    const [page,setPage] = useState(1);
    const [totalPages,setTotalPages] = useState(0);

    const fetchCourses = async () => {
        const res = await fetchCoursesOfStudent(user.student.id,page);
        if ( res.data.case === 'success' ){
            setCourses(res.data.courses.data);
            setTotalPages(res.data.courses.last_page);
        }
        else if (res.data.case === 'empty'){
            setCourses([]);
        }
        else {
            console.log(res.message)
        }
    }

    const switchToNextPage = () => {
        setPage(page + 1 );
    }
    const switchToPrevPage = () => {
        setPage(page -  1 );
    }

    useEffect(() => {
        fetchCourses();
    }, [page]);

    useEffect(() => {
        fetchCourses()
    }, []);

    const contextValues = {
        courses,
        page,
        totalPages,
        switchToNextPage,
        switchToPrevPage
    }

    return(
        <StudentDashboardContext.Provider value={contextValues}>
            <div className='bg-background min-h-[100vh] w-full text-main' style={{zIndex: -10}}>
                <Navbar/>
                <div className='w-full flex flex-col gap-[4rem] mt-[7rem] items-center'>
                    <p className='text-xl text-main font-medium text-center underline'>My Courses</p>
                </div>
                <StudentCourses/>

            </div>
        </StudentDashboardContext.Provider>
    )
}


export default StudentDashboard