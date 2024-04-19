import content from "../../assets/content.png";
import chapter from '../../assets/chapters.png'
import {useContext, useEffect, useState} from "react";
import {CourseCreationContext} from "./CourseCreation.jsx";
import {createContent} from "../../data/course/courseData.js";


const CourseCreationFourthStep = () => {
    const {courseData,syncCourseData,showNextStep} = useContext(CourseCreationContext);

    const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
    const [currentChapter, setCurrentChapter] = useState(courseData.chapters[currentChapterIndex]);
    const [uploadedFailed,setUploadFailed] = useState(false);
    const [contentCreatedSuccess,setContentCreationSuccess] = useState(false);
    const [hasContent, setHasContent] = useState(false);
    const [errors,setErrors] = useState([]);

    const handleContentUpload = async (e , topicId) => {
        const uploadedFile = e.target.files[0];
        const allowedTypes = ['video/mp4', 'video/x-msvideo', 'video/x-flv', 'video/webm'];
        if(allowedTypes.includes(uploadedFile.type)){
            let formData = new FormData();
            formData.append('file',uploadedFile);
            formData.append('topic_id',topicId);
            const file = uploadedFile;
            const formDataObj = Object.fromEntries(formData);
            const contentData = {
                file,
                topic_id: formDataObj.topic_id
            };
            const res = await createContent(contentData);
            if (res.data.case === 'success') {
                setContentCreationSuccess(true);
                setCurrentChapter(prevChapter => {
                    const updatedTopics = prevChapter.topics.map((topic) =>
                        topic.id === topicId ? { ...topic, content: res.data.content } : topic
                    );
                    const allTopicsHaveContent = updatedTopics.every((topic) => topic.content);
                    setHasContent(allTopicsHaveContent);
                    return { ...prevChapter, topics: updatedTopics };
                });
                setTimeout(() => {
                    const fileInput = document.getElementById(topicId);
                    if (fileInput) {
                        fileInput.disabled = true;
                    }
                }, 250);
                showNextStep();
            }
            else if(res.data.errors){
                setErrors(res.data.errors);
            }
        }
        else{
            setUploadFailed(true)
        }
    }

    const switchToNextChapter = () => {
        if (hasContent) {
            setCurrentChapterIndex(currentChapterIndex + 1);
            setCurrentChapter(courseData.chapters[currentChapterIndex + 1]);
        }
    }



    const switchToPreviousChapter = () => {
        setCurrentChapterIndex(currentChapterIndex-1);
        setCurrentChapter(courseData.chapters[currentChapterIndex - 1]);
    }

    useEffect(() => {
        if (contentCreatedSuccess === true) {
            const timer = setTimeout(() => {
                setContentCreationSuccess(false);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [contentCreatedSuccess]);

     useEffect(() => {
            if (uploadedFailed === true) {
                const timer = setTimeout(() => {
                    setUploadFailed(false);
                }, 2000);
                return () => clearTimeout(timer);
            }
        }, [uploadedFailed]);


    useEffect(() => {
        const allTopicsHaveContent = currentChapter.topics.every((topic) => topic.content);
        setHasContent(allTopicsHaveContent)
    }, [currentChapter.topics]);


    useEffect(() => {
        if (courseData && currentChapterIndex !== null) {
            const chapterWithNoContent = courseData.chapters.find((chapter, index) => {
                if (index !== currentChapterIndex) {
                    const hasContent = chapter.topics.every((topic) => topic.content);
                    return !hasContent;
                }
                return false;
            });
            if (chapterWithNoContent) {
                setCurrentChapterIndex(courseData.chapters.indexOf(chapterWithNoContent));
                setCurrentChapter(chapterWithNoContent);
            }
            else{
                setCurrentChapter(courseData.chapters[currentChapterIndex]);
            }
        }
    }, []);

    return (
        <div className='h-[90%] mt-[5%] flex flex-col gap-[2rem] '>
            <div className='flex flex-col gap-[0.75rem] items-center'>
                <img src={content} className='w-[70px] h-[70px]' alt=""/>
                <p className='text-gray text-[0.95rem] font-medium'>Finally , Lets upload content For your topics ...</p>
            </div>
            {Object.keys(errors).length > 0 && (
                <div className="bg-secRed text-white text-[0.85rem] font-medium w-[30%] mx-auto py-[0.5rem] rounded-lg px-[5%] mb-[1rem]">
                    {Object.entries(errors).map(([field, messages]) => (
                        messages.map((message, index) => (
                            <p key={`${field}-${index}`}>{message}</p>
                        ))
                    ))}
                </div>
            )}
            {
                uploadedFailed &&
                <div
                    className='w-[35%] mx-auto rounded-md bg-red py-[0.5rem] flex items-center justify-center text-white font-medium text-[0.9rem]'>
                    <p>Only video types are allowed !</p>
                </div>
            } {
                contentCreatedSuccess &&
                <div
                    className='w-[35%] mx-auto rounded-md bg-green py-[0.5rem] flex items-center justify-center text-white font-medium text-[0.9rem]'>
                    <p>Content attached suucessfully !</p>
                </div>
            }

            <div className='flex flex-col gap-[2rem] my-[2rem] items-center w-full'>
                <p className=' font-bold text-primary'>Chapter {currentChapterIndex+1}: <span className='text-main text-[0.9rem]'>{currentChapter.title}</span></p>
                    <div className='flex flex-col gap-[1rem] w-full items-center pb-[2rem]'>
                        {currentChapter.topics.map(topic => (
                            <div key={topic.id} className='w-[60%] flex justify-between items-center'>
                                <img src={chapter} className='w-[30px] h-[30px]' alt=""/>
                                <p>{topic.title}</p>
                                <form className='w-[30%]' method='POST' onSubmit={handleContentUpload}>
                                    <input type="hidden" name='topic_id' defaultValue={topic.id}/>
                                    <input type="file"
                                           id={topic.id}
                                           disabled={!!topic.content}
                                           onChange={(event) => handleContentUpload(event, topic.id)}
                                           className="mt-2 block w-full text-sm file:mr-4 file:rounded-md file:border-0 file:bg-teal-500 file:py-2 file:px-4 file:text-sm file:font-semibold file:text-white hover:file:bg-teal-700 focus:outline-none disabled:pointer-events-none disabled:opacity-60"/>
                                </form>
                            </div>
                        ))}
                    </div>

                <div className='flex w-full justify-end gap-[1rem] px-[15%] mb-[4rem]'>
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
    )
}

export default CourseCreationFourthStep