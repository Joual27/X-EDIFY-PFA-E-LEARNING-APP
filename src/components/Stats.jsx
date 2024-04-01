import course from '../assets/course.png'
import student from '../assets/audience.png'
import teacher from '../assets/teacher.png'
import locations from '../assets/countries.png'

export default function Stats(){

    return(
        <div
            className='h-[30vh] w-[90%] mx-auto lg:h-[25vh] flex lg:gap-[25px] items-center lg:justify-center lg:mx-auto lg:text-[1.3rem] lg:font-semibold lg:pb-[5rem]'>
            <div className=' lg:flex lg:gap-[0.5rem] lg:items-center'>
                <img src={course} className='w-[50px] h-[50px]' alt=""/>
                <p>+ 120 Courses</p>
            </div>
            <div className='lg:bg-main lg:h-[70px] lg:w-[2px] lg:rounded-lg'></div>
            <div className='lg:flex lg:gap-[0.5rem] lg:items-center'>
                <img src={student} className='w-[50px] h-[50px]' alt=""/>
                <p>+ 1000 Students</p>
            </div>
            <div className='lg:bg-main lg:h-[70px] lg:w-[2px] lg:rounded-lg'></div>
            <div className='lg:flex lg:gap-[0.5rem] lg:items-center'>
                <img src={teacher} className='w-[50px] h-[50px]' alt=""/>
                <p>+ 50 Instructors</p>
            </div>
            <div className='lg:bg-main lg:h-[70px] lg:w-[2px] lg:rounded-lg'></div>
            <div className='lg:flex lg:gap-[0.5rem] lg:items-center'>
                <img src={locations} className='w-[50px] h-[50px]' alt=""/>
                <p>+ 30 Countries</p>
            </div>
        </div>

    )
}