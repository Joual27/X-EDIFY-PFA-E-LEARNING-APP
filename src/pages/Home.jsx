
import Navbar from "../components/Navbar.jsx";
import Hero from "../components/Hero.jsx";
import Stats from "../components/Stats.jsx";
import Footer from "../components/Footer.jsx";
import Categories from "../components/Categories.jsx";
import HomeCourses from "../components/Home-courses.jsx";
import About from "../components/About.jsx";
import Partners from "../components/Partners.jsx";
import Auth from "../components/Auth.jsx";
import {useState} from "react";

export default function Home(){

    const [priorityPage,setPriorityPage] = useState('');
    const [showAuth,setShowAuth] = useState(false);

    function showLogin(){
        setPriorityPage('login');
        setShowAuth(true);
    }
    function showRegister(){
        setPriorityPage('register');
        setShowAuth(true);
    }
    function hideAuth(){
        setShowAuth(false);
    }


    return (
        <>
            <div className='bg-background min-h-[100vh] w-full text-main' style={{zIndex : -10}} >
                <Navbar onLoginBtnClick={showLogin}/>
                <Hero onRegisterBtnClick={showRegister}/>
                <Stats/>
                <Categories/>
                <HomeCourses/>
                <About/>
                <Partners/>
                <Footer/>
            </div>
            <div className={`fixed inset-0 w-full h-[100vh] bg-overlay bg-opacity-60 flex items-center justify-center  ${(!showAuth)?'hidden':''}`} >
                <Auth shownComponent={priorityPage} onLoginBtnClick={showLogin} onRegisterBtnClick={showRegister}/>
                <div onClick={hideAuth} className='absolute inset-0 w-full h-full'></div>
            </div>
        </>

    )
}