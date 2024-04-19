
import PublicCourse from "./PublicCourse.jsx";
import {useContext} from "react";
import {PublicCoursesContext} from "../../pages/AllCourses.jsx";


const PublicCourses = () => {

    const {courses,page,totalPages,switchToNextPage,switchToPrevPage} = useContext(PublicCoursesContext);

    return (
        <>
            <div className='flex flex-wrap lg:flex-row w-[80%] justify-center gap-[1.75rem] mx-auto mt-[6rem]'>
                {
                    courses.map(course => <PublicCourse key={course.id} course={course}/>)
                }
            </div>
            <div className='w-[80%] mx-auto flex justify-end gap-[1.5rem] mt-[5rem]'>
                {
                    page > 1 && totalPages !== 0 && <button
                        onClick={switchToPrevPage}
                        className='px-[0.75rem] bg-secondary py-[0.35rem] rounded-md text-white font-medium flex justify-center items-center hover:bg-secHovers focus:outline-none '>Previous</button>
                }
                {
                    page < totalPages && <button
                        onClick={switchToNextPage}
                        className='px-[0.75rem] bg-secondary py-[0.35rem] rounded-md text-white font-medium flex justify-center items-center hover:bg-secHovers focus:outline-none '>Next</button>
                }
            </div>
        </>
    )

}


export default PublicCourses