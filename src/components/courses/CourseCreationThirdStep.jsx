import topic from "../../assets/topic.png";
import empty from "../../assets/empty.png";
import {useContext, useState , useEffect} from "react";
import {CourseCreationContext} from "./CourseCreation.jsx";
import deleteIcon from "../../assets/delete.png";
import {createTopic, deleteTopic} from "../../data/course/courseData.js";
import loading from "../loading/Loading.jsx";
import Loading from "../loading/Loading.jsx";


const CourseCreationThirdStep = () => {
    const {courseData,syncCourseData} = useContext(CourseCreationContext);
    const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
    const [currentChapter, setCurrentChapter] = useState(courseData.chapters[currentChapterIndex]);
    const [topicCreatedSuccess,setTopicCreatedSuccess] = useState(false);
    const [topicDeletedSuccess,setTopicDeletedSuccess] = useState(false);
    const [errors,setErrors] = useState([]);
    const [isLoading,setIsLoading] = useState(true);
    const [topicData,setTopicData] = useState({});
    const handleChange = (e) => {
        setTopicData({
            ...topicData,
            [e.target.name] : e.target.value
        })
    }

    const switchToPreviousChapter = () => {
       setCurrentChapterIndex(currentChapterIndex-1);
        setCurrentChapter(courseData.chapters[currentChapterIndex - 1]);
    }
    const switchToNextChapter = () => {
        if (currentChapter.topics.length >= 3){
            setCurrentChapterIndex(currentChapterIndex+1);
            setCurrentChapter(courseData.chapters[currentChapterIndex + 1]);
        }
    }
    const handleTopicCreation = async (e) => {
        e.preventDefault();
        const res = await createTopic(topicData);
        if(res.data.case === 'success'){
            setTopicCreatedSuccess(true);
            syncCourseData();
            document.getElementById('addTopicBtn').value = ''
        }
        else if (res.data.case === 'validation_error'){
            setErrors(res.data.errors);
        }
    }


    const handleTopicDeletion = async (e) => {
        let topicId = e.target.dataset.id;
        const res = await deleteTopic(topicId);
        if(res.data.case === 'success'){
            setTopicDeletedSuccess(true)
            syncCourseData();
        }
        else{
            console.log(res.data.message);
        }
    }

    useEffect(() => {
      if(courseData && courseData.chapters){
          const index = courseData.chapters.findIndex(chapter => chapter.topics.length < 3);
          if(index){
              setCurrentChapterIndex(index);
          }
          else{
              setCurrentChapterIndex(0);
          }
      }
    }, []);

    useEffect(() => {
        setTopicData({
            'chapter_id': currentChapter.id
        });
        if (courseData && currentChapterIndex !== null && courseData.chapters[currentChapterIndex]) {
            setCurrentChapter(courseData.chapters[currentChapterIndex]);
            setIsLoading(false);
        }
    }, [currentChapterIndex,courseData]);



    useEffect(() => {
        if (topicCreatedSuccess === true) {
            const timer = setTimeout(() => {
                setTopicCreatedSuccess(false);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [topicCreatedSuccess]);

    useEffect(() => {
        if (topicDeletedSuccess === true) {
            const timer = setTimeout(() => {
                setTopicDeletedSuccess(false);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [topicDeletedSuccess]);


    useEffect(() => {
        if(errors){
            const timer = setTimeout(() => {
                setErrors([]);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [errors]);

    useEffect(() => {
        syncCourseData();
    }, []);

    return (
        <>
            {
                !isLoading && <div className='h-[90%] mt-[5%] flex flex-col gap-[2rem] '>
                    <div className='flex flex-col gap-[0.75rem] items-center'>
                        <img src={topic} className='w-[70px] h-[70px]' alt=""/>
                        <p className='text-gray text-[0.95rem] font-medium'>Then , Lets add Topics for each of your
                            chapters...</p>
                    </div>
                    {
                        topicCreatedSuccess &&
                        <div
                            className='w-[35%] mx-auto rounded-md bg-green py-[0.5rem] flex items-center justify-center text-white font-medium text-[0.9rem]'>
                            <p>Topic created successfully !</p>
                        </div>
                    }
                    {
                        topicDeletedSuccess &&
                        <div className='w-[35%] mx-auto rounded-md bg-red py-[0.5rem] flex items-center justify-center text-white font-medium text-[0.9rem]'>
                            <p>Chapter deleted successfully !</p>
                        </div>
                    }
                    {Object.keys(errors).length > 0 && (
                        <div
                            className="bg-secRed text-white text-[0.85rem] font-medium w-[30%] mx-auto py-[0.5rem] rounded-lg px-[5%] mb-[1rem]">
                            {Object.entries(errors).map(([field, messages]) => (
                                messages.map((message, index) => (
                                    <p key={`${field}-${index}`}>{message}</p>
                                ))
                            ))}
                        </div>
                    )}
                    <div className=' w-full'>
                        <form className='flex w-full justify-center gap-[1.5rem]' method='POST'
                              onSubmit={handleTopicCreation}>
                            <input type="text" placeholder='Topic Title'
                                   id='addTopicBtn'
                                   onChange={handleChange}
                                   name='title'
                                   className='bg-slate w-[27.5%] bg-opacity-40 text-[0.9rem] px-[1rem] py-[0.6rem] rounded-xl text-main focus:outline-none'/>
                            <button
                                className='bg-secondary text-white font-medium hover:bg-secHovers px-[0.5rem] py-[0.25rem] rounded-md'>+
                                Add Topic
                            </button>
                        </form>
                    </div>
                    <div className='w-full min-h-[450px] mt-[2rem]'>
                        <p className='text-primary font-semibold text-xl text-center mb-[3rem]'>Chapter {currentChapterIndex + 1}
                            <span
                                className='text-main'> {currentChapter.title}</span></p>
                        <div className='w-full flex items-center justify-center mb-[3rem]'>
                            {currentChapter.topics.length === 0 ? (
                                <div className='flex flex-col gap-[0.75rem] items-center w-full'>
                                    <img src={empty} className='h-[50px] w-[50px]' alt=""/>
                                    <p className='text-gray font-medium text-[0.9rem]'>This Chapter doesn't have any
                                        topics
                                        yet
                                        !</p>
                                </div>
                            ) : (
                                <div className='flex flex-col gap-[0.75rem] items-center w-full'>
                                    {
                                        currentChapter.topics.map(topic => (
                                            <div key={topic.id} className='flex w-[50%] justify-between'>
                                                <p className='text-main text-[0.9rem] font-medium'>{topic.title}</p>
                                                <img src={deleteIcon} onClick={handleTopicDeletion} data-id={topic.id} className='w-[30px] cursor-pointer h-[30px]'
                                                     alt=""/>
                                            </div>
                                        ))
                                    }
                                </div>
                            )
                            }
                        </div>
                        {
                            currentChapter.topics.length < 3 &&
                            <div
                                className='my-[1rem] flex justify-end w-full px-[25%] text-red text-[0.85rem] font-semibold'>
                                <p>Min 3 topics</p>
                            </div>
                        }
                        <div className='flex w-full justify-end gap-[1rem] px-[25%]'>
                            {
                                currentChapterIndex !== 0 &&
                                <button
                                    className='px-[0.4rem] py-[0.15rem] rounded-sm bg-secondary hover:bg-hovers text-white font-medium'
                                    onClick={switchToPreviousChapter}
                                >
                                    previous chapter
                                </button>
                            }
                            {
                                currentChapterIndex !== courseData.chapters.length - 1 &&
                                <button
                                    onClick={switchToNextChapter}
                                    className='px-[0.4rem] py-[0.15rem] rounded-sm bg-secondary hover:bg-hovers text-white font-medium'>next
                                    chapter
                                </button>
                            }
                        </div>
                    </div>
                </div>
            }

        </>
    )
}
export default CourseCreationThirdStep