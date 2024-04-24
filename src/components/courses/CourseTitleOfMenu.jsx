

import arrow from '../../assets/arrowDown.png'
import CourseTopics from "./CourseTopics.jsx";
import {useState} from "react";

const CourseTitleOfMenu = ({isAfterCurrentChapter,isCurrentChapter,chapter,chapterIndex}) => {

    const [shownCourseTopics,setShownCourseTopics] = useState(false);
    const showCourseTopics = () => {
        if(!shownCourseTopics){
            setShownCourseTopics(true);
        }
        else{
            setShownCourseTopics(false);
        }
    }

    return(
        <>
            <div className='w-[85%] h-[30px] flex items-center justify-between cursor-pointer' onClick={showCourseTopics}>
                <p className='text-[0.9rem] text-main font-medium'>{chapter && chapter.title}</p>
                <img src={arrow} className={` ${ shownCourseTopics && !isAfterCurrentChapter && 'rotate-180' }`} alt=""/>
            </div>
            {
                shownCourseTopics  && !isAfterCurrentChapter  && <CourseTopics isCurrentChapter={isCurrentChapter} chapterIndex={chapterIndex} chapter={chapter}/>
            }
        </>

    )
}


export default CourseTitleOfMenu