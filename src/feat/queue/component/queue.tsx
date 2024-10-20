import { useAppAction, useAppStore } from "@/store/app"
import { Play, X } from "phosphor-react"

const Queue = () => {   
    const { setIsQueueOpen, setIndex } = useAppAction()
    const { isQueueOpen, queue, index } = useAppStore((state) => state)

    return (
        <div className="min-w-[26rem] w-full max-w-[20%] bg-neutral-900 h-full rounded-lg p-2 md:block hidden">
            <div className="w-full flex justify-end">
                <X className="text-neutral-400 hover:text-white cursor-pointer" weight="bold" size={20} onClick={() => setIsQueueOpen(!isQueueOpen)}/>
            </div>
            <h2 className="font-bold mb-2 mt-8 ml-2">Now Playing</h2>
            <div className="flex p-2 rounded-lg hover:bg-neutral-800 group cursor-pointer items-center">
                <span className="block w-14 h-14 bg-neutral-400 rounded-md bg-cover" style={{ backgroundImage: `url(${import.meta.env.VITE_API_URL}/global/image/${queue[index].image})`}}></span>
                <div className="max-w-72 ml-2">
                    <p className="truncate ...">{queue[index].title}</p>
                    <p className="text-neutral-400 text-sm truncate ...">{queue[index].artists.map((artist, i) => i == 0 ? artist.name : `, ${artist.name}`)}</p>
                </div>
            </div>
            <h2 className="font-bold mb-2 mt-8 ml-2">Next</h2>
            {
                queue.map((song, i) => {
                    if(i>index){
                        const imageUrl = `${import.meta.env.VITE_API_URL}/global/image/${song.image}`
                        return (
                            <div className="flex p-2 rounded-lg hover:bg-neutral-800 group cursor-pointer" onClick={() => setIndex(i)}>
                                <span className="flex items-center justify-center w-12 h-12 rounded-md bg-neutral-300 group-hover:bg-neutral-500 bg-cover" style={{ backgroundImage: `url(${imageUrl})`}}>
                                    <Play className="hidden group-hover:block" size={20} weight="fill" />
                                </span>
                                <div className="ml-2 max-w-72">
                                    <p className="truncate ...">{song.title}</p>
                                    <p className="text-neutral-400 text-sm truncate ...">{song.artists.map((artist, i) => i == 0 ? artist.name : `, ${artist.name}`)}</p>
                                </div>
                            </div>
                        )
                    }
                })
            }
        </div>
    )
}

export default Queue