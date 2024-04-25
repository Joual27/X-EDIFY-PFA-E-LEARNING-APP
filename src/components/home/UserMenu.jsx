import {useUser} from "../../hooks/contexts/UserContext.jsx";
import profile from "../../assets/profile.png";
import course from '../../assets/course.png'
import logoutIcon from '../../assets/logout.png'
import {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {fetchAuthenticatedUser} from "../../data/auth/authenticationData.js";


const UserMenu = () => {
    const {user , role ,logout}= useUser();
    const navigate = useNavigate();
    const [menuIsOpen, setMenuIsOpen] = useState(false);

    const handleMenu = () => {
        if(menuIsOpen){
            setMenuIsOpen(false)
        }
        else {
            setMenuIsOpen(true)
        }
    };



    const handleLogout = async () => {
        const res = await logout();
        if (res.data.case === 'logged_out'){
            logout();
            localStorage.clear();
            navigate('/');
        }
        else{
            console.log(res.data.message)
        }
    }


    const StudentMenuItems = () => {
        return (
            <div className='absolute top-[57.5px] right-[10.5%] bg-dark text-gray font-medium  w-[150px] rounded-2xl'>
                <ul className='w-full px-[7.5%] flex flex-col py-[1.5rem] text-[0.85rem] gap-[1.25rem] '>
                    <Link to={'/user/profile/update'}>
                        <div className='w-full flex items-center gap-[7.5px]'>
                            <img src={profile} className='w-[24px] h-[24px]' alt=""/>
                            <p className='hover:text-main cursor-pointer'>Update Profile</p>
                        </div>
                    </Link>
                    <Link to={'/student/dashboard'}>
                        <div className='w-full flex items-center gap-[7.5px]'>
                            <img src={course} className='w-[24px] h-[24px]' alt=""/>
                            <p className='hover:text-main cursor-pointer'>My courses</p>
                        </div>
                    </Link>
                    <div className='w-full flex items-center gap-[7.5px]' onClick={handleLogout}>
                        <img src={logoutIcon} className='w-[24px] h-[24px]' alt=""/>
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
                    <Link to={'/user/profile/update'} replace={true}>
                        <div className='w-full flex items-center gap-[7.5px]'>
                            <img src={profile} className='w-[24px] h-[24px]' alt=""/>
                            <p className='hover:text-main cursor-pointer'>Update Profile</p>
                        </div>
                    </Link>
                    <div className='w-full flex items-center gap-[7.5px]'>
                        <img src={course} className='w-[24px] h-[24px]' alt=""/>
                        <p className='hover:text-main cursor-pointer'>My courses</p>
                    </div>
                    <div className='w-full flex items-center gap-[7.5px]' onClick={handleLogout}>
                        <img src={logoutIcon} className='w-[24px] h-[24px]' alt=""/>
                        <button className='hover:text-main cursor-pointer'>logout</button>
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
                <img src={user.image !== 'profile.png' ? user.image : profile} className='w-[40px] h-[40px] rounded-full' alt=""/>
            </div>

            {(role === 'student' && menuIsOpen) && <StudentMenuItems/>}
            {(role === 'instructor' && menuIsOpen) && <InstructorMenuItems/>}
        </>
    )
}
export default UserMenu