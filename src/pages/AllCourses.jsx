import Navbar from "../components/home/Navbar.jsx";
import Filters from "../components/courses/Filters.jsx";
import Courses from "../components/courses/Courses.jsx";
import PublicCourses from "../components/courses/PublicCourses.jsx";
import {createContext, useEffect, useState} from "react";
import {fetchAllCourses, filterCourses} from "../data/course/courseData.js";
import NoData from "../components/ui/NoData.jsx";

export const PublicCoursesContext = createContext();
const AllCourses = () => {
    const [courses,setCourses] = useState([]);
    const [page,setPage] = useState(1);
    const [totalPages,setTotalPages] = useState(0);
    const [searchTerm,setSearchTerm] = useState('');

    const fetchCourses = async () => {
        const res = await fetchAllCourses(page);
        if ( res.data.case === 'success' ){
            setCourses(res.data.courses.data);
            setTotalPages(res.data.courses.last_page);
        }
        else {
            console.log(res.message)
        }
    }

    const filterCoursesByTerm = async () => {
        const res = await filterCourses(searchTerm,page);
        if ( res.data.case === 'success' ){
            setCourses(res.data.courses.data);
            setTotalPages(res.data.courses.last_page);
        }
        else if ( res.data.case === 'empty' ){
            setCourses([]);
            setTotalPages(0);
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

    useEffect(() => {
        if (searchTerm) {
            filterCoursesByTerm();
        } else {
            fetchCourses();
        }
    }, [searchTerm]);


    const contextValues = {
        courses,
        setCourses,
        page,
        switchToNextPage,
        switchToPrevPage,
        totalPages,
        setSearchTerm
    }

    return(
        <PublicCoursesContext.Provider value={contextValues}>
            <div className='bg-background min-h-[100vh] w-full text-main' style={{zIndex: -10}}>
                <Navbar/>
                <Filters/>
                <PublicCourses/>
                {
                    courses.length === 0 && <NoData/>
                }
            </div>
        </PublicCoursesContext.Provider>
    )
}
export default AllCourses