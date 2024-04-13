import Navbar from "../components/home/Navbar.jsx";
import Filters from "../components/courses/Filters.jsx";
import Courses from "../components/courses/Courses.jsx";


const AllCourses = () => {
    return(
        <div className='bg-background min-h-[100vh] w-full text-main' style={{zIndex : -10}} >
            <Navbar/>
            <Filters/>
            <Courses/>
        </div>
    )
}
export default AllCourses