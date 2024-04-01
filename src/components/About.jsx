

import about from '../assets/about.svg'

export default function About(){
    return(
        <div className='bg-dark py-[4rem] lg:pt-[2rem]'>
            <div>
                <h1 className='font-medium text-2xl text-center lg:my-[2rem]'>About X-Edify ...</h1>
            </div>
            <div className='w-[80%] lg:w-[70%] mx-auto flex flex-col-reverse lg:flex-row items-center lg:justify-between'>
                <div className='w-full lg:w-[45%] '>
                    <p className='text-gray font-medium'>X-EDIFY is a cutting-edge e-learning platform dedicated to revolutionizing the way individuals engage with education. With a commitment to fostering lifelong learning, X-EDIFY offers a diverse range of courses designed to empower learners of all backgrounds and skill levels. Whether it is mastering a new language, acquiring technical skills, or delving into professional development, X-EDIFY provides an immersive and interactive learning experience tailored to individual needs. Our platform combines innovative technology with expert instruction to deliver high-quality content that inspires curiosity, fosters creativity, and promotes personal growth. At X-EDIFY, we believe in the transformative power of education to shape minds, elevate lives, and build a brighter future for all.</p>
                </div>
                <img src={about} className='w-full h-[300px] lg:w-[500px] h-[450px]' alt=""/>
            </div>
        </div>
    )
}