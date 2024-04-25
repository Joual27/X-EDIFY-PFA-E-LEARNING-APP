
import { Navigate, Outlet } from "react-router-dom";
import {useUser} from "../../hooks/contexts/UserContext.jsx";

const RoleBasedPrivateRoute = ({ allowedRoles }) => {
    const {user , role} = useUser();

    if (user === null) {
        return <Navigate to="/" replace />;
    }

    if ( !allowedRoles.includes(role) ) {
        if( role === 'instructor'){
            return <Navigate to="/instructor/dashboard" replace />;
        }
        else if( role === 'student'){
            return <Navigate to="/student/dashboard" replace />;
        }
        else if (role === 'admin'){
            return <Navigate to="/admin/dashboard" replace />;
        }
        else{
            return <Navigate to="" replace />;
        }
    }
    return <Outlet />
};

export default RoleBasedPrivateRoute;
