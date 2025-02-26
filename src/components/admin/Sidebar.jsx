
import logo from '../../assets/logo.png'
import {useUser} from "../../hooks/contexts/UserContext.jsx";
import profile from '../../assets/profile.png'
import categories from "../../assets/category.svg";
import {logout} from "../../data/auth/authenticationData.js";
import {useNavigate} from "react-router-dom";
const Sidebar = () => {
    const {user,logout} = useUser();

    const navigate = useNavigate();

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



    return (
        <div>
            <aside
                className="flex flex-col w-[320px] py-[2rem] h-screen overflow-x-hidden overflow-y-auto bg-dark border-r rtl:border-r-0 rtl:border-l  dark:border-gray-700">
                <a href="#" className="mx-auto">
                    <img className="w-[200px] h-[80px]" src={logo} alt=""/>
                </a>
                <div className="bg-gray-700 w-full h-[1px]"></div>

                <div className="flex flex-col items-center mt-6 -mx-2">
                    <img className="object-cover w-16 h-16 mx-2 rounded-full"
                         src={profile}
                         alt="avatar"/>
                    <h4 className="mx-2 mt-2 font-medium text-gray-800 dark:text-gray-200">{user.name}</h4>
                    <p className="mx-2 mt-1 text-sm font-medium text-gray-600 dark:text-gray-400">Admin</p>
                </div>

                <div className="bg-gray-700 w-full h-[1px] mt-5"></div>

                <div className="flex flex-col justify-between flex-1 mt-6">
                    <nav>
                        <a className="flex items-center px-4 py-2 text-gray transition-colors duration-300 rounded-lg hover:text-orange-500"
                           href="#">
                            <svg className="w-5 h-5"  xmlns="http://www.w3.org/2000/svg" width="24"
                                 height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor"
                                      d="M4 4.5V19a1 1 0 0 0 1 1h15M7 14l4-4 4 4 5-5m0 0h-3.207M20 9v3.207"/>
                            </svg>


                            <span className="mx-4 font-medium">Dashboard</span>
                        </a>

                        <button onClick={handleLogout} className="flex items-center px-4 py-2 mt-5 text-gray-300 hover:text-orange-500 transition-colors duration-300  rounded-lg ">
                            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24"
                                 height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor"
                                      d="M16 12H4m12 0-4 4m4-4-4-4m3-4h2a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3h-2"/>
                            </svg>


                            <span className="mx-4 font-medium">Log out</span>
                        </button>
                    </nav>
                </div>
            </aside>

        </div>
    );
};

export default Sidebar;