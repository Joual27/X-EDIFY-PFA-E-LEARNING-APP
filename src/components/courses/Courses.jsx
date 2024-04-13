import Course from "./Course.jsx";
import {useState} from "react";


const Courses = ({belongsToInstructorDashboard}) => {
    return(
        <>
            <div className='flex flex-wrap lg:flex-row w-[80%] justify-between mx-auto mt-[6rem]'>
                <Course belongsToInstructorDashboard={belongsToInstructorDashboard}/>
                <Course belongsToInstructorDashboard={belongsToInstructorDashboard}/>
                <Course belongsToInstructorDashboard={belongsToInstructorDashboard}/>
                <Course belongsToInstructorDashboard={belongsToInstructorDashboard}/>
                <Course belongsToInstructorDashboard={belongsToInstructorDashboard}/>
            </div>
            <div className='w-[80%] mx-auto flex justify-end gap-[1.5rem] mt-[5rem]'>
                <button className='px-[0.75rem] bg-secondary py-[0.35rem] rounded-md text-white font-medium flex justify-center items-center hover:bg-secHovers'>Previous</button>
                <button className='px-[0.75rem] bg-secondary py-[0.35rem] rounded-md text-white font-medium flex justify-center items-center hover:bg-secHovers'>Next</button>
            </div>
        </>
    )
}

export default Courses