import Navbar from "../components/home/Navbar.jsx";
import profile from '../assets/teacher.png'
import {useEffect, useState} from "react";
import {useUser} from "../hooks/contexts/UserContext.jsx";
import {updateProfileData} from "../data/course/studentData.js";

const UpdateProfilePage = () => {
    const {user} = useUser();
    const [profileData,setProfileData] = useState({});
    const [errors,setErrors] = useState([]);
    const [incorrectPw,setIncorrectPw] = useState(false);
    const [profileUpdatedSuccess,setProfileUpdatedSuccess] = useState(false);
    const [image,setImage] = useState('');

    const handleDataChange = (e) => {
        setProfileData({
            ...profileData,
            [e.target.name] : e.target.value
        })
    }
    const handlePictureUpload = (e) =>{
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = (event) => {
            const imageData = event.target.result;
            setProfileData({
                ...profileData,
                image: file,
                imageData: imageData
            });
            setImage(imageData);
        };
        if (file) {
            reader.readAsDataURL(file);
        } else {
            setProfileData({
                ...profileData,
                image: null,
                imageData: ''
            });
            setImage('');
        }
    }

    const handleDataUpdate = async (e) => {
        e.preventDefault();
        const res = await updateProfileData(profileData);
        if (res.data.case === 'success'){
            setProfileUpdatedSuccess(true);
            localStorage.setItem('user',JSON.stringify(res.data.user));
        }
        else if(res.data.case === 'incorrect_pw'){
            setIncorrectPw(true);
        }
        else if(res.data.errors){
            setErrors(res.data.errors)
        }
        else{
            console.log(res.data.message);
        }
    }

    useEffect(() => {
        if (errors) {
            const timer = setTimeout(() => {
                setErrors({});
            }, 2500);
            return () => clearTimeout(timer);
        }
    }, [errors]);

    useEffect(() => {
        if (profileUpdatedSuccess) {
            const timer = setTimeout(() => {
                setProfileUpdatedSuccess(false);
            }, 2500);
            return () => clearTimeout(timer);
        }
    }, [profileUpdatedSuccess]);
    useEffect(() => {
        if (incorrectPw) {
            const timer = setTimeout(() => {
                setIncorrectPw(false);
            }, 2500);
            return () => clearTimeout(timer);
        }
    }, [incorrectPw]);
    return(
        <div className='bg-background min-h-[100vh] w-full text-main' style={{zIndex: -10}}>
            <Navbar/>
            <img   src={image || (user.image !== 'profile.png' ? user.image : profile)} className='w-[125px] h-[125px] rounded-full absolute top-[7.5rem] z-10 left-[46.75%] border-2 border-dark object' alt=""/>
            <section className="relative pt-16 bg-blueGray-200 mt-[20rem] w-[50%] mx-auto ">
                <div className="container mx-auto px-4 ">
                    <div
                        className="relative flex flex-col min-w-0 break-words bg-dark w-full mb-6 shadow-xl rounded-lg -mt-64 pb-[4rem]">
                        <div className="px-6">
                            <div className="flex flex-wrap justify-center">
                                <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                                    <div className="relative">
                                        <img alt="..."
                                             className="shadow-xl rounded-full h-auto align-middle border-none absolute m-16 ml-20 lg:ml-16 max-w-150-px z-10"/>
                                    </div>
                                </div>
                            </div>
                            <div className="text-center mt-[4rem]">
                                <h3 className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700 mt-2">
                                    {user.name}
                                </h3>
                                <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                                    <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
                                    {
                                        user.student ? user.student.school : user.instructor.field
                                    }
                                </div>
                                {Object.keys(errors).length > 0 ? (
                                    <div className="bg-secRed text-white text-[0.85rem] font-medium w-[50%] mx-auto py-[0.5rem] rounded-lg px-[5%]">
                                        {Object.entries(errors).map(([field, messages]) => (
                                            messages.map((message, index) => (
                                                <p key={`${field}-${index}`}>{message}</p>
                                            ))
                                        ))}
                                    </div>
                                ) :(
                                    incorrectPw && <div className="bg-secRed text-white text-[0.85rem] font-medium w-[50%] mx-auto py-[0.5rem] rounded-lg px-[5%]">
                                        <p>Incorrect Old password</p>
                                    </div>
                                )
                                }
                                {
                                    profileUpdatedSuccess && <div className="bg-green text-white text-[0.85rem] font-medium w-[50%] mx-auto py-[0.5rem] rounded-lg px-[5%]">
                                        <p>Profile Updated Successfully !</p>
                                    </div>
                                }
                                <div className='w-full text-center text-overlay font-medium text-[0.9rem] mt-[2rem]'>
                                    <p>Update Your Password</p>
                                </div>
                                <form className='w-[50%] mx-auto flex flex-col items-center gap-[1rem] py-[2rem]'
                                      method={'POST'}
                                      encType="multipart/form-data"
                                      onSubmit={handleDataUpdate}>
                                    <input type="password" placeholder='Old Password'
                                           name='old_password'
                                           onChange={handleDataChange}
                                           className='bg-slate w-full bg-opacity-40 text-[0.9rem] px-[1rem] py-[0.5rem] rounded-xl text-main focus:outline-none w-[70%]'
                                    /> <input type="password" placeholder='New Password'
                                              name='new_password'
                                              onChange={handleDataChange}
                                              className='bg-slate w-full bg-opacity-40 text-[0.9rem] px-[1rem] py-[0.5rem] rounded-xl text-main focus:outline-none w-[70%]'
                                /> <input type="password" placeholder='Confirm New Password'
                                          name='confirm_password'
                                          onChange={handleDataChange}
                                          className='bg-slate w-full bg-opacity-40 text-[0.9rem] px-[1rem] py-[0.5rem] rounded-xl text-main focus:outline-none w-[70%]'
                                />
                                    <div
                                        className='w-full text-center flex mt-[1rem] flex-col gap-[2rem] text-overlay font-medium text-[0.9rem]'>
                                        <p>Or Change Your Profile Picture</p>
                                        <label className="block">
                                            <input type="file" name='image'
                                                   onChange={handlePictureUpload}
                                                   className="block w-full text-sm text-slate-500 ml-[6.5rem]
                                            file:mr-4 file:py-2 file:px-4
                                            file:rounded-full file:border-0
                                            file:text-sm file:font-semibold
                                            file:bg-violet-50 file:text-violet-700
                                            hover:file:bg-violet-100
                                          "/>
                                        </label>
                                    </div>
                                    <div className='w-[25%] mx-auto flex justify-end pt-[1rem]'>
                                        <button
                                            className="bg-primary uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                                            type="submit">
                                            Update
                                        </button>
                                    </div>
                                </form>
                            </div>

                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default UpdateProfilePage