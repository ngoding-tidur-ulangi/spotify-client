import { useAppAction, useAppStore } from "@/store/app"
import { useMutation } from "@tanstack/react-query"
import { Pause, Play, Queue, SkipBack, SkipForward, SpeakerHigh } from "phosphor-react"
import { useEffect, useRef, useState } from "react"
import getRelatedSongsFromQueue from "../api/getRelatedSongsFromQueue"
import updateHistory from "../api/updateHistory"

const Player = () => {
    const { isQueueOpen, queue, index } = useAppStore(state => state)
    const { setIsQueueOpen, setIndex, setQueue } = useAppAction()
    const [isPlaying, setIsPlaying] = useState(false)
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0)
    const [volume, setVolume] = useState(100)
    const audioRef = useRef(null);

    const togglePlayPause = () => {
        if (isPlaying) {
            (audioRef.current as any).pause();
        } else {
            (audioRef.current as any).play();
        }
        setIsPlaying(!isPlaying);
    }


    const handleTimeUpdate = () => {
        setCurrentTime((audioRef.current as any).currentTime);
    };

    const handleLoadedMetadata = () => {
        setDuration((audioRef.current as any).duration);
    };

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    useEffect(() => {
        const audio = audioRef.current;
        if(audio){
            (audio as any).addEventListener('timeupdate', handleTimeUpdate);
            (audio as any).addEventListener('loadedmetadata', handleLoadedMetadata);
    
            return () => {
                (audio as any).removeEventListener('timeupdate', handleTimeUpdate);
                (audio as any).removeEventListener('loadedmetadata', handleLoadedMetadata);
            };
        }
    }, [])

    useEffect(() => {
        (audioRef.current as any).play()
        setIsPlaying(true)
    }, [queue, index])

    const { mutateAsync: getRelatedSongsFromQueueMutation } = useMutation({
        mutationFn: getRelatedSongsFromQueue
    })

    const { mutateAsync: updateHistoryMutation } = useMutation({
        mutationFn: updateHistory
    })

    return (
        <div className="w-full p-2 flex justify-between items-center">
            <div className="flex gap-2 items-center">
                <span className="block w-14 h-14 bg-neutral-400 rounded-md bg-cover" style={{ backgroundImage: `url(${import.meta.env.VITE_API_URL}/global/image/${queue[index].image})`}}></span>
                <div className="max-w-40">
                    <p className="font-bold text-sm truncate ...">{queue[index].title}</p>
                    <p className="text-neutral-400 text-xs truncate ...">{queue[index].artists.map((artist, i) => i == 0 ? artist.name : `, ${artist.name}`)}</p>
                </div>
            </div>
            <div className="flex flex-col items-center">
                <div className="flex items-center gap-4">
                    <button className="disabled:cursor-default cursor-pointer text-neutral-400 disabled:hover:text-neutral-400 hover:text-white" disabled={index == 0} onClick={() => setIndex(index-1)}>
                        <SkipBack size={24} weight="fill"/>
                    </button>
                    <span className="p-2 rounded-full bg-white hover:scale-110 cursor-pointer" onClick={() => togglePlayPause()}>
                        {
                            isPlaying ?
                                <Pause className="text-black" size={20} weight="fill"/>
                                :
                                <Play className="text-black" size={20} weight="fill" />
                        }
                    </span>
                    <button>
                        <SkipForward className="text-neutral-400 hover:text-white cursor-pointer" size={24} weight="fill" onClick={() => setIndex(index+1)}/>
                    </button>
                </div>
                <div className="md:flex hidden text-xs text-neutral-400 items-center gap-2">
                    <span>{formatTime(currentTime)}</span>
                    <div className="w-[32rem] h-1 rounded-md bg-neutral-600">
                        <div className="h-1 rounded-md bg-neutral-100" style={{width: `${currentTime/duration*100}%`}}>
                        </div>
                    </div>
                    <span>{formatTime(duration)}</span>
                </div>
                <audio ref={audioRef} src={`${import.meta.env.VITE_API_URL}/global/audio/${queue[index].audio}`} 
                    onEnded={() => {
                        setIndex(index+1)
                    }}
                    onPlay={async () => {
                        if(index == queue.length - 1){
                            try {
                                const res = await getRelatedSongsFromQueueMutation(queue)
                                setQueue([...queue, ...res.data])
                            } catch (error) {
                                console.log(error)
                            }
                        }
                        await updateHistoryMutation(queue[index]._id)
                    }}
                />
            </div>
            <div className="md:flex items-center gap-3 hidden">
                <Queue className={`${isQueueOpen ? "text-green-500" : "text-neutral-400"} hover:scale-110 cursor-pointer`} size={22} weight="fill" onClick={() => setIsQueueOpen(!isQueueOpen)} />
                <div className="flex items-center gap-1 group">
                    <SpeakerHigh className="text-neutral-400 group-hover:text-white cursor-pointer" size={20} weight="fill" />
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={volume}
                        onChange={(e) => {
                            setVolume(Number(e.target.value));
                            (audioRef.current as any).volume = volume/100
                        }}
                        className="
                            w-32 h-1 bg-neutral-500 
                            rounded-lg appearance-none 
                            cursor-pointer focus:outline-none
                        "
                        style={{
                            background: `linear-gradient(to right, white ${volume}%, gray ${volume}%)`,
                          }}
                    />
                </div>
            </div>
        </div>
    )
}

export default Player