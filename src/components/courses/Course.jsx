import node from "../../assets/node.png";
import students from "../../assets/students.png";
import star from "../../assets/star.png";
import deleleIcon from '../../assets/delete.png'
import edit from '../../assets/edit.png'
import {useContext} from "react";
import {InstructorDashboardContext} from "../../pages/InstructorDashboard.jsx";

const Course = ({course }) => {

    const {setCourseToDelete,setConfirmDeleteShown} = useContext(InstructorDashboardContext);

    const handleDeleteBtnClick = (course_id) => {
        setCourseToDelete(course_id);
        setConfirmDeleteShown(true);
    }

    return (
        <div className='rounded-lg flex flex-col gap-[1rem] w-[18.5%]'>
            <img src={course.image} className='w-full rounded-lg h-[200px] object-cover' alt="course image"/>
            <div className=''>
                <div className='flex flex-col gap-[0.25rem]'>
                    <p className='font-medium'>{course.title}</p>
                    <p className='text-gray text-[0.85rem] font-semibold'>{course.description}</p>
                </div>
                <div className='py-[1rem] flex gap-[1.5rem] items-center'>
                    <div className='flex gap-[7.5px] items-center'>
                        <img src={students} className='w-[25px] h-[25px]' alt="students icon"/>
                        <p className='font-bold text-[0.8rem]'>25</p>
                    </div>
                    <div className='flex'>
                        <img src={star} className='w-[25px] h-[25px]' alt="review star"/>
                        <img src={star} className='w-[25px] h-[25px]' alt="review star"/>
                        <img src={star} className='w-[25px] h-[25px]' alt="review star"/>
                        <img src={star} className='w-[25px] h-[25px]' alt="review star"/>
                        <img src={star} className='w-[25px] h-[25px]' alt="review star"/>
                    </div>
                    <div className='flex gap-[0.5rem]'>
                        <img src={deleleIcon} onClick={() => handleDeleteBtnClick(course.id)} className='w-[25px] h-[25px] cursor-pointer' alt=""/>
                    </div>
                </div>
            </div>
        </div>
    )
}


//
// !belongsToInstructorDashboard ? (
//     <>
//         <button className='px-[1rem] py-1 rounded-lg bg-primary text-white font-medium hover:bg-hovers'>
//             Details
//         </button>
//     </>
// ) : (
//     <>

export default Course