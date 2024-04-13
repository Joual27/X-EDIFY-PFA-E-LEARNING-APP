
import { Navigate, Outlet } from "react-router-dom";
import {useUser} from "../../hooks/contexts/UserContext.jsx";

const RoleBasedPrivateRoute = ({ allowedRole }) => {
    const {user , role} = useUser();

    if (user === null) {
        return <Navigate to="/" replace />;
    }

    if ( allowedRole !== role ) {
        if( role === 'instructor'){
            return <Navigate to="/instructor/dashboard" replace />;
        }
        else if( role === 'student' || role === null ){
            return <Navigate to="/" replace />;
        }
    }
    return <Outlet />
};

export default RoleBasedPrivateRoute;
