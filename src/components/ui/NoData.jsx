
import noData from '../../assets/noData.png'

const NoData = () => {
    return (
        <div className=' h-[200px] w-full flex items-center justify-center'>
            <div className='flex flex-col items-center gap-[1rem]'>
                <img src={noData} className='w-[120px] h-[120px]' alt=""/>
                <p className='text-[0.85rem] text-gray font-medium underline'> NO AVAILABLE DATA ! </p>
            </div>
        </div>
    )
}
export default NoData