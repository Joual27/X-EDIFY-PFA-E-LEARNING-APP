import {useContext, useEffect , useState} from "react";
import {CourseContentContext} from "../../pages/CourseContentPage.jsx";
import Loading from "../loading/Loading.jsx";


const CourseVideo = ({url}) => {

    const {isLoading,setShownNextButton,currentTopicIndex} = useContext(CourseContentContext)
    const [videoLoaded, setVideoLoaded] = useState(false);
    const [videoEnded, setVideoEnded] = useState(false);


    useEffect(() => {
        const video = document.querySelector("video");

        const handleLoadedMetadata = () => {
            setVideoLoaded(true);
        };

        const handleTimeUpdate = () => {
            if (videoLoaded && video.currentTime >= video.duration - 5) {
                setVideoEnded(true);
            }
        };

        const handleVideoEnded = () => {
            setVideoEnded(true);
        };

        video.addEventListener("loadedmetadata", handleLoadedMetadata);
        video.addEventListener("timeupdate", handleTimeUpdate);
        video.addEventListener("ended", handleVideoEnded);

        return () => {
            video.removeEventListener("loadedmetadata", handleLoadedMetadata);
            video.removeEventListener("timeupdate", handleTimeUpdate);
            video.removeEventListener("ended", handleVideoEnded);
        };
    }, [url,currentTopicIndex,videoLoaded,setShownNextButton]);


    useEffect(() => {
        if (videoEnded) {
            const timeoutId = setTimeout(() => {
                setShownNextButton(true);
            }, 3000);
            return () => clearTimeout(timeoutId);
        }
    }, [videoEnded, setShownNextButton]);

    useEffect(() => {
        setVideoEnded(false);
        setVideoLoaded(false);
    }, [currentTopicIndex,url]);

    return(
            <div className='w-[75%] h-[60vh] rounded-lg' key={currentTopicIndex}>
                <video className="h-full w-full rounded-lg object-cover" controls>
                    <source
                        src={url}
                        type="video/mp4"
                    />
                    Your browser does not support the video tag.
                </video>
            </div>
    )
}


export default CourseVideo