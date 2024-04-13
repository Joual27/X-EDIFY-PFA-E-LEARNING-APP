
import Navbar from "../components/home/Navbar.jsx";
import Hero from "../components/home/Hero.jsx";
import Stats from "../components/home/Stats.jsx";
import Footer from "../components/home/Footer.jsx";
import Categories from "../components/home/Categories.jsx";
import HomeCourses from "../components/home/Home-courses.jsx";
import About from "../components/home/About.jsx";
import Partners from "../components/home/Partners.jsx";
import Auth from "../components/home/Auth.jsx";
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