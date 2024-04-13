import topic from "../../assets/topic.png";
import empty from "../../assets/empty.png";
import {useState} from "react";


const CourseCreationThirdStep = () => {
    const [topics,setTopics] = useState([]);
    return (
        <div className='h-[90%] mt-[5%] flex flex-col gap-[2rem] '>
            <div className='flex flex-col gap-[0.75rem] items-center'>
                <img src={topic} className='w-[70px] h-[70px]' alt=""/>
                <p className='text-gray text-[0.95rem] font-medium'>Then , Lets add Topics for each of your chapters...</p>
            </div>
            <div className='flex w-full justify-center gap-[1.5rem]'>
                <input type="text" placeholder='Chapter Title'
                       name='title'
                       className='bg-slate w-[27.5%] bg-opacity-40 text-[0.9rem] px-[1rem] py-[0.6rem] rounded-xl text-main focus:outline-none'/>
                <button
                    className='bg-secondary text-white font-medium hover:bg-secHovers px-[0.5rem] py-[0.25rem] rounded-md'>+
                    Add Topic
                </button>
            </div>
            <div className='w-full min-h-[200px] mt-[2rem]'>
                <div className='w-full flex items-center justify-center'>
                    {topics.length === 0 &&
                        <div className='flex flex-col gap-[0.75rem] items-center w-full'>
                            <img src={empty} className='h-[50px] w-[50px]' alt=""/>
                            <p className='text-gray font-medium text-[0.9rem]'>This Chapter doesn't have any topics yet !</p>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}
export default CourseCreationThirdStep