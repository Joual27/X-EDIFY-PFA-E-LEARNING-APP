import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import AllCourses from './pages/AllCourses.jsx';
import SpecificCoursePage from "./pages/SpecificCoursePage.jsx";
import InstructorDashboard from "./pages/InstructorDashboard.jsx";
import PublicOrStudentRoute from "./components/hoc/PublicOrStudentRoute.jsx";
import {UserProvider} from "./hooks/contexts/UserContext.jsx";
import RoleBasedPrivateRoute from "./components/hoc/RoleBasedPrivateRoute.jsx";
import RequiredAuth from "./pages/RequiredAuth.jsx";
import StudentDashboard from "./pages/StudentDashboard.jsx";
import CourseContentPage from "./pages/CourseContentPage.jsx";
import UpdateProfilePage from "./pages/UpdateProfilePage.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";

function App() {
    return (
        <UserProvider>
            <div className='app'>
                <Router>
                    <Routes>
                        <Route path='/' element={<Home/>}/>
                        <Route path='/auth/required' element={<RequiredAuth/>}/>
                        <Route path='/course/content/:id' element={<CourseContentPage/>}/>
                        <Route path='/user/profile/update' element={<RoleBasedPrivateRoute allowedRoles={['instructor','student']}/>}>
                            <Route index element={<UpdateProfilePage/>}/>
                        </Route>
                        <Route path='/admin/dashboard' element={<RoleBasedPrivateRoute allowedRoles={['admin']}/>}>
                            <Route index element={<AdminDashboard/>}/>
                        </Route>
                        <Route path='/student/dashboard' element={<RoleBasedPrivateRoute allowedRoles={['student']}/>}>
                            <Route index element={<StudentDashboard/>}/>
                        </Route>
                        <Route path='/instructor/dashboard' element={<RoleBasedPrivateRoute allowedRoles={['instructor']}/>}>
                            <Route index element={<InstructorDashboard/>}/>
                        </Route>
                        <Route path='/courses/all' element={<PublicOrStudentRoute/>}>
                            <Route index element={<AllCourses/>}/>
                        </Route>
                        <Route path='/course/:id' element={<PublicOrStudentRoute/>}>
                            <Route index element={<SpecificCoursePage/>}/>
                        </Route>
                    </Routes>
                </Router>
            </div>
        </UserProvider>
    );
}

export default App;