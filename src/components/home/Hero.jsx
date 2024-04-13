import heroPic from '../../assets/Learning-cuate.svg'
import PropTypes from "prop-types";


export default function Hero({onRegisterBtnClick}){

    return(
        <div className='h-[65vh] lg:h-[70vh] lg:my-[2rem] lg:flex lg:items-center lg:w-[65%] lg:justify-between lg:mx-auto'>
            <div className='flex flex-col w-[90%] mx-auto  gap-[1rem] justify-center h-full lg:flex lg:py-0 lg:flex-col lg:w-[50%] lg:items-start lg:gap-[1.5rem]'>
                <h1 className='text-3xl font-medium uppercase lg:text-5xl lg:font-bold'>Looking for quality courses?</h1>
                <h3 className='text-xl font-medium lg:text-2xl lg:font-medium'>This is what we offer here at :<span
                    className='font-bold text-primary'> X-EDIFY</span></h3>
                <button
                    className='py-[0.5rem] mt-[0.75rem] font-medium rounded-lg bg-primary hover:bg-hovers w-[40%] lg:w-[20%]'
                    style={{color: "white "}} onClick={onRegisterBtnClick}    >Get Started
                </button>
            </div>
            <div className=''>
                <img src={heroPic} className='hidden lg:w-[500px] lg:block lg:h-[500px]' alt="hero section image"/>
            </div>
        </div>
    )
}

Hero.propTypes = {
    onRegisterBtnClick: PropTypes.func.isRequired,
};