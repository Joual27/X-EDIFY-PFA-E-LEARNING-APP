
import Sidebar from "./Sidebar.jsx";
import edit from '../../assets/edit.png'
import deleteIcon from '../../assets/delete.png'
import ban from '../../assets/ban.png'
import categories from '../../assets/category.svg'
import {useEffect, useState} from "react";
import {fetchAdminStats, fetchAdminUsers} from "../../data/admin/adminData.js";
const AdminUsers = () => {

    const [stats,setStats] = useState({
        totalUsers : 0,
        totalCategories : 0,
        totalCourses : 0,
        totalTeachers : 0
    });
    const [users,setUsers] = useState([]);

    const fetchStatsData = async () => {
        const res = await fetchAdminStats();
        if (res.data.case === 'success'){
            setStats(res.data.data);
        }
        else {
            console.log(res.data.message);
        }
    }

    const fetchUsersData = async () => {
        const res = await fetchAdminUsers();
        if (res.data.case === 'success'){
            setUsers(res.data.users);
        }
        else {
            console.log(res.data.message);
        }

    }

    useEffect(() => {
        fetchStatsData();
        fetchUsersData();
    }, []);

    return (
        <div className="flex">
            <Sidebar />
            <div>
                <section className="bg-black w-full px-5 py-2.5 overflow-y-hidden">
                    <div className="text-center flex gap-3 items-center">
                        <svg className="w-9 h-9 text-orange-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                             width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor"
                                  d="M4 4.5V19a1 1 0 0 0 1 1h15M7 14l4-4 4 4 5-5m0 0h-3.207M20 9v3.207"/>
                        </svg>
                        <h1 className="text-3xl text-white font-bold font-mono mt-1">Dashboard</h1>
                    </div>
                    <div className="bg-gray-700 w-full h-[1px] mt-5"></div>
                    <div className="flex flex-wrap items-center mt-6 gap-5 ">
                        <div className="bg-primary bg-opacity-70 rounded-lg flex flex-col items-center pb-[1.5rem]">
                            <div className="p-4 flex items-center gap-[10px]">
                                <h1 className="text-white  font-medium">Total Number Of Users</h1>
                                <div className="flex justify-between mt-2 px-2">
                                    <h1 id="user-count" className="text-white font-medium text-2xl"></h1>
                                    <svg className="w-8 h-8 text-orange-500" aria-hidden="true"
                                         xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                                         viewBox="0 0 24 24">
                                        <path stroke="white"
                                              d="M16 19h4a1 1 0 0 0 1-1v-1a3 3 0 0 0-3-3h-2m-2.236-4a3 3 0 1 0 0-4M3 18v-1a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1Zm8-10a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                                    </svg>
                                </div>
                            </div>
                            <div className='w-full flex items-center justify-center text-main font-bold'>
                                <p>{stats.totalUsers}</p>
                            </div>
                        </div>
                        <div className="bg-primary bg-opacity-70 rounded-lg flex flex-col items-center pb-[1.5rem]">
                            <div className="p-4 flex items-center gap-[10px]">
                                <h1 className="text-white  font-medium">Total Number Of Categories</h1>
                                <div className="flex justify-between mt-2 px-2">
                                    <h1 id="user-count" className="text-white font-medium text-2xl"></h1>
                                    <svg className="w-8 h-8 text-orange-500" aria-hidden="true"
                                         xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                                         viewBox="0 0 24 24">
                                        <path stroke="white"
                                              d="M12 15v5m-3 0h6M4 11h16M5 15h14a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1Z"/>
                                    </svg>
                                </div>
                            </div>
                            <div className='w-full flex items-center justify-center text-main font-bold'>
                                <p>{stats.totalCategories}</p>
                            </div>
                        </div>
                        <div className="bg-primary bg-opacity-70 rounded-lg flex flex-col items-center pb-[1.5rem]">
                            <div className="p-4 flex items-center gap-[10px]">
                                <h1 className="text-white  font-medium">Total Number Of Courses</h1>
                                <div className="flex justify-between mt-2 px-2">
                                    <h1 id="user-count" className="text-white font-medium text-2xl"></h1>
                                    <svg className="w-8 h-8 text-orange-500" aria-hidden="true"
                                         xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                                         viewBox="0 0 24 24">
                                        <path stroke="white"
                                              d="M12 15v5m-3 0h6M4 11h16M5 15h14a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1Z"/>
                                    </svg>
                                </div>
                            </div>
                            <div className='w-full flex items-center justify-center text-main font-bold'>
                                <p>{stats.totalCourses}</p>
                            </div>
                        </div>
                        <div className="bg-primary bg-opacity-70 rounded-lg flex flex-col items-center pb-[1.5rem]">
                            <div className="p-4 flex items-center gap-[10px]">
                                <h1 className="text-white  font-medium">Total Number Of Instructors</h1>
                                <div className="flex justify-between mt-2 px-2">
                                    <h1 id="user-count" className="text-white font-medium text-2xl"></h1>
                                    <svg className="w-8 h-8 text-orange-500" aria-hidden="true"
                                         xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                                         viewBox="0 0 24 24">
                                        <path stroke="white"
                                              d="M12 15v5m-3 0h6M4 11h16M5 15h14a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1Z"/>
                                    </svg>
                                </div>
                            </div>
                            <div className='w-full flex items-center justify-center text-main font-bold'>
                                <p>{stats.totalTeachers}</p>
                            </div>
                        </div>


                    </div>

                    <div className="flex flex-wrap gap-5 py-6 w-full">

                        <div className="bg-gradient-to-t from-zinc-900  rounded-lg  w-full">
                            <div className="flex justify-between items-center p-5">
                                <div className="flex gap-3 items-center">
                                    <svg className="w-6 h-6 text-orange-500" aria-hidden="true"
                                         xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                                         viewBox="0 0 24 24">
                                        <path stroke="currentColor"
                                              d="M16 19h4a1 1 0 0 0 1-1v-1a3 3 0 0 0-3-3h-2m-2.236-4a3 3 0 1 0 0-4M3 18v-1a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1Zm8-10a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                                    </svg>
                                    <h1 className="text-xl text-main font-bold "> Users</h1>
                                </div>
                            </div>
                            <div className="bg-gray-700 w-full h-[1px] "></div>

                            <div className="p-2 w-full">
                                <table className="w-full text-center">
                                    <thead className="text-primary text-sm border-b-2 ">
                                    <tr>
                                        <th>ID</th>
                                        <th>FULL NAME</th>
                                        <th>EMAIL</th>
                                        <th>image</th>
                                        <th className="py-3">ROLE</th>
                                        <th className="">ACTIONS</th>
                                    </tr>
                                    </thead>

                                    <tbody id="latest-users" className="text-[0.9rem] font-semibold text-main">
                                    {
                                        users.map(user => (
                                            <tr key={user.id}>
                                                <td>{user.id}</td>
                                                <td>{user.name}</td>
                                                <td>{user.email}</td>
                                                <td className='flex justify-center py-[0.5rem]'><img src={user.image} className='w-[40px] h-[40px]' alt=""/></td>
                                                <td className="py-3 ">{
                                                    user.student ? <div
                                                            className=' w-full  py-[0.35rem] bg-primary rounded-lg flex items-center justify-center text-white font-medium text-[0.85rem]'>student</div> :
                                                        <div
                                                            className='w-full py-[0.35rem] bg-hovers rounded-lg flex items-center justify-center text-white font-medium text-[0.85rem]'>Instructor</div>
                                                }</td>
                                                <td className='flex justify-center'><img src={ban}
                                                                                         className='w-[35px] h-[35px] cursor-pointer'
                                                                                         alt=""/></td>
                                            </tr>
                                        ))
                                    }
                                    </tbody>

                                </table>
                            </div>
                            <div className="flex justify-between items-center p-5 mt-[5rem]">
                                <div className="flex gap-3 items-center">
                                    <img src={categories} className='w-[30px] h-[30px]' alt=""/>
                                    <h1 className="text-xl text-main font-bold "> Categories</h1>
                                </div>
                            </div>
                            <div className="p-2 w-full">
                                <table className="w-full text-center">
                                    <thead className="text-primary text-sm border-b-2 ">
                                    <tr>
                                        <th>ID</th>
                                        <th>FULL NAME</th>
                                        <th>EMAIL</th>
                                        <th className="py-3">ROLE</th>
                                        <th className="">ACTIONS</th>
                                    </tr>
                                    </thead>

                                    <tbody id="latest-users" className="text-[0.9rem] font-semibold text-main">
                                    <tr>
                                        <td>10</td>
                                        <td>Javascript</td>
                                        <td>Javascript</td>
                                        <td className="py-3">12 Avr 2024</td>
                                        <td className='flex justify-center'>
                                            <img src={edit} className='w-[35px] h-[35px]' alt=""/>
                                            <img src={deleteIcon} className='w-[35px] h-[35px]' alt=""/>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                    </div>
                </section>
            </div>
        </div>
    );
};

export default AdminUsers;