import Message from "./Message.jsx";
import {useContext, useEffect, useState} from "react";
import {CourseContentContext} from "../../pages/CourseContentPage.jsx";
import {fetchRoomMessages, sendMessage} from "../../data/discussionRoom/messagesData.js";
import Echo from "laravel-echo";
import Pusher from "pusher-js";
import {useUser} from "../../hooks/contexts/UserContext.jsx";

const DiscussionRoom = () => {
    const {user} = useUser();
    const {courseData} = useContext(CourseContentContext);
    const [messages,setMessages] = useState([]);
    const [messageData,setMessageData] = useState({
        sender_id : user.id,
        discussion_room_id : courseData.discussion_room.id,
        content : ''
    });
    const [echoInitialized, setEchoInitialized] = useState(false);
    const handleSendingMessage = async (e)=> {
        e.preventDefault();
        const res = await sendMessage(messageData);
        if(res.data.case === 'error'){
            console.log(res.data.message);
        }
        else if(res.data.case === 'success'){
            document.getElementById('message_content').value = ''
        }
    }


    const handleChange = (e) => {
        setMessageData({
            ...messageData,
            content: e.target.value
        })
    }
    const bringRoomMessages = async () => {
        const res = await fetchRoomMessages(courseData.discussion_room.id);
        if (res.data.case === 'success'){
            setMessages(res.data.messages);
        }
        else {
            console.log(res.data.message)
        }
    }
    useEffect(() => {
        let echo;

        if (!echoInitialized && courseData) {
            echo = new Echo({
                broadcaster: 'pusher',
                key: '5a4f3902a5ed08012519',
                app_id: "1793845",
                secret: "3c96de2ad0a9c753ec2b",
                wsHost: 'ws.pusher.com',
                wsPort: 443,
                disableStats: true,
                logToConsole: true,
                cluster: 'eu'
            });

            echo
                .channel(`discussion.room.${courseData.discussion_room.id}`)
                .subscribed(() => {
                    console.log('You are subscribed');
                })
                .listen('.chat-message', (data) => {
                    console.log('im listening');
                    setMessages((prevMessages) => [...prevMessages, data]);
                });

            setEchoInitialized(true);
        }

        return () => {
            if (echo) {
                echo.leaveChannel(`discussion.room.${courseData.discussion_room.id}`);
            }
        };
    }, [ ]);
    useEffect(() => {
        bringRoomMessages();
    }, []);

    return (

        <div className="flex h-[70vh] antialiased bg-primary rounded-3xl bg-opacity-10 mt-[-3rem] w-full"  style={{overflowX:"hidden !important"}}>

            <div className="flex flex-col flex-auto h-full p-6 w-[70%] mx-auto " style={{overflowX:"hidden !important"}}>
                <div
                    className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4"
                    style={{overflowX:"hidden !important"}}
                >
                    <div className="flex flex-col h-full overflow-x-auto mb-4">
                        <div className="flex flex-col h-full w-full">
                            <div className="grid grid-cols-12 gap-y-2 w-full relative">
                                {
                                    messages && messages.map(message => (
                                        <Message key={message.id} message={message}/>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                    <form method='POST' onSubmit={handleSendingMessage}>
                        <div
                            className="flex flex-row items-center h-16 rounded-xl w-full px-4"
                        >
                            <div className="flex-grow ml-4">
                                <div className="relative w-full">
                                    <input
                                        id='message_content'
                                        onChange={handleChange}
                                        type="text"
                                        className="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
                                    />

                                </div>
                            </div>
                            <div className="ml-4">
                                <button
                                    className="flex items-center justify-center bg-primary font-medium hover:bg-hovers rounded-xl text-white px-4 py-1 flex-shrink-0"
                                >
                                    <span>Send</span>
                                    <span className="ml-2">

                                  <svg
                                      className="w-4 h-4 transform rotate-45 -mt-px"
                                      fill="none"
                                      stroke="currentColor"
                                      viewBox="0 0 24 24"
                                      xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                                    ></path>
                                  </svg>
                                </span>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    )

}


export default DiscussionRoom