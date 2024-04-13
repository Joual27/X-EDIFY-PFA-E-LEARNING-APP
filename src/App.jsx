import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import AllCourses from './pages/AllCourses.jsx';
import SpecificCoursePage from "./pages/SpecificCoursePage.jsx";
import InstructorDashboard from "./pages/InstructorDashboard.jsx";
import PublicOrStudentRoute from "./components/hoc/PublicOrStudentRoute.jsx";
import {UserProvider} from "./hooks/contexts/UserContext.jsx";
import RoleBasedPrivateRoute from "./components/hoc/RoleBasedPrivateRoute.jsx";

function App() {
    return (
        <UserProvider>
            <div className='app'>
                <Router>
                    <Routes>
                        <Route path='/' element={<Home/>}/>
                        <Route path='/instructor/dashboard' element={<RoleBasedPrivateRoute allowedRole='instructor'/>}>
                            <Route index element={<InstructorDashboard/>}/>
                        </Route>
                        <Route path='/courses/all' element={<PublicOrStudentRoute/>}>
                            <Route index element={<AllCourses/>}/>
                        </Route>
                        <Route path='/course' element={<PublicOrStudentRoute/>}>
                            <Route index element={<SpecificCoursePage/>}/>
                        </Route>
                    </Routes>
                </Router>
            </div>
        </UserProvider>
    );
}

export default App;