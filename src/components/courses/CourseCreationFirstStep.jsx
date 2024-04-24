
import instructor from '../../assets/instructor.png'
import {useUser} from "../../hooks/contexts/UserContext.jsx";
import {useContext, useEffect, useState} from "react";
import {fetchAllCategories} from "../../data/course/categoryData.js";
import {createCourse} from "../../data/course/courseData.js";
import {CourseCreationContext} from "./CourseCreation.jsx";


const CourseCreationFirstStep = () => {
    const {user} = useUser();
    const {setValidData,courseData} = useContext(CourseCreationContext);
    const [categories,setCategories] = useState([]);
    const [createdSuccess,setCreatedSuccess] = useState(false);
    const [formData,setFormData] = useState({
        'publisher_id' : user.instructor.id
    });
    const [errors,setErrors] = useState([]);
    const bringCategories = async () => {
        const res = await fetchAllCategories();
        if(res.data.case === 'success'){
            setCategories(res.data.categories);
        }
        else{
            console.log(res.data.message)
        }
    }

    const handleChange = (e) => {
        if (e.target.name === 'image') {
            const selectedFile = e.target.files[0];
            setFormData({
                ...formData,
                [e.target.name]: selectedFile,
            });
        } else {
            setFormData({
                ...formData,
                [e.target.name]: e.target.value,
            });
        }
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await createCourse(formData);

        if(res.data.case === 'success'){
            setCreatedSuccess(true);
            setValidData(true);
        }
        else if(res.data.case === 'validation_error'){
            setErrors(res.data.errors);
        }
    }

    useEffect(() => {
        if (createdSuccess === true) {
            const timer = setTimeout(() => {
                setCreatedSuccess(false);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [createdSuccess]);

    useEffect(() => {
        if(errors){
            const timer = setTimeout(() => {
                setErrors([]);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [errors]);


    useEffect(() => {
        console.log(courseData)
    }, []);

    useEffect(() => {
        if (errors) {
            const timer = setTimeout(() => {
                setErrors({});
            }, 2500);
            return () => clearTimeout(timer);
        }
    }, [errors]);

    useEffect(() => {
       bringCategories();
       console.log(courseData);
    }, []);
    return(
        <div className='h-[90%] mt-[5%] flex flex-col gap-[2rem] '>
           <div className='flex flex-col gap-[0.75rem] items-center'>
               <img src={instructor} className='w-[70px] h-[70px]' alt=""/>
               <p className='text-2xl font-medium text-main'>Hello , Mr. <span className='text-primary'>{user.name}</span> . {!courseData.title ? 'Let\'s start the process of course creation .' : 'You didnt Finish creating your course'} </p>
               <p className='text-gray text-[0.95rem] font-medium'>First Fill Your Course Infos ...</p>
           </div>
            <div className='w-[80%] ml-[15%] min-h-[200px] mb-[3rem]'>
                {
                    createdSuccess && <div className="bg-green text-white text-[0.9rem] font-medium w-[60%] ml-[15%] py-[0.5rem] rounded-lg px-[5%] mb-[1rem]">
                          <p>Course Created successfully click next to continue the process</p>
                    </div>
                }
                {Object.keys(errors).length > 0 && (
                    <div className="bg-secRed text-white text-[0.85rem] font-medium w-[60%] ml-[15%] py-[0.5rem] rounded-lg px-[5%] mb-[1rem]">
                        {Object.entries(errors).map(([field, messages]) => (
                            messages.map((message, index) => (
                                <p key={`${field}-${index}`}>{message}</p>
                            ))
                        ))}
                    </div>
                )}
                <form className='w-full flex flex-wrap items-center gap-[1rem]' method='POST' onSubmit={handleSubmit}>
                    <input type="text" placeholder='Course Title'
                           onChange={handleChange}
                           value={courseData !== {} && courseData.title }
                           disabled={courseData?.title ? true : false}
                           name='title'
                           className='bg-slate w-[27.5%] bg-opacity-40 text-[0.9rem] px-[1rem] py-[0.6rem] rounded-xl text-main focus:outline-none'/>
                    <input type="text" placeholder='Description'
                           value={courseData !== {} && courseData.description }
                           disabled={courseData?.title ? true : false}
                           onChange={handleChange}
                           name='description'
                           className='bg-slate w-[27.5%] bg-opacity-40 text-[0.9rem] px-[1rem] py-[0.6rem] rounded-xl text-main focus:outline-none'/>
                    <select name="category_id"
                            disabled={courseData?.title ? true : false}
                            onChange={handleChange}
                            className='bg-slate w-[27.5%] bg-opacity-40 text-[0.9rem] px-[1rem] py-[0.75rem] rounded-xl text-main focus:outline-none'>
                        <option value=''>Course Category</option>
                        {
                            categories.map(category => (
                                <option key={category.id}
                                        value={category.id}
                                        selected={courseData !== {} && courseData.category_id === category.id ? 'selected' : ''}
                                >{category.name}</option>
                            ))
                        }
                    </select>
                    <div className='w-full flex gap-[1.5rem]'>
                        <input type="text" placeholder='Max Duration'
                               disabled={courseData?.title ? true : false}
                               onChange={handleChange}
                               value={courseData?.title && courseData.max_duration / 60}
                               name='max_duration'
                               className='bg-slate w-[27.5%] bg-opacity-40 text-[0.9rem] px-[1rem] py-[0.6rem] rounded-xl text-main focus:outline-none'/>
                        <select name="duration_type"
                                disabled={courseData?.title ? true : false}
                                onChange={handleChange}
                                className='bg-slate w-[27.5%] bg-opacity-40 text-[0.9rem] px-[1rem] py-[0.75rem] rounded-xl text-main focus:outline-none'>
                            <option value=''>Duration type</option>
                            <option value='hours' selected={courseData?.title ? 'selected' : ""}>Hours</option>
                            <option value='days'>Days</option>
                        </select>
                        <div className="mx-auto max-w-xs">
                            <input type="file"
                                   onChange={handleChange}
                                   name='image'
                                   className="mt-2 block w-full text-sm file:mr-4 file:rounded-md file:border-0 file:bg-teal-500 file:py-2 file:px-4 file:text-sm file:font-semibold file:text-white hover:file:bg-teal-700 focus:outline-none disabled:pointer-events-none disabled:opacity-60"/>
                        </div>
                        {!courseData.title && <button type='submit'
                                                      className='px-[0.75rem] py-[0.4rem] my-auto rounded-lg bg-secondary hover:bg-secHovers text-white font-medium'>Create</button>}
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CourseCreationFirstStep