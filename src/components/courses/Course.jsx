import node from "../../assets/node.png";
import students from "../../assets/students.png";
import star from "../../assets/star.png";
import deleleIcon from '../../assets/delete.png'
import edit from '../../assets/edit.png'

const Course = ({belongsToInstructorDashboard}) => {
    const isInInstructorDashboard = belongsToInstructorDashboard;
    return (
        <div className='rounded-lg flex flex-col gap-[1rem] w-[18.5%]'>
            <img src={node} className='w-full rounded-lg h-[200px] object-cover' alt="course image"/>
            <div className=''>
                <div className='flex flex-col gap-[0.25rem]'>
                    <p className='font-medium'>INTRODUCTION TO NODE.JS</p>
                    <p className='text-gray text-[0.85rem] font-semibold'>A beginner friendly Course about
                        mern
                        , no required
                        knowledge , and covering all the important topics about node .</p>
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
                        {
                            !isInInstructorDashboard ? (
                                <>
                                    <button className='px-[1rem] py-1 rounded-lg bg-primary text-white font-medium hover:bg-hovers'>
                                        Details
                                    </button>
                                </>
                            ) : (
                                <>
                                    <img src={edit} className='w-[25px] h-[25px] cursor-pointer' alt=""/>
                                    <img src={deleleIcon} className='w-[25px] h-[25px] cursor-pointer' alt=""/>
                                </>
                            )
                        }
                    </div>
                </div>


            </div>
        </div>
    )
}

export default Course