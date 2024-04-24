
import ratings from "../../assets/ratings.png";
import students from "../../assets/students.png";
import star from "../../assets/star.png";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import {fetchRatingData} from "../../data/course/studentData.js";


const PublicCourse = ({course}) => {

    const [avgRating,setAvgRating] = useState(0);
    const [reviews_number,setReviewsNumber] = useState(0);


    const bringRatingData = async () => {
        const res = await fetchRatingData(course.id);
        if(res.data.case === 'success'){
            setAvgRating(res.data.avg_rating);
            setReviewsNumber(res.data.ratings_count);
        }
        else{
            console.log(res.data.message)
        }
    }


    useEffect(() => {
        bringRatingData();
    }, []);

    return (
        <div className='rounded-lg flex flex-col gap-[1rem] w-[18.5%]'>
            <img src={course.image} className='w-full rounded-lg h-[200px] object-cover' alt="course image"/>
            <div className=''>
                <div className='flex flex-col  gap-[0.25rem]'>
                    <p className='font-medium'>{course.title}</p>
                    <p className='text-gray text-[0.85rem] font-semibold'>{course.description}</p>
                    <p className='text-gray text-[0.85rem] font-semibold'>Published By : <span className='text-main'>{course.instructor.user.name}</span></p>
                </div>
                <div className='py-[1rem] flex gap-[1.5rem] items-center'>
                    <div className='flex gap-[7.5px] items-center'>
                        <img src={students} className='w-[25px] h-[25px]' alt="students icon"/>
                        <p className='font-bold text-[0.7rem]'>{reviews_number === 0 ? 'no reviews yet' : reviews_number}</p>
                    </div>
                    <div className='flex gap-[10px] items-center'>
                        <img src={ratings} className={`w-[30px] h-[30px] ${reviews_number === 0 && 'hidden'}`} alt=""/>
                        <p className='text-primary font-bold underline text-[0.9rem]'>{avgRating}</p>
                    </div>
                    <div className='flex gap-[0.5rem]'>
                        <Link to={`/course/${course.id}`}>
                            <button
                                className='px-[1rem] py-1 rounded-lg bg-primary text-white font-medium hover:bg-hovers'>
                                Details
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PublicCourse