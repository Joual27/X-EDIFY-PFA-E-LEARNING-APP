import logo from '../../assets/logo.png'
// import phone from '../assets/phone.png'
import menu from '../../assets/menu.svg'
import {useState} from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import {useUser} from "../../hooks/contexts/UserContext.jsx";
import UserMenu from "./UserMenu.jsx";
export default function Navbar(props){

    const [navOpen,setNavOpen] = useState(false);
    const {user,role} = useUser();

    const toggleNav = () => {
        setNavOpen(!navOpen);
    }

    return (
        <nav
            className='w-full bg-primary h-[60px] flex  lg:w-full lg:bg-primary lg:h-[80px] lg:font-medium lg:flex lg:items-center lg:overflow-hidden'>
            <div className='w-full px-[0.75rem] flex justify-between items-center lg:w-[80%]  lg:mx-auto '>
                <div>
                    <img src={logo} alt="app logo" className='w-[120px] h-[50px] lg:w-[150px] lg:h-[60px]'/>
                </div>
                {
                    (role !== 'instructor') &&
                    <ul className={`${navOpen ? 'block' : 'hidden'} absolute inset-0 gap-[30px] uppercase text-xl lg:text-[1rem] bg-primary flex flex-col items-center pt-[65%] w-full h-[calc(100vh-50px)] mt-[50px] z-10 lg:w-[30%] lg:relative lg:flex lg:pt-0 lg:flex-row lg:z-0 lg:mt-0 lg:gap-[30px] lg:items-center `}>
                        <Link to='/'>
                            <li><p className='cursor-pointer hover:border-b-2 border-secondary'>Home</p></li>
                        </Link>
                        <Link to='/courses/all'>
                            <li><p className='cursor-pointer hover:border-b-2 border-secondary'>Courses</p></li>
                        </Link>
                        <li><p className='cursor-pointer hover:border-b-2 border-secondary'>Careers</p></li>
                        <li><p className='cursor-pointer hover:border-b-2 border-secondary'>Teachers</p></li>
                        <li><p className='cursor-pointer hover:border-b-2 border-secondary'>About</p></li>
                    </ul>
                }
                {
                    (user == null) ?
                      (
                          <div className='mr-[3rem] lg:flex lg:mr-0 lg:gap-[12.5px] lg:items-center'>
                            <button className='underline hover:text-gray' onClick={props.onLoginBtnClick}>Log In
                            </button>
                          </div>
                      ) : (
                         <UserMenu/>
                        )
                }
            </div>
            <div>
                <img src={menu} onClick={toggleNav}
                     className='w-[40px] h-[40px] absolute top-[0.75rem] right-[0.75rem] cursor-pointer lg:hidden '
                     alt="burger menu icon "/></div>
        </nav>
    )

}
Navbar.propTypes = {
    onLoginBtnClick: PropTypes.func,
};