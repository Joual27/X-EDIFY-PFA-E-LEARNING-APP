import content from "../../assets/content.png";
import chapter from '../../assets/chapters.png'

const CourseCreationFourthStep = () => {
    return (
        <div className='h-[90%] mt-[5%] flex flex-col gap-[2rem] '>
            <div className='flex flex-col gap-[0.75rem] items-center'>
                <img src={content} className='w-[70px] h-[70px]' alt=""/>
                <p className='text-gray text-[0.95rem] font-medium'>Finally , Lets upload content fro your topics ...</p>
            </div>
            <div className='flex flex-col gap-[2rem] my-[2rem] items-center w-full'>
                <p className=' font-bold text-primary'>Chapter 1 : <span className='text-main text-[0.9rem]'>IM YOUR ATM</span></p>
                <div className='flex flex-col gap-[1rem] w-full items-center pb-[4rem]'>
                    <div className='w-full flex justify-center gap-[2rem] items-center'>
                        <img src={chapter} className='w-[30px] h-[30px]' alt=""/>
                        <p>Basics of web development</p>
                        <form className='w-[30%]'>
                            <input id="example1" type="file"
                                   className="mt-2 block w-full text-sm file:mr-4 file:rounded-md file:border-0 file:bg-teal-500 file:py-2 file:px-4 file:text-sm file:font-semibold file:text-white hover:file:bg-teal-700 focus:outline-none disabled:pointer-events-none disabled:opacity-60"/>
                        </form>
                    </div>
                    <div className='w-full flex justify-center gap-[2rem] items-center'>
                        <img src={chapter} className='w-[30px] h-[30px]' alt=""/>
                        <p>Basics of web development</p>
                        <form className='w-[30%]'>
                            <input id="example1" type="file"
                                   className="mt-2 block w-full text-sm file:mr-4 file:rounded-md file:border-0 file:bg-teal-500 file:py-2 file:px-4 file:text-sm file:font-semibold file:text-white hover:file:bg-teal-700 focus:outline-none disabled:pointer-events-none disabled:opacity-60"/>
                        </form>
                    </div>
                    <div className='w-full flex justify-center gap-[2rem] items-center'>
                        <img src={chapter} className='w-[30px] h-[30px]' alt=""/>
                        <p>Basics of web development</p>
                        <form className='w-[30%]'>
                            <input id="example1" type="file"
                                   className="mt-2 block w-full text-sm file:mr-4 file:rounded-md file:border-0 file:bg-teal-500 file:py-2 file:px-4 file:text-sm file:font-semibold file:text-white hover:file:bg-teal-700 focus:outline-none disabled:pointer-events-none disabled:opacity-60"/>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CourseCreationFourthStep