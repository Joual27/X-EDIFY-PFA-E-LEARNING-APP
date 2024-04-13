import Navbar from "../components/home/Navbar.jsx";
import courseImage from '../assets/node.png'
import students from '../assets/students.png'
import profile from '../assets/profile.png'
import check from '../assets/check.png'
import student from '../assets/teacher.png'
import rating from '../assets/star.png'

const SpecificCoursePage = () => {
    return(
        <div className='bg-background min-h-[100vh] w-full text-main' style={{zIndex : -10}} >
            <Navbar/>
            <div className='w-[80%] mx-auto flex mt-[4rem]'>
                <div className='w-[15%] flex flex-col gap-[1.5rem] py-[2rem] '>
                    <img src={courseImage} className='w-[200px] h-[150px] rounded-md' alt=""/>
                    <p className='font-semibold text-[1.1rem]'>Course Title</p>
                    <div className='flex  gap-[1rem] items-center font-medium'>
                        <p >Publisher:</p>
                        <div className='flex gap-[5px] items-center'>
                            <img src={profile} alt=""/>
                            <p className='text-[0.85rem] text-gray'>IM YOUR ATM</p>
                        </div>
                    </div>
                    <div className='flex gap-[1rem] items-center font-medium'>
                        <p>Enrolled BY :</p>
                        <div className='flex items-center gap-[0.5rem]'>
                            <p className='text-[0.9rem]  '>25</p>
                            <img src={students} className='w-[25px] h-[25px]' alt=""/>
                        </div>
                    </div>
                </div>
                <div className='w-[60%] flex flex-col gap-[2rem] mt-[2.5rem]'>
                    <div className='flex flex-col gap-[2.5rem] w-[95%] px-[5%]'>
                        <p className='text-gray text-[0.9rem] font-medium'>Things u will learn at this course ...</p>
                        <div className='flex flex-col gap-[0.75rem] px-[1rem]'>
                            <div className='flex items-center gap-[10px] font-medium text-[0.9rem]'>
                                <img src={check} alt=""/>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium amet, autem
                                    deserunt dolores ducimus eaque, explicabo facilis impedit nihil placeat quos sed
                                    suscipit, veritatis. Adipisci.</p>
                            </div>
                            <div className='flex items-center gap-[10px] font-medium text-[0.9rem]'>
                                <img src={check} alt=""/>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium amet, autem
                                    deserunt dolores ducimus eaque, explicabo facilis impedit nihil placeat quos sed
                                    suscipit, veritatis. Adipisci.</p>
                            </div>
                            <div className='flex items-center gap-[10px] font-medium text-[0.9rem]'>
                                <img src={check} alt=""/>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium amet, autem
                                    deserunt dolores ducimus eaque, explicabo facilis impedit nihil placeat quos sed
                                    suscipit, veritatis. Adipisci.</p>
                            </div>
                            <div className='flex items-center gap-[10px] font-medium text-[0.9rem]'>
                                <img src={check} alt=""/>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium amet, autem
                                    deserunt dolores ducimus eaque, explicabo facilis impedit nihil placeat quos sed
                                    suscipit, veritatis. Adipisci.</p>
                            </div>
                            <div className='flex items-center gap-[10px] font-medium text-[0.9rem]'>
                                <img src={check} alt=""/>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium amet, autem
                                    deserunt dolores ducimus eaque, explicabo facilis impedit nihil placeat quos sed
                                    suscipit, veritatis. Adipisci.</p>
                            </div>
                        </div>
                        <p className='text-gray text-[0.9rem] font-medium'>Join other students who unrolled this course ...</p>
                        <div className='flex w-full justify-between px-[1rem]'>
                            <div className='flex flex-col gap-[0.75rem] items-center w-[15%]'>
                                <img src={student} className='w-[50px] h-[50px] rounded-full' alt=""/>
                                <p className=' font-medium text-[0.85rem]'>IM YOUR ATM</p>
                            </div>
                            <div className='flex flex-col gap-[0.75rem] items-center w-[15%]'>
                                <img src={student} className='w-[50px] h-[50px] rounded-full' alt=""/>
                                <p className=' font-medium text-[0.85rem]'>IM YOUR ATM</p>
                            </div>
                            <div className='flex flex-col gap-[0.75rem] items-center w-[15%]'>
                                <img src={student} className='w-[50px] h-[50px] rounded-full' alt=""/>
                                <p className=' font-medium text-[0.85rem]'>IM YOUR ATM</p>
                            </div>
                            <div className='flex flex-col gap-[0.75rem] items-center w-[15%]'>
                                <img src={student} className='w-[50px] h-[50px] rounded-full' alt=""/>
                                <p className=' font-medium text-[0.85rem]'>IM YOUR ATM</p>
                            </div>
                            <div className='flex flex-col gap-[0.75rem] items-center w-[15%]'>
                                <img src={student} className='w-[50px] h-[50px] rounded-full' alt=""/>
                                <p className=' font-medium text-[0.85rem]'>IM YOUR ATM</p>
                            </div>
                            <div className='flex flex-col gap-[0.75rem] items-center w-[15%]'>
                                <img src={student} className='w-[50px] h-[50px] rounded-full' alt=""/>
                                <p className=' font-medium text-[0.85rem]'>IM YOUR ATM</p>
                            </div>
                        </div>
                    </div>

                </div>
                <div className='w-[25%] flex flex-col gap-[2.5rem] mt-[2.5rem]'>
                    <p className='text-gray text-[0.9rem] font-medium'>Course detailed description ...</p>
                    <div className='px-[1rem] w-[90%]'>
                        <p className=' text-[0.85rem] font-medium'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus ad aspernatur assumenda blanditiis consequatur cum deleniti earum eius est, et ipsa ipsam libero neque odit qui quisquam quo rerum, ullam velit voluptatibus. Ab commodi eos non quae temporibus voluptas! Ad aperiam aut autem earum impedit mollitia omnis recusandae, reprehenderit vitae.</p>
                    </div>
                    <div className='flex flex-col gap-[1rem]'>
                        <p className='text-gray font-medium text-[0.9rem]'>Category : </p>
                        <div className='mx-[1rem] w-[60%] bg-secondary rounded-md px-[0.75rem] py-[0.4rem] flex items-center justify-center font-medium text-white'>
                            <p className='text-[0.9rem]'>SOFTWARE DEVELOPMENT</p>
                        </div>
                    </div>
                    <div className='flex flex-col gap-[1rem]'>
                        <p className='text-gray font-medium text-[0.9rem]'>Overall rating : </p>
                        <div className='flex gap-[10px]'>
                            <p className='font-medium underline'>5.00</p>
                            <div className='flex gap-[5px]'>
                                <img src={rating} className='w-[24px] h-[24px]' alt=""/>
                                <img src={rating} className='w-[24px] h-[24px]' alt=""/>
                                <img src={rating} className='w-[24px] h-[24px]' alt=""/>
                                <img src={rating} className='w-[24px] h-[24px]' alt=""/>
                                <img src={rating} className='w-[24px] h-[24px]' alt=""/>
                            </div>
                        </div>
                    </div>
                    <div >
                        <button className='px-[1rem] py-[0.4rem] font-medium text-white text-[0.95rem] bg-primary rounded-lg hover:bg-hovers'>Enroll Now</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SpecificCoursePage