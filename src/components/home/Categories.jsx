


import it from '../../assets/it.png'
import ai from '../../assets/ai.png'
import business from '../../assets/business.png'
import english from '../../assets/english.png'
import management from '../../assets/management.png'
import arrow from '../../assets/arrow.svg'





export default function Categories(){
    return(
        <div className='lg:h-[450px] bg-dark w-full flex gap-[2rem] justify-center flex-col items-center py-[4rem]'>
            <div>
                <h1 className='font-medium lg:text-2xl text-xl text-center'>Explore Our Popular Categories ...</h1>
            </div>
            <div className='w-[80%] mx-auto flex flex-col lg:flex-row items-center justify-center gap-[40px] '>
                <div
                    className='bg-background py-[2rem] flex flex-col gap-[1rem] rounded-2xl w-[275px] items-center cursor-pointer hover:scale-105'>
                    <img src={it} className='w-[100px] h-[100px]' alt=""/>
                    <p className='text-gray-500 font-medium'>IT</p>
                    <div className='flex gap-3 items-center'>
                        <p className='text-gray-300 font-normal text-[0.9rem]'>123 courses</p>
                        <img src={arrow} className='w-[25px] h-[25px]' alt="arrow icon"/>
                    </div>
                </div>
                <div
                    className='bg-background py-[2rem] flex flex-col gap-[1rem] rounded-2xl w-[275px] items-center cursor-pointer hover:scale-105'>
                    <img src={ai} className='w-[100px] h-[100px]' alt=""/>
                    <p className='text-gray-500 font-medium'>AI</p>
                    <div className='flex gap-3 items-center'>
                        <p className='text-gray-300 font-normal text-[0.9rem]'>25 courses</p>
                        <img src={arrow} className='w-[25px] h-[25px] ' alt="arrow icon"/>
                    </div>
                </div>
                <div
                    className='bg-background py-[2rem] flex flex-col gap-[1rem] rounded-2xl w-[275px] items-center cursor-pointer hover:scale-105'>
                    <img src={business} className='w-[100px] h-[100px]' alt=""/>
                    <p className='text-gray-500 font-medium'>BUSINESS</p>
                    <div className='flex gap-3 items-center'>
                        <p className='text-gray-300 font-normal text-[0.9rem]'>250 courses</p>
                        <img src={arrow} className='w-[25px] h-[25px] ' alt="arrow icon"/>
                    </div>
                </div>
                <div
                    className='bg-background py-[2rem] flex flex-col gap-[1rem] rounded-2xl w-[275px] items-center cursor-pointer hover:scale-105'>
                    <img src={management} className='w-[100px] h-[100px]' alt=""/>
                    <p className='text-gray-500 font-medium'>MANAGEMENT</p>
                    <div className='flex gap-3 items-center'>
                        <p className='text-gray-300 font-normal text-[0.9rem]'>50 courses</p>
                        <img src={arrow} className='w-[25px] h-[25px] ' alt="arrow icon"/>
                    </div>
                </div>
                <div
                    className='bg-background py-[2rem] flex flex-col gap-[1rem] rounded-2xl w-[275px] items-center cursor-pointer hover:scale-105'>
                    <img src={english} className='w-[100px] h-[100px]' alt=""/>
                    <p className='text-gray-500 font-medium'>ENGLISH</p>
                    <div className='flex gap-3 items-center'>
                        <p className='text-gray-300 font-normal text-[0.9rem]'>789 courses</p>
                        <img src={arrow} className='w-[25px] h-[25px] ' alt="arrow icon"/>
                    </div>
                </div>
            </div>
        </div>
    )
}