import CourseTitleOfMenu from "./CourseTitleOfMenu.jsx";
import {useContext, useState} from "react";
import {CourseContentContext} from "../../pages/CourseContentPage.jsx";


const CourseContentMenu = () => {

    const {courseData,currentChapterIndex,studentPoints} = useContext(CourseContentContext);
    return (
        <div className='w-[20%] bg-dark rounded-md h-[60vh] flex flex-col py-[2rem] gap-[0.75remrem] items-center'>
            <p className='text-xl font-medium mb-[2rem]'>{courseData && courseData.title}</p>
            {courseData && courseData.chapters && courseData.chapters.length > 0 && courseData.chapters.map((chapter, index) => {
                const previousChaptersPoints = courseData.chapters.slice(0, index).reduce((acc, prevChapter) => acc + prevChapter.topics.length * 50, 0);
                const currentChapterPointsRequired = chapter.topics.length * 50;
                const totalPointsRequired = previousChaptersPoints + currentChapterPointsRequired;
                const isAfterCurrentChapter = index > currentChapterIndex;
                const isAccessibleChapter = studentPoints >= previousChaptersPoints;

                return (
                    <CourseTitleOfMenu
                        key={chapter.id}
                        isAfterCurrentChapter={isAfterCurrentChapter && !isAccessibleChapter}
                        isCurrentChapter={currentChapterIndex === index}
                        chapterIndex={index}
                        chapter={chapter}
                    />
                );
            })}
        </div>
    )
}


export default CourseContentMenu