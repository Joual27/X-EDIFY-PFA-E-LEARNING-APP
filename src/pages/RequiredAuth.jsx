import Auth from "../components/home/Auth.jsx";
import MandatoryAuth from "../components/auth/MandatoryAuth.jsx";


const RequiredAuth = () => {
    return (
        <div className='absolute w-full h-[100vh] inset-0 bg-background flex items-center justify-center'>
            <MandatoryAuth/>
        </div>
    )
}
export default RequiredAuth