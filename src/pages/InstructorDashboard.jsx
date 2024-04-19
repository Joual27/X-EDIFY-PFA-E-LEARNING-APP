import Navbar from "../components/home/Navbar.jsx";
import Courses from "../components/courses/Courses.jsx";
import CourseCreation from "../components/courses/CourseCreation.jsx"
import {createContext, useContext, useEffect, useState} from "react";
import {deleteCourse, fetchCourseOnCreation, fetchCoursesOfInstructor} from "../data/course/courseData.js";
import {useUser} from "../hooks/contexts/UserContext.jsx";
import close from '../assets/close.png'
import confirmDelete from '../assets/confirmDelete.png'



export const InstructorDashboardContext = createContext();
const InstructorDashboard = () => {
    const {user} = useUser();
    const [onCourseCreation,setOnCourseCreation] = useState(false);
    const [hasCourse,setHasCourse] = useState(false);
    const [courseDeletedSuccess , setCourseDeletedSuccess] = useState(false);
    const [courseToDelete, setCourseToDelete] = useState(null);
    const [confirmDeleteShown,setConfirmDeleteShown] = useState(false)
    const [coursesData,setCoursesData] = useState([]);
    const [page,setPage] = useState(1);
    const [totalPages,setTotalPages] = useState(0);

    const fetchCourses = async () => {
        const res = await fetchCoursesOfInstructor( user.instructor.id , page);
        if ( res.data.case === 'success' ){
            setCoursesData(res.data.courses.data);
            setTotalPages(res.data.courses.last_page);
        }
        else {
            console.log(res.message)
        }
    }
    const checkForCourseOnCreation = async () => {
        const res = await fetchCourseOnCreation(user.instructor.id);
        if(res.data.case === 'success'){
            setHasCourse(true);
        }
    }
    const handleCourseDelete = async () => {
        const res = await deleteCourse(courseToDelete);
        if (res.data.case === 'success'){
            setCourseDeletedSuccess(true);
            setCourseToDelete(null);
            setConfirmDeleteShown(false)
            fetchCourses()
        }
    }


    const switchToNextPage = () => {
        setPage(page + 1 );
    }
    const switchToPrevPage = () => {
        setPage(page -  1 );
    }
    const hideCourseDeletionConfirmation = () => {
        setConfirmDeleteShown(false)
        setCourseToDelete(null)
    }
    const hideInterface = () => {
        setHasCourse(false);
        setOnCourseCreation(false)
    }
    const showCourseCreationPopup = () => {
        setOnCourseCreation(true);
    }

    useEffect(() => {
        if (courseDeletedSuccess === true) {
            const timer = setTimeout(() => {
                setCourseDeletedSuccess(false);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [courseDeletedSuccess]);


    useEffect(() => {
        fetchCourses();
    }, [page]);

    useEffect(() => {
        checkForCourseOnCreation();
        fetchCourses()
    }, []);


    const contextValues = {
        courseDeletedSuccess,
        setCourseDeletedSuccess,
        setCourseToDelete,
        setConfirmDeleteShown,
        page,
        setPage,
        coursesData,
        totalPages,
        switchToNextPage,
        switchToPrevPage

    };

    return(
        <InstructorDashboardContext.Provider value={contextValues}>
              <div className='bg-background min-h-[100vh] w-full text-main' style={{zIndex: -10}}>
                  <Navbar/>
                  <div className='flex w-[80%] mx-auto justify-between pt-[5rem] pl-[1rem]'>
                      <p className='font-medium text-gray'>Take a look at the courses you've already published ...</p>
                      <button
                          onClick={showCourseCreationPopup}
                          className='px-[0.7rem] py-[0.35rem] bg-primary rounded-lg text-white font-medium hover:bg-hovers'>Create
                          new course
                      </button>
                  </div>
                  {
                      courseDeletedSuccess && <div
                          className='w-[25%] h-[40px] bg-green flex items-center justify-center rounded-lg text-white font-medium mx-auto'>
                          Course Deleted Successfully !
                      </div>
                  }
                  <Courses />
              </div>
              <div className={`fixed inset-0 w-full h-[100vh] bg-overlay bg-opacity-60 flex items-center justify-center ${(!onCourseCreation && !hasCourse) && 'hidden'}`}>
                  <CourseCreation hideInterface={hideInterface}/>
              </div>


              <div className={`fixed inset-0 w-full h-[100vh] bg-overlay bg-opacity-60 flex items-center justify-center ${!confirmDeleteShown && 'hidden'}`}>
                  <div className='w-[20%] rounded-lg bg-white h-[250px] relative'>
                      <div className='absolute top-0 left-0 w-full bg-primary h-[40px] rounded-t-lg flex justify-end px-[1rem] items-center'>
                          <img src={close} className='w-[24px] h-[24px] cursor-pointer' alt=""/>
                      </div>
                      <div className='h-full flex flex-col w-full items-center justify-center gap-[1rem] py-[0.5rem]'>
                          <img src={confirmDelete} className='w-[75px] h-[75px]' alt=""/>
                          <div>
                              <p className='text-main text-[0.85rem] font-medium'>Are You sure You want to delete this course ? </p>
                          </div>
                          <div className='w-full flex justify-center gap-[0.75rem] mt-[0.5rem]'>
                               <button className='bg-gray text-white font-medium px-[0.6rem] py-[0.3rem] bg-opacity-40 rounded-sm hover:bg-opacity-60' onClick={hideCourseDeletionConfirmation}>Cancel</button>
                               <button className='bg-red text-white font-medium px-[0.6rem] py-[0.3rem] bg-opacity-60 rounded-sm hover:bg-opacity-80' onClick={handleCourseDelete}>Confirm</button>
                          </div>
                      </div>
                  </div>
              </div>
        </InstructorDashboardContext.Provider>
      )
}

export default InstructorDashboard