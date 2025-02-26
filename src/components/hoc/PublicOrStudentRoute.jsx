
import { Navigate, Outlet } from "react-router-dom";
import {useUser} from "../../hooks/contexts/UserContext.jsx";


const PublicOrStudentRoute = () => {
    const { role } = useUser();
    if (role === 'instructor') {
        return <Navigate to="/instructor/dashboard" replace />;
    }
    else if (role === 'admin'){
        return <Navigate to="/admin/dashboard" replace />;
    }
    return <Outlet />;
};

export default PublicOrStudentRoute;