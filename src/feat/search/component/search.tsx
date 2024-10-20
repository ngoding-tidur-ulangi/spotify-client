import { useAppAction, useAppStore } from "@/store/app"
import { useQuery } from "@tanstack/react-query"
import { Play } from "phosphor-react"
import getSongsByTitle from "../api/getSongsByTitle"

const Search = () => {
    const { setQueue, setIndex, setIsQueueOpen } = useAppAction()
    const { search } = useAppStore(state => state)

    const { data: songs } = useQuery({
        queryKey: ["get-songs", search],
        queryFn: () => getSongsByTitle(search)
    })

    return (
        <div className="w-full min-w-48 h-full p-4 py-16 pb-[32rem] rounded-lg bg-gradient-to-b from-neutral-600 via-neutral-900 via-40% to-neutral-900 flex flex-col gap-8 overflow-y-scroll">
            <div>
                <h2 className="text-2xl font-bold">Songs</h2>
                <div className="h-72 overflow-y-hidden flex justify-start flex-wrap gap-y-5">
                    {
                        songs?.data.map(song => {
                            const imageUrl = `${import.meta.env.VITE_API_URL}/global/image/${song.image}`
                            return (
                                <div className="p-2 rounded-md hover:bg-neutral-800 cursor-pointer group max-w-52">
                                    <span className="block relative w-48 h-48 rounded-md bg-neutral-500 bg-cover" style={{ backgroundImage: `url(${imageUrl})` }}>
                                        <Play weight="fill" size={80} className="group-hover:flex absolute hidden text-white left-[25%] top-[25%] hover:scale-110" onClick={() => {
                                            setQueue([song])
                                            setIndex(0)
                                            setIsQueueOpen(true)
                                        }} />
                                    </span>
                                    <p className="px-1 mt-2 font-bold text-lg truncate ...">{song.title}</p>
                                    <p className="px-1 text-neutral-400 truncate ...">{song.artists.map((artist, i) => i == 0 ? artist.name : `, ${artist.name}`)}</p>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Search