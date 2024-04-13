
import instructor from '../../assets/instructor.png'
import {useUser} from "../../hooks/contexts/UserContext.jsx";

const CourseCreationFirstStep = () => {
    const {user} = useUser();
    return(
        <div className='h-[90%] mt-[5%] flex flex-col gap-[2rem] '>
           <div className='flex flex-col gap-[0.75rem] items-center'>
               <img src={instructor} className='w-[70px] h-[70px]' alt=""/>
               <p className='text-2xl font-medium text-main'>Hello , Mr. <span className='text-primary'>{user.name}</span> . Let's start the process of course creation .</p>
               <p className='text-gray text-[0.95rem] font-medium'>First Fill Your Course Infos ...</p>
           </div>
            <form className='w-[80%] ml-[15%] flex flex-wrap items-center gap-[1rem] '>
                <input type="text" placeholder='Course Title'
                       name='title'
                       className='bg-slate w-[27.5%] bg-opacity-40 text-[0.9rem] px-[1rem] py-[0.6rem] rounded-xl text-main focus:outline-none'/>
                <input type="text" placeholder='Description'
                       name='name'
                       className='bg-slate w-[27.5%] bg-opacity-40 text-[0.9rem] px-[1rem] py-[0.6rem] rounded-xl text-main focus:outline-none'/>
                <select name="category_id"
                        className='bg-slate w-[27.5%] bg-opacity-40 text-[0.9rem] px-[1rem] py-[0.75rem] rounded-xl text-main focus:outline-none'>
                    <option>Course Category</option>
                </select>
                <div className='w-[80%] flex ml-[15%] gap-[1rem]'>
                    <input type="text" placeholder='Max Duration'
                           name='max-duration'
                           className='bg-slate w-[27.5%] bg-opacity-40 text-[0.9rem] px-[1rem] py-[0.6rem] rounded-xl text-main focus:outline-none'/>
                    <select name="duration_type"
                            className='bg-slate w-[27.5%] bg-opacity-40 text-[0.9rem] px-[1rem] py-[0.75rem] rounded-xl text-main focus:outline-none'>
                        <option value=''>Duration type</option>
                        <option value='hours'>Hours</option>
                        <option value='days'>Days</option>
                    </select>
                </div>
            </form>
        </div>
    )
}

export default CourseCreationFirstStep