import Echo from "laravel-echo";

const getDiscussionRoomAccessToken = (token) => {
    const options = {
        broadcaster: 'pusher',
        key: 'app-key',
        wsHost: 'localhost',
        wsPort: '6001',
        wssPort: '6001',
        forceTLS: false,
        encrypted: true,
        disableStats: true,
        enabledTransports: ['ws', 'wss'],
        cluster: 'mt1'
    }
    try{
        return new Echo(options)
    }
    catch(error) {
        console.log('Error', error)
        throw error
    }
}

export default getDiscussionRoomAccessToken