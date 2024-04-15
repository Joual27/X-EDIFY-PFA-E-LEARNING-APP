import topic from "../../assets/topic.png";
import empty from "../../assets/empty.png";
import {useContext, useState , useEffect} from "react";
import {CourseCreationContext} from "./CourseCreation.jsx";
import deleteIcon from "../../assets/delete.png";


const CourseCreationThirdStep = () => {
    const {courseData} = useContext(CourseCreationContext);
    const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
    const [currentChapter, setCurrentChapter] = useState(courseData.chapters[currentChapterIndex]);


    useEffect(() => {
        const index = courseData.chapters.findIndex(chapter => chapter.topics.length < 3);
        setCurrentChapterIndex(index);
    }, [courseData]);

    return (
        <div className='h-[90%] mt-[5%] flex flex-col gap-[2rem] '>
            <div className='flex flex-col gap-[0.75rem] items-center'>
                <img src={topic} className='w-[70px] h-[70px]' alt=""/>
                <p className='text-gray text-[0.95rem] font-medium'>Then , Lets add Topics for each of your chapters...</p>
            </div>
            <div className=' w-full'>
                <form className='flex w-full justify-center gap-[1.5rem]' method='POST'>
                    <input type="text" placeholder='Topic Title'
                           name='title'
                           className='bg-slate w-[27.5%] bg-opacity-40 text-[0.9rem] px-[1rem] py-[0.6rem] rounded-xl text-main focus:outline-none'/>
                    <button
                        className='bg-secondary text-white font-medium hover:bg-secHovers px-[0.5rem] py-[0.25rem] rounded-md'>+
                        Add Topic
                    </button>
                </form>
            </div>
            <div className='w-full min-h-[350px] mt-[2rem]'>
                <p className='text-primary font-semibold text-xl text-center mb-[3rem]'>Chapter {currentChapterIndex + 1}
                    <span
                        className='text-main'> {currentChapter.title}</span></p>
                <div className='w-full flex items-center justify-center mb-[3rem]'>
                    {currentChapter.topics.length === 0 ? (
                        <div className='flex flex-col gap-[0.75rem] items-center w-full'>
                            <img src={empty} className='h-[50px] w-[50px]' alt=""/>
                            <p className='text-gray font-medium text-[0.9rem]'>This Chapter doesn't have any topics yet
                                !</p>
                        </div>
                    ) : (
                        <div className='flex flex-col gap-[0.75rem] items-center w-full'>
                            {
                                currentChapter.topics.map(topic => (
                                    <div key={topic.id} className='flex w-[50%] justify-between'>
                                        <p className='text-main text-[0.9rem] font-medium'>{topic.title}</p>
                                        <img src={deleteIcon} className='w-[30px] cursor-pointer h-[30px]' alt=""/>
                                    </div>
                                ))
                            }
                        </div>
                    )
                    }
                </div>
                {
                    currentChapter.topics.length < 3 &&
                    <div className='my-[1rem] flex justify-end w-full px-[25%] text-red text-[0.85rem] font-semibold'>
                        <p>Min 3 topics</p>
                    </div>
                }
                <div className='flex w-full justify-end gap-[1rem] px-[25%]'>
                    {
                        currentChapterIndex !== 0 &&
                        <button
                            className='px-[0.4rem] py-[0.15rem] rounded-sm bg-secondary hover:bg-hovers text-white font-medium'>previous chapter
                        </button>
                    }
                    {
                        currentChapterIndex < courseData.chapters.length &&
                        <button
                            className='px-[0.4rem] py-[0.15rem] rounded-sm bg-secondary hover:bg-hovers text-white font-medium'>next
                            chapter
                        </button>
                    }
                </div>
            </div>
        </div>
    )
}
export default CourseCreationThirdStep