

import profile from '../../assets/profile.png'
import {useUser} from "../../hooks/contexts/UserContext.jsx";

const Message = ({message}) => {
    const {user} = useUser();

    const data = {
        url : message && message.sender ? (message.sender.image !== 'profile.png' ? message.sender.image : profile) : message.image && (message.image !== 'profile.png' ? message.image : profile),
        name : message && message.sender ? (message.sender.id === user.id ? 'me' : message.sender.name) : message.user_id && (message.user_id === user.id ? 'me' : message.name),

    }

    return (
        <div className={`col-start-1 col-end-8 p-3 ${message.sender ? (message.sender.id !== user.id ? 'lg:ml-[130%] ml-[80%]' : '') : message.user_id && (message.user_id !== user.id ? 'lg:ml-[130%] ml-[70%]' : '')} rounded-lg relative z-[0]  w-full`} style={{overflowX:"hidden !important"}}>
            <div className="flex flex-row items-center ">
                <div
                    className="flex items-center justify-center h-20  rounded-full bg-indigo-500 flex-shrink-0 relative gap-[15px]"
                >
                    <img src={data.url} className='w-[40px] h-[40px] rounded-full' alt=""/>
                    <p className='text-main text-[0.8rem] font-medium'>{data.name}</p>
                </div>
                <div
                    className="relative ml-3 text-sm bg-dark bg-opacity-80 py-2 px-4 shadow rounded-xl min-w-[150px] "
                >
                    <div>
                        {message.content}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Message