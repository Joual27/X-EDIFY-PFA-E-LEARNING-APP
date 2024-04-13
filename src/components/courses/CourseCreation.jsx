import CourseCreationFirstStep from "./CourseCreationFirstStep.jsx";
import {useState} from "react";
import CourseCreationSecondStep from "./CourseCreationSecondStep.jsx";
import CourseCreationThirdStep from "./CourseCreationThirdStep.jsx";
import CourseCreationFourthStep from "./CourseCreationFourthStep.jsx";


const courseCreation = () => {
    const [step,setStep] = useState(1);

    const showNextStep = () =>{
        setStep(step+1)
    }
    const showPreviousStep = () =>{
        setStep(step-1)
    }

    return(
        <div className='min-h-[40vh] w-[50%] bg-whiteBg rounded-xl relative'>
            {step === 1 && <CourseCreationFirstStep/>}
            {step === 2 && <CourseCreationSecondStep/>}
            {step === 3 && <CourseCreationThirdStep/>}
            {step === 4 && <CourseCreationFourthStep/>}
            <div className='absolute w-full bottom-[5%] right-[7%] flex justify-end gap-[1rem]'>
                {
                    step > 1 &&
                    <button
                        className='px-[0.7rem] py-[0.25rem] rounded-sm bg-primary text-white font-medium hover:bg-hovers' onClick={showPreviousStep}>Previous
                    </button>
                }
                {
                    step < 4 &&
                    <button
                        className='px-[0.7rem] py-[0.25rem] rounded-sm bg-primary text-white font-medium hover:bg-hovers' onClick={showNextStep}>Next
                    </button>
                }
            </div>
        </div>
    )
}
export default courseCreation