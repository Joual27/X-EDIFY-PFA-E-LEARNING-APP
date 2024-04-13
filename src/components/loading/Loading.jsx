import loading from '../../assets/loading.gif'
const Loading = () => {
    return(
        <div className='w-full h-[100vh] bg-primary bg-opacity-10 relative z-[-1] flex items-center justify-center'>
            <img src={loading} className='w-[100px] h-[100px]' alt="loading gif"/>
        </div>
    )
}
export default Loading