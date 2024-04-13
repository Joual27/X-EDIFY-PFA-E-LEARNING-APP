import Navbar from "../components/home/Navbar.jsx";
import Courses from "../components/courses/Courses.jsx";
import CourseCreation from "../components/courses/CourseCreation.jsx"
import {useState} from "react";

const InstructorDashboard = () => {

    const [onCourseCreation,setOnCourseCreation] = useState(false);

      const showCourseCreationPopup = () => {
          setOnCourseCreation(true);
      }

      return(
          <>
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
                  <Courses belongsToInstructorDashboard={true}/>
              </div>
              <div className={`fixed inset-0 w-full h-[100vh] bg-overlay bg-opacity-60 flex items-center justify-center ${!onCourseCreation && 'hidden'}`}>
                  <CourseCreation/>
              </div>
          </>
      )
}

export default InstructorDashboard