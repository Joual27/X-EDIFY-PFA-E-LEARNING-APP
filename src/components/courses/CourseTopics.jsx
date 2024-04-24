import { useContext } from "react";
import { CourseContentContext } from "../../pages/CourseContentPage.jsx";

const CourseTopics = ({ isCurrentChapter, chapter ,chapterIndex}) => {
    const { courseData,currentTopicIndex ,currentChapterIndex ,setCurrentChapterIndex,setCurrentTopicIndex,studentPoints} = useContext(CourseContentContext);

    return (
        <div className='w-full px-[20%] text-overlay font-medium text-[0.85rem]'>
            <div className='flex flex-col gap-[0.5rem] w-full py-[0.25rem]'>
                {chapter.topics.map((topic, index) => {
                    const totalPointsRequired = (chapterIndex + 1) * (index + 1) * 50;
                    const hasPassedTopic = studentPoints >= totalPointsRequired;
                    const isAccessibleTopic = studentPoints >= (chapterIndex + 1) * (index + 1) * 50;
                    const isIncomingTopic = chapterIndex === currentChapterIndex && !hasPassedTopic && index === currentTopicIndex;

                    const handleTopicChange = (e) => {
                        if (e.target.classList.contains('cursor-pointer') && isAccessibleTopic) {
                            setCurrentChapterIndex(chapterIndex);
                            setCurrentTopicIndex(index);
                        }
                    }

                    return (
                        <button
                            key={topic.id}
                            onClick={handleTopicChange}
                            className={`w-[30%] ${!isIncomingTopic || hasPassedTopic ? 'hover:bg-opacity-60 hover:font-bold hover:text-[0.9rem] cursor-pointer' : 'cursor-not-allowed'} ${(currentTopicIndex === index && isCurrentChapter) ? 'text-gray' : ''}`}
                        >
                            {topic.title}
                        </button>
                    );
                })}
            </div>
        </div>
    )
}

export default CourseTopics;
