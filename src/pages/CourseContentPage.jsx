import Navbar from "../components/home/Navbar.jsx";
import CourseContentMenu from "../components/courses/CourseContentMenu.jsx";
import CourseVideo from "../components/courses/CourseVideo.jsx";
import {useNavigate, useParams} from "react-router-dom";
import { fetchCourseData } from "../data/course/courseData.js";
import { createContext, useEffect, useState } from "react";
import {
    createReview,
    fetchPointsOfStudent,
    markCourseAsCompleted,
    updatePointsOfStudent
} from "../data/course/studentData.js";
import { useUser } from "../hooks/contexts/UserContext.jsx";
import Loading from "../components/loading/Loading.jsx";
import close from "../assets/close.png";
import review from '../assets/review.png'
import '../index.css'
import { Rating } from "react-simple-star-rating";
export const CourseContentContext = createContext();
const CourseContentPage = () => {
    const { id } = useParams();
    const { user } = useUser();
    const [courseData, setCourseData] = useState({});
    const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
    const [currentTopicIndex, setCurrentTopicIndex] = useState(0);
    const [studentPoints, setStudentPoints] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [shownNextButton,setShownNextButton] = useState(false);
    const [shownReviewsPopup,setShownReviewsPopup] = useState(false);
    const [courseRatedSuccessfully,setCourseRatedSuccessfully] = useState(false);
    const navigate = useNavigate();
    const [reviewData,setReviewData] = useState({
        course_id : id,
        student_id : user.student.id
    });

    const handleRating = (rate) => {
        setReviewData({
            ...reviewData,
            rating : rate
        });
    }
    const onPointerMove = (value) => console.log(value)

    const bringCourseData = async () => {
        const res = await fetchCourseData(id);
        if (res.data.case === 'success') {
            setCourseData(res.data.course);
        } else {
            console.log(res.data.message);
        }
    }

    const handleCourseCompletion = async () => {
        const res = await markCourseAsCompleted(id,user.student.id);
        if (res.data.case === 'success'){
           navigate('/student/dashboard');
        }
        else{
            console.log(res.data.message);
        }
    }

    const handleRatingCreation = async () => {
        const res = await createReview(reviewData);
        if (res.data.case === 'success'){
            setCourseRatedSuccessfully(true);
            setTimeout(() => {
                handleCourseCompletion();
            },1500)
        }
    }

    const bringStudentPoints = async () => {
        const res = await fetchPointsOfStudent(id, user.student.id);
        if (res.data.case === 'success') {
            setStudentPoints(res.data.points);
        } else {
            console.log(res.data.message);
        }
        setIsLoading(false);
    }

    const handleHidingRatingPopup = () => {
        setShownReviewsPopup(false);
    }
    const handleShowingRatingPopup = () => {
        setShownReviewsPopup(true);
    }

    const handleShowingNextTopic = async () => {
        const res = await updatePointsOfStudent(id,user.student.id);
        if (res.data.case === 'success') {
            setStudentPoints(res.data.points);
            setShownNextButton(false)
        } else {
            console.log(res.data.message);
        }
    }


    useEffect(() => {
        bringCourseData();
        bringStudentPoints();
    }, []);

    useEffect(() => {
        if (courseData && courseData.chapters && courseData.chapters.length > 0) {
            setIsLoading(false);
        }
    }, [courseData]);


    useEffect(() => {
        if (courseData && courseData.chapters && courseData.chapters.length > 0) {
            console.log('ive updated')
            let totalPoints = -50;
            let foundChapter = false;
            courseData.chapters.forEach((chapter, index) => {
                chapter.topics.forEach((topic, topicIndex) => {
                    totalPoints += 50;
                    if (studentPoints >= totalPoints) {
                        setCurrentChapterIndex(index);
                        setCurrentTopicIndex(topicIndex);
                        foundChapter = true;
                    }
                });
                if (foundChapter) return;
            });
        }
    }, [courseData, studentPoints]);

    const contextValues = {
        courseData,
        currentChapterIndex,
        currentTopicIndex,
        setShownNextButton,
        setCurrentChapterIndex,
        setCurrentTopicIndex,
        studentPoints
    }



    if (isLoading){
        return <Loading/>
    }

    return (
        <CourseContentContext.Provider value={contextValues}>
            <div className='bg-background min-h-[100vh] w-full text-main' style={{zIndex: -10}}>
                <Navbar/>
                <div
                    className='w-full flex items-center gap-[1.5rem] justify-center text-overlay font-medium text-[0.9rem] my-[5rem]'>
                    <button className='border-b-2 border-b-primary px-[0.5rem]'>Course Content</button>
                    <button>Discussion Room</button>
                </div>
                <div className='w-[80%] flex justify-between mx-auto'>
                    {
                        courseData.chapters && <>
                            <CourseContentMenu/>
                            <CourseVideo
                                url={courseData.chapters[currentChapterIndex].topics[currentTopicIndex].content.link_to_ressource}/>
                        </>
                    }
                </div>
                <div className='w-[80%] flex justify-end items-center gap-[1rem] mx-auto mt-[3rem]'>
                    {shownNextButton ?
                        currentTopicIndex === courseData.chapters[currentChapterIndex].topics.length - 1 && currentChapterIndex === courseData.chapters.length - 1 ? (
                            <button
                                onClick={handleShowingRatingPopup}
                                className='bg-primary flex items-center justify-center text-white font-medium rounded-sm px-[0.75rem] py-[0.25rem] hover:bg-hovers'>
                                Mark As Completed
                            </button>
                        ) : (
                            <button
                                onClick={handleShowingNextTopic}
                                className='bg-primary flex items-center justify-center text-white font-medium rounded-sm px-[0.75rem] py-[0.25rem] hover:bg-hovers'>
                                Next
                            </button>
                        )
                        : (
                            <p className='text-main text-[0.8rem] underline'>Please continue watching the video first !</p>
                        )
                    }
                </div>
            </div>
            <div
                className={`fixed inset-0 w-full h-[100vh] bg-overlay bg-opacity-60 flex items-center justify-center  ${(!shownReviewsPopup) ? 'hidden' : ''}`}>
                <div className='w-[20%] rounded-lg bg-white h-[300px] relative'>
                    <div
                        className='absolute top-0 left-0 w-full bg-primary h-[40px] rounded-t-lg flex justify-end px-[1rem] items-center'>
                        <img src={close} onClick={handleHidingRatingPopup}
                             className='w-[24px] h-[24px] cursor-pointer' alt=""/>
                    </div>
                    {/*{*/}
                    {/*    courseEnrolledSuccess &&*/}
                    {/*    <p className='text-green font-medium text-[0.95rem] text-center'>Course enrolled . Redirecting*/}
                    {/*        ...</p>*/}
                    {/*}*/}
                    <div
                        className='h-full flex flex-col w-full items-center justify-center gap-[1rem]  mt-[1.5rem] py-[1.5rem]'>
                        {
                            courseRatedSuccessfully && <div className='w-[80%] rounded-lg bg-green text-white font-medium flex items-center justify-center text-[0.85rem]'>
                                 <p>Course Rated Successfully !</p>
                            </div>
                        }
                        <img src={review} className='w-[75px] h-[75px]' alt=""/>
                        <div>
                            <p className='text-main text-[0.85rem] font-medium'>Rate You Experience ?</p>
                        </div>

                            <Rating
                                onClick={handleRating}
                                onPointerMove={onPointerMove}
                            />

                        <div className='w-full flex justify-center gap-[0.75rem] mt-[0.5rem] '>
                            <button
                                onClick={handleCourseCompletion}
                                className='bg-gray text-white font-medium px-[0.6rem] py-[0.3rem] bg-opacity-40 rounded-sm hover:bg-opacity-60'
                            >Not Now
                            </button>
                            <button
                                onClick={handleRatingCreation}
                                className='bg-primary text-white font-medium px-[0.6rem] py-[0.3rem]  rounded-sm hover:bg-opacity-80'
                            >Rate
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </CourseContentContext.Provider>
    );
}

export default CourseContentPage;
