import chapter from '../../assets/chapters.png'
import empty from '../../assets/empty.png'
import {useContext, useEffect, useState} from "react";
import {CourseCreationContext} from "./CourseCreation.jsx";
import deleteIcon from '../../assets/delete.png'
import {createChapter, deleteChapter} from "../../data/course/courseData.js";
import spinner from '../../assets/loading.gif'

const CourseCreationSecondStep = () =>{
    const {courseData,syncCourseData,setValidData} = useContext(CourseCreationContext);
    const [errors,setErrors] = useState([]);
    const [chapterCreatedSuccess,setChapterCreatedSuccess] = useState(false);
    const [chapterDeletedSuccess,setChapterDeletedSuccess] = useState(false);
    const [isLoading,setIsLoading] = useState(true);
    const [chapterData,setChapterData] = useState({
        'course_id' : courseData?.id
    });

    const handleChange = (e) => {
        setChapterData({
            ...chapterData,
            [e.target.name] : e.target.value
        })
    }

    const handleChapterCreation = async (e) => {
        e.preventDefault();
        const res = await createChapter(chapterData);
        if(res.data.case === 'success'){
            setChapterCreatedSuccess(true);
            syncCourseData();
            document.getElementById('addChapterBtn').value = ''
        }
        else if(res.data.case === 'validation_error'){
            setErrors(res.data.errors);
        }
    }

    const handleChapterDeletion = async (e) => {
        let id = e.target.dataset.id;
        const res = await deleteChapter(id);
        if(res.data.case === 'success'){
            setChapterDeletedSuccess(true)
            syncCourseData();
        }
        else{
            console.log(res.data.message);
        }
    }

    useEffect(() => {
        if (chapterCreatedSuccess === true) {
            const timer = setTimeout(() => {
                setChapterCreatedSuccess(false);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [chapterCreatedSuccess]);

     useEffect(() => {
            if (chapterDeletedSuccess === true) {
                const timer = setTimeout(() => {
                    setChapterDeletedSuccess(false);
                }, 2000);
                return () => clearTimeout(timer);
            }
        }, [chapterDeletedSuccess]);


    useEffect(() => {
        if(errors){
            const timer = setTimeout(() => {
                setErrors([]);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [errors]);


    useEffect(() => {
        if (courseData && courseData.chapters) {
            setIsLoading(false);
        }
    }, [courseData]);

    useEffect(() => {
        if(courseData.chapters.length > 3 ){
            setValidData(true)
        }
    }, [courseData.chapters]);


    return(
            !isLoading ? (
                <div className='h-[90%] mt-[5%] flex flex-col gap-[2rem] '>
                    <div className='flex flex-col gap-[0.75rem] items-center'>
                        <img src={chapter} className='w-[70px] h-[70px]' alt=""/>
                        <p className='text-gray text-[0.95rem] font-medium'>Now , please fill main chapters of your
                            course ...</p>
                    </div>
                    {
                        chapterCreatedSuccess &&
                        <div

                            className='w-[35%] mx-auto rounded-md bg-green py-[0.5rem] flex items-center justify-center text-white font-medium text-[0.9rem]'>

                            <p>Chapter created successfully !</p>

                        </div>

                    }{

                    chapterDeletedSuccess &&

                    <div

                        className='w-[35%] mx-auto rounded-md bg-red py-[0.5rem] flex items-center justify-center text-white font-medium text-[0.9rem]'>

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

                    <div className='w-full'>

                        <form className='flex w-full justify-center gap-[1.5rem]' method='POST'

                              onSubmit={handleChapterCreation}>

                            <input type="text" placeholder='Chapter Title'
                                   id='addChapterBtn'
                                   onChange={handleChange}
                                   name='title'

                                   className='bg-slate w-[27.5%] bg-opacity-40 text-[0.9rem] px-[1rem] py-[0.6rem] rounded-xl text-main focus:outline-none'/>

                            <button

                                className='bg-secondary text-white font-medium hover:bg-secHovers px-[0.5rem] py-[0.25rem] rounded-md'>+

                                Add Chapter

                            </button>

                        </form>

                    </div>

                    <div className='w-full min-h-[400px] '>

                        <div className='w-full flex items-center justify-center'>
                            {
                                (courseData.chapters.length === 0) ? (
                                    <div className='flex flex-col gap-[0.75rem] items-center w-full'>
                                        <img src={empty} className='h-[50px] w-[50px]' alt=""/>
                                        <p className='text-gray font-medium text-[0.9rem]'>This course doesn't have any
                                            chapters
                                            yet !</p>
                                    </div>
                                ) : (
                                    <div className='flex flex-col gap-[0.75rem] w-full items-center my-[2rem]'>
                                        <p className='text-primary font-semibold text-[1.1rem]'>Course Chapters :</p>
                                        {
                                            courseData.chapters.map(chapter =>
                                                <div key={chapter.id}
                                                     className='w-[50%] flex justify-between items-center'>
                                                    <p className='text-main text-[0.9rem] font-medium'>{chapter.title}</p>
                                                    <img src={deleteIcon} onClick={handleChapterDeletion}
                                                         data-id={chapter.id}
                                                         className='w-[30px] cursor-pointer h-[30px]' alt=""/>
                                                </div>
                                            )
                                        }
                                        {
                                            courseData.chapters.length < 3 && <div
                                                className='w-[50%] flex justify-end text-red text-[0.8rem] font-medium py-[0.75rem]'>
                                                <p>You Need To add 3 chapters at least</p>
                                            </div>
                                        }
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
            ) : (
                <p>im loading</p>
            )

    )
}

export default CourseCreationSecondStep