
import node from '../../assets/node.png'

import students from '../../assets/students.png'
import star from '../../assets/star.png'
import arrow from '../../assets/right-arrow.png'
import Course from "../courses/Course.jsx";
import {Link} from "react-router-dom";


export default function HomeCourses(){
    return(
        <div>
            <div className='py-[4rem] flex flex-col gap-[3rem] w-full'>
                <div>
                    <h1 className='font-medium text-xl lg:text-2xl text-center'>Recommended Courses ...</h1>
                </div>
                <div className='flex flex-col lg:flex-row w-[80%] lg:justify-between mx-auto'>
                    <Course belongsToInstructorDashboard={false}/>
                    <Course belongsToInstructorDashboard={false}/>
                    <Course belongsToInstructorDashboard={false}/>
                    <Course belongsToInstructorDashboard={false}/>
                    <Course belongsToInstructorDashboard={false}/>
                </div>
                <div className='flex w-[80%] mx-auto justify-center lg:justify-end py-[2rem]'>
                    <Link to='/courses/all'>
                        <button
                            className='bg-secondary flex gap-[3px] text-white font-medium px-[1rem] py-[0.45rem] rounded-lg mb-[4rem]'>
                            <img src={arrow} className='w-[24px] h-[24px]' alt=""/>
                            <p> View All Courses</p>
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
