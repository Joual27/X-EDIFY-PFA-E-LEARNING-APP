    import CourseCreationFirstStep from "./CourseCreationFirstStep.jsx";
    import {createContext, useEffect, useState} from "react";
    import CourseCreationSecondStep from "./CourseCreationSecondStep.jsx";
    import CourseCreationThirdStep from "./CourseCreationThirdStep.jsx";
    import CourseCreationFourthStep from "./CourseCreationFourthStep.jsx";
    import {fetchCourseOnCreation} from "../../data/course/courseData.js";
    import {useUser} from "../../hooks/contexts/UserContext.jsx";


    export const CourseCreationContext = createContext();

    const courseCreation = () => {
        const {user} = useUser();
        const [step,setStep] = useState(1);
        const [courseData, setCourseData] = useState({});
        const [validData,setValidData] = useState(false);

        const checkForCourseOnCreation = async () => {
             const res = await fetchCourseOnCreation(user.instructor.id);
             if(res.data.case === 'success'){
                 const courseDataFromResponse = res.data.course_data;
                 setCourseData(courseDataFromResponse);
                 if (!courseDataFromResponse.chapters || courseDataFromResponse.chapters.length <= 2) {
                     setStep(2);
                 } else if (courseDataFromResponse.chapters.some(chapter => chapter.topics.length < 3)) {
                     setStep(3);
                 } else {
                     setStep(4);
                 }
             }
        }

        const syncCourseData = async() => {
            const res = await fetchCourseOnCreation(user.instructor.id);
            if(res.data.case === 'success'){
                setCourseData(res.data.course_data);
            }
        }
        const handleValidData = () => {
            setValidData(true);
        }

        const showNextStep = () =>{
           if(step === 1 ){
               if(courseData){
                   setStep(2)
               }
               else {
                   if(validData){
                       setStep(2)
                   }
               }
           }
           else{
               if(step === 2){
                   if(courseData.chapters.length >= 3){
                       setStep(3)
                   }
               }
           }
        }
        const showPreviousStep = () =>{
            setStep(step-1)
        }

        useEffect(() => {
            checkForCourseOnCreation();
        }, []);

        useEffect(() => {
            if (validData === true) {
                const timer = setTimeout(() => {
                    setValidData(false);
                }, 5000);
                return () => clearTimeout(timer);
            }
        }, [validData]);

        return(
            <CourseCreationContext.Provider value={{courseData, setCourseData,setValidData , syncCourseData}}>

                <div className='min-h-[40vh] w-[50%] bg-whiteBg rounded-xl relative'>
                    {step === 1 && <CourseCreationFirstStep/>}
                    {step === 2 && <CourseCreationSecondStep/>}
                    {step === 3 && <CourseCreationThirdStep/>}
                    {step === 4 && <CourseCreationFourthStep/>}
                    <div className='absolute w-full bottom-[5%] right-[7%] flex justify-end gap-[1rem]'>
                        {
                            step > 1 &&
                            <button
                                className='px-[0.7rem] py-[0.25rem] rounded-sm bg-primary text-white font-medium hover:bg-hovers'
                                onClick={showPreviousStep}>Previous
                            </button>
                        }
                        {
                            step < 4 &&
                            <button
                                className='px-[0.7rem] py-[0.25rem] rounded-sm bg-primary text-white font-medium hover:bg-hovers'
                                onClick={showNextStep}>Next
                            </button>
                        }
                    </div>
                </div>
            </CourseCreationContext.Provider>
        )
    }
    export default courseCreation