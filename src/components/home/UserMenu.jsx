import {useUser} from "../../hooks/contexts/UserContext.jsx";
import profile from "../../assets/profile.png";
import course from '../../assets/course.png'
import logout from '../../assets/logout.png'
import {useState} from "react";


const UserMenu = () => {
    const {user , role}= useUser();

    const [menuIsOpen, setMenuIsOpen] = useState(false);

    const handleMenu = () => {
        if(menuIsOpen){
            setMenuIsOpen(false)
        }
        else {
            setMenuIsOpen(true)
        }
    };



    const StudentMenuItems = () => {
        return (
            <div className='absolute top-[57.5px] right-[10.5%] bg-dark text-gray font-medium  w-[150px] rounded-2xl'>
                <ul className='w-full px-[7.5%] flex flex-col py-[1.5rem] text-[0.85rem] gap-[1.25rem] '>
                    <div className='w-full flex items-center gap-[7.5px]'>
                        <img src={profile} className='w-[24px] h-[24px]' alt=""/>
                        <p className='hover:text-main cursor-pointer'>Update Profile</p>
                    </div>
                    <div className='w-full flex items-center gap-[7.5px]'>
                        <img src={course} className='w-[24px] h-[24px]' alt=""/>
                        <p className='hover:text-main cursor-pointer'>My courses</p>
                    </div>
                    <div className='w-full flex items-center gap-[7.5px]'>
                        <img src={logout} className='w-[24px] h-[24px]' alt=""/>
                        <p className='hover:text-main cursor-pointer'>logout</p>
                    </div>
                </ul>
            </div>
        )
    }
    const InstructorMenuItems = () => {
        return (
            <div className='absolute top-[57.5px] right-[10.5%] bg-dark text-gray font-medium  w-[150px] rounded-2xl'>
                <ul className='w-full px-[7.5%] flex flex-col py-[1.5rem] text-[0.85rem] gap-[1.25rem] '>
                    <div className='w-full flex items-center gap-[7.5px]'>
                        <img src={profile} className='w-[24px] h-[24px]' alt=""/>
                        <p className='hover:text-main cursor-pointer'>Update Profile</p>
                    </div>
                    <div className='w-full flex items-center gap-[7.5px]'>
                        <img src={course} className='w-[24px] h-[24px]' alt=""/>
                        <p className='hover:text-main cursor-pointer'>My courses</p>
                    </div>
                    <div className='w-full flex items-center gap-[7.5px]'>
                        <img src={logout} className='w-[24px] h-[24px]' alt=""/>
                        <p className='hover:text-main cursor-pointer'>logout</p>
                    </div>
                </ul>
            </div>
        )
    }


    return (
        <>
            <div className='flex items-center gap-[10px] cursor-pointer'
                 onClick={handleMenu}
            >
                <p className=' font-medium text-[0.9rem]'>{user.name}</p>
                <img src={profile} className='w-[30px] h-[30px]' alt=""/>
            </div>

            {(role === 'student' && menuIsOpen) && <StudentMenuItems/>}
            {(role === 'instructor' && menuIsOpen) && <InstructorMenuItems/>}
        </>
    )
}
export default UserMenu