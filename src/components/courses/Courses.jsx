import Course from "./Course.jsx";
import {useContext} from "react";

import {InstructorDashboardContext} from "../../pages/InstructorDashboard.jsx";


const Courses = () => {


    const {totalPages,page,coursesData,switchToNextPage,switchToPrevPage} = useContext(InstructorDashboardContext);

    return(
        <>
            <div className='flex flex-wrap lg:flex-row w-[80%] justify-center gap-[1.75rem] mx-auto mt-[6rem]'>
                {coursesData.map(course => (
                    <Course key={course.id} course={course} />
                ))}
            </div>
            <div className='w-[80%] mx-auto flex justify-end gap-[1.5rem] mt-[5rem]'>
                {
                    page > 1 && <button
                    onClick={switchToPrevPage}
                    className='px-[0.75rem] bg-secondary py-[0.35rem] rounded-md text-white font-medium flex justify-center items-center hover:bg-secHovers focus:outline-none '>Previous</button>}
                {
                    page < totalPages && <button
                        onClick={switchToNextPage}
                        className='px-[0.75rem] bg-secondary py-[0.35rem] rounded-md text-white font-medium flex justify-center items-center hover:bg-secHovers focus:outline-none'>Next</button>
                }
            </div>
        </>
    )
}

export default Courses