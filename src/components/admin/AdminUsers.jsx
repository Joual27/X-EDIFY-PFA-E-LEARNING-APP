
import Sidebar from "./Sidebar.jsx";
import edit from '../../assets/edit.png'
import deleteIcon from '../../assets/delete.png'
import ban from '../../assets/ban.png'
import profile from '../../assets/profile.png'
import categoriesIcon from '../../assets/category.svg'
import {useEffect, useState} from "react";
import {
    banUser,
    createCategory, deleteCategory,
    fetchAdminCategories,
    fetchAdminStats,
    fetchAdminUsers,
    fetchCategoryToUpdateData, updateCategory
} from "../../data/admin/adminData.js";
import close from "../../assets/close.png";
import {useUser} from "../../hooks/contexts/UserContext.jsx";
const AdminUsers = () => {

    const [stats,setStats] = useState({
        totalUsers : 0,
        totalCategories : 0,
        totalCourses : 0,
        totalTeachers : 0
    });
    const [users,setUsers] = useState([]);
    const [categoryData,setCategoryData] = useState({
        name : ''
    })
    const [categoryDeletedSuccess,setCategoryToDeleteSuccess] = useState(false);
    const [categoryCreatedSuccess,setCategoryCreatedSuccess] = useState(false);
    const [categoryUpdateSuccess,setCategoryUpdateSuccess] = useState(false);
    const [userBannedSuccess,setUserBannedSuccess] = useState(false);
    const [shownCategoryCreationPopup,setShownCategoryCreationPopup] = useState(false);
    const [shownCategoryUpdatePopup,setShownCategoryUpdatePopup] = useState(false);
    const [categoryToUpdate,setCategoryToUpdate] = useState({
        id : null,
        name : ""
    });
    const [categories,setCategories] = useState([]);
    const [error,setError] = useState('');
    const [updateErr,setUpdateErr] = useState('');

    const fetchStatsData = async () => {
        const res = await fetchAdminStats();
        if (res.data.case === 'success'){
            setStats(res.data.data);
        }
        else {
            console.log(res.data.message);
        }
    }


    const bringCategoryToUpdateData = async () => {
        const res = await fetchCategoryToUpdateData(categoryToUpdate.id);
        if (res.data.case === 'success'){
            setCategoryToUpdate({
                ...categoryToUpdate,
                name : res.data.category.name
            });
        }
        else{
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
    const fetchCategoriesData = async () => {
        const res = await fetchAdminCategories();
        if (res.data.case === 'success'){
            setCategories(res.data.categories);
        }
        else {
            console.log(res.data.message);
        }
    }

    const handleCategoryCreation = async (e) => {
        e.preventDefault();
        const res = await createCategory(categoryData.name);
        if(res.data.case === 'success'){
            setCategoryCreatedSuccess(true);
            setTimeout(()=>{
                setShownCategoryCreationPopup(false);
                fetchCategoriesData()
            },1500)
        }
        else if(res.data.case === 'validation_error'){
            setError(res.data.errors.name[0]);
        }
        else {
            console.log(res.data.message);
        }
    }

    const handleCategoryUpdate = async (e) => {
        e.preventDefault();
        const res = await updateCategory(categoryToUpdate);
        if(res.data.case === 'success'){
            setCategoryUpdateSuccess(true);
            setTimeout(() =>{
                setShownCategoryUpdatePopup(false);
                fetchCategoriesData();

            },1500)
            setCategoryToUpdate({
                id : null,
                name : ""
            })
        }
        else if(res.data.case === 'validation_error'){
            setUpdateErr(res.data.errors.name[0]);
        }
        else {
            console.log(res.data.message);
        }
    }

    const handleCategoryDeletion = async (e) => {
        let id = e.target.getAttribute('data-id');
        const res = await deleteCategory(id);
        if (res.data.case === 'success'){
            setCategoryToDeleteSuccess(true);
            fetchCategoriesData();
        }
        else {
            console.log(res.data.message);
        }
    }

    const handleHidingCategoryUpdateForm = () =>{
        setShownCategoryUpdatePopup(false);
        setCategoryToUpdate({
            id : null,
            name : ""
        })
    }
    const handleShowingCategoryUpdateForm = (e) =>{
        setShownCategoryUpdatePopup(true);
        setCategoryToUpdate({
            id: e.currentTarget.getAttribute("data-id"),
        })
    }
    const handleHidingCategoryCreationForm = () =>{
        setShownCategoryCreationPopup(false);
    }
    const handleShowingCategoryCreationForm = () =>{
        setShownCategoryCreationPopup(true);
    }

    const handleCategoryDataChange = (e) => {
        setCategoryData({
            name: e.target.value
        })
    }
    const handleCategoryToUpdateDataChange = (e) => {
        setCategoryToUpdate(prevState => ({
            ...prevState,
            name: e.target.value.trim()
        }));
    };

    const handleUsersBanning = async (e) => {
        let id = e.target.getAttribute('data-id');
        const res = await banUser(id);
        if(res.data.case === 'success'){
            setUserBannedSuccess(true);
            fetchUsersData();
        }
        else {
            console.log(res.data.message);
        }
    }

    useEffect(() => {
        fetchStatsData();
        fetchUsersData();
        fetchCategoriesData();
    }, []);
    useEffect(() => {
        fetchStatsData();
    }, [categories,users]);


    useEffect(() => {
        if(categoryToUpdate.id){
            bringCategoryToUpdateData();
        }
    }, [categoryToUpdate.id]);

    useEffect(() => {
        if (categoryCreatedSuccess) {
            const timer = setTimeout(() => {
                setCategoryCreatedSuccess(false);
            }, 2500);
            return () => clearTimeout(timer);
        }
    }, [categoryCreatedSuccess]);

    useEffect(() => {
        if (categoryUpdateSuccess) {
            const timer = setTimeout(() => {
                setCategoryUpdateSuccess(false);
            }, 2500);
            return () => clearTimeout(timer);
        }
    }, [categoryUpdateSuccess]);
    useEffect(() => {
        if (categoryDeletedSuccess) {
            const timer = setTimeout(() => {
                setCategoryToDeleteSuccess(false);
            }, 2500);
            return () => clearTimeout(timer);
        }
    }, [categoryDeletedSuccess]);
    useEffect(() => {
        if (userBannedSuccess) {
            const timer = setTimeout(() => {
                setUserBannedSuccess(false);
            }, 2500);
            return () => clearTimeout(timer);
        }
    }, [userBannedSuccess]);
    useEffect(() => {
        if (error !== '') {
            const timer = setTimeout(() => {
                setError('');
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [error]);
    useEffect(() => {
        if (updateErr !== '') {
            const timer = setTimeout(() => {
                setUpdateErr('');
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [updateErr]);

    return (
        <>
            <div className="flex">
                <Sidebar/>
                <div className='w-full flex pl-[7.5rem]'>
                    <div>
                        <section className="bg-black w-full px-5 py-2.5 overflow-y-hidden">
                            <div className="text-center flex gap-3 items-center">
                                <svg className="w-9 h-9 text-orange-500" aria-hidden="true"
                                     xmlns="http://www.w3.org/2000/svg"
                                     width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor"
                                          d="M4 4.5V19a1 1 0 0 0 1 1h15M7 14l4-4 4 4 5-5m0 0h-3.207M20 9v3.207"/>
                                </svg>
                                <h1 className="text-3xl text-white font-bold font-mono mt-1">Dashboard</h1>
                            </div>
                            <div className="bg-gray-700 w-full h-[1px] mt-5"></div>
                            <div className="flex flex-wrap items-center mt-6 gap-5 ">
                                <div
                                    className="bg-primary bg-opacity-70 rounded-lg flex flex-col items-center pb-[1.5rem]">
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
                                <div
                                    className="bg-primary bg-opacity-70 rounded-lg flex flex-col items-center pb-[1.5rem]">
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
                                <div
                                    className="bg-primary bg-opacity-70 rounded-lg flex flex-col items-center pb-[1.5rem]">
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
                                <div
                                    className="bg-primary bg-opacity-70 rounded-lg flex flex-col items-center pb-[1.5rem]">
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
                                    {
                                        userBannedSuccess && <div
                                            className='w-[20%] mx-auto bg-green h-[40px] rounded-lg text-white font-medium text-[0.9rem] flex items-center justify-center bg-opacity-90'>
                                            <p>User Banned successfully !</p>
                                        </div>
                                    }
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
                                                        <td className='flex justify-center py-[0.5rem]'><img
                                                            src={user.image !== 'profile.png' ? user.image : profile}
                                                            className='w-[40px] h-[40px]' alt=""/></td>
                                                        <td className="py-3 ">{
                                                            user.student ? <div
                                                                    className=' w-full  py-[0.35rem] bg-primary bg-opacity-70 rounded-lg flex items-center justify-center text-white font-medium text-[0.85rem]'>student</div> :
                                                                <div
                                                                    className='w-full py-[0.35rem] bg-hovers rounded-lg flex items-center justify-center text-white font-medium text-[0.85rem]'>Instructor</div>
                                                        }</td>
                                                        <td className='flex justify-center'><img src={ban}
                                                                                                 onClick={handleUsersBanning}
                                                                                                 data-id={user.id}
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
                                            <img src={categoriesIcon} className='w-[30px] h-[30px]' alt=""/>
                                            <h1 className="text-xl text-main font-bold "> Categories</h1>
                                        </div>
                                        <button
                                            onClick={handleShowingCategoryCreationForm}
                                            className='bg-primary px-[0.7rem] py-[0.35rem] rounded-md text-white font-medium text-[0.85rem] hover:bg-hovers'>
                                            + Add Category
                                        </button>
                                    </div>
                                    {
                                        categoryDeletedSuccess && <div
                                            className='w-[20%] mx-auto bg-red h-[40px] rounded-lg text-white font-medium text-[0.9rem] flex items-center justify-center bg-opacity-70'>
                                            <p>Category deleted successfully !</p>
                                        </div>
                                    }
                                    <div className="p-2 w-full">
                                        <table className="w-full text-center">
                                            <thead className="text-primary text-sm border-b-2 ">
                                            <tr>
                                            <th>ID</th>
                                                <th>Category NAME</th>
                                                <th className="">ACTIONS</th>
                                            </tr>
                                            </thead>

                                            <tbody id="latest-users" className="text-[0.9rem] font-semibold text-main">
                                            {
                                                categories && categories.map(category => (
                                                    <tr key={category.id}>
                                                        <td className='py-[0.5rem]'>{category.id}</td>
                                                        <td className='py-[0.5rem]' id='name'>{category.name}</td>
                                                        <td className='flex justify-center gap-[10px] py-[0.5rem]'>
                                                            <img src={edit} data-id={category.id}
                                                                 onClick={handleShowingCategoryUpdateForm}
                                                                 className='w-[25px] h-[25px] cursor-pointer'
                                                                 alt=""/>
                                                            <img src={deleteIcon}
                                                                 onClick={handleCategoryDeletion}
                                                                 data-id={category.id}
                                                                 className='w-[25px] h-[25px] cursor-pointer'
                                                                 alt=""/>
                                                        </td>
                                                    </tr>
                                                ))
                                            }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                            </div>
                        </section>
                    </div>
                </div>
            </div>
            <div
                className={`fixed inset-0 w-full h-[100vh] bg-overlay bg-opacity-60 flex items-center justify-center ${!shownCategoryCreationPopup && 'hidden'}`}>
                <div
                    className='w-[20%] rounded-lg bg-white min-h-[200px] relative flex flex-col items-center gap-[1rem] pb-[1.5rem] pt-[3.5rem]'>
                    <div
                        className='absolute top-0 left-0 w-full bg-primary h-[40px] rounded-t-lg flex justify-end px-[1rem] items-center'>
                        <img src={close} onClick={handleHidingCategoryCreationForm}
                             className='w-[24px] h-[24px] cursor-pointer' alt=""/>
                    </div>
                    <div className='w-full flex justify-center items-center'>
                        <p className='text-main font-semibold text-[0.95rem]'>ADD CATEGORY FORM</p>
                    </div>
                    {
                        categoryCreatedSuccess &&
                        <p className='text-green font-medium text-[0.85rem] underline'>Category Added Successfully! </p>
                    }
                    {
                        updateErr !== '' && <p className='text-red font-medium text-[0.85rem] underline'>{error}</p>
                    }
                    <div className='w-full flex justify-center items-center'>
                        <div>
                            <label htmlFor="hs-trailing-button-add-on" className="sr-only">Label</label>
                            <form method='POST' onSubmit={handleCategoryCreation}>
                                <div className="flex rounded-lg shadow-sm">
                                    <input
                                        type="text"
                                        onChange={handleCategoryDataChange}
                                        placeholder='Category Name'
                                        id="hs-trailing-button-add-on"
                                        className="py-3 px-4 block w-full border-gray shadow-sm rounded-s-lg text-sm focus:outline-none placeholder:text-[0.85rem] font-medium"
                                    />
                                    <button
                                        type="submit"
                                        className="py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-e-md border border-transparent bg-primary bg-opacity-80 hover:bg-hovers text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                                    >
                                        Create
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div
                className={`fixed inset-0 w-full h-[100vh] bg-overlay bg-opacity-60 flex items-center justify-center ${!shownCategoryUpdatePopup && 'hidden'}`}>
                <div
                    className='w-[20%] rounded-lg bg-white min-h-[200px] relative flex flex-col items-center gap-[1rem] pb-[1.5rem] pt-[3.5rem]'>
                    <div
                        className='absolute top-0 left-0 w-full bg-primary h-[40px] rounded-t-lg flex justify-end px-[1rem] items-center'>
                        <img src={close} onClick={handleHidingCategoryUpdateForm}
                             className='w-[24px] h-[24px] cursor-pointer' alt=""/>
                    </div>
                    <div className='w-full flex justify-center items-center'>
                        <p className='text-main font-semibold text-[0.95rem]'>UPDATE CATEGORY FORM</p>
                    </div>
                    {
                        categoryUpdateSuccess &&
                        <p className='text-green font-medium text-[0.85rem] underline'>Category Updated
                            Successfully! </p>
                    }
                    {
                        error !== '' && <p className='text-red font-medium text-[0.85rem] underline'>{error}</p>
                    }
                    <div className='w-full flex justify-center items-center'>
                        <div>
                            <label htmlFor="hs-trailing-button-add-on" className="sr-only">Label</label>
                            <form method='PUT' onSubmit={handleCategoryUpdate}>
                                <div className="flex rounded-lg shadow-sm">
                                    <input
                                        type="text"
                                        onChange={handleCategoryToUpdateDataChange}
                                        placeholder='Category Name'
                                        name='name'
                                        value={categoryToUpdate.name}
                                        id="hs-trailing-button-add-on"
                                        className="py-3 px-4 block w-full border-gray shadow-sm rounded-s-lg text-sm focus:outline-none placeholder:text-[0.85rem] font-medium"
                                    />
                                    <button
                                        type="submit"
                                        className="py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-e-md border border-transparent bg-primary bg-opacity-80 hover:bg-hovers text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                                    >
                                        Update
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
};

export default AdminUsers;