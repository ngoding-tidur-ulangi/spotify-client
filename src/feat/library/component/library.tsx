import getUserData from "@/feat/auth/api/getUserData"
import getSongsByArtist from "@/feat/explorer/api/getSongsByArtist"
import { useAppAction } from "@/store/app"
import { useMutation, useQuery } from "@tanstack/react-query"
import { Book, Play, Plus } from "phosphor-react"
import { useState } from "react"

const Library = () => {
    const [isOpen, setIsOpen] = useState(false)
    const { setQueue, setIsQueueOpen, setIndex } = useAppAction()

    const { data: userData } = useQuery({
        queryKey: ["user-data"],
        queryFn: () => getUserData()
    })

    const { mutateAsync: getSongsByArtistMutation } = useMutation({
        mutationFn: getSongsByArtist
    })

    const handlePlayArtist = async (artistId: string) => {
        try {
            const res = await getSongsByArtistMutation(artistId)
            setQueue(res.data)
            setIndex(0)
            setIsQueueOpen(true)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className={`${isOpen ? "md:min-w-[26rem] md:w-full" : "min-w-min"} max-w-[20%] bg-neutral-900 h-full rounded-lg p-1 md:p-2`}>
            <div className="flex justify-between items-center px-2 mb-4 text-neutral-400">
                <button className="flex p-2 hover:text-white cursor-pointer"  onClick={() => setIsOpen(!isOpen)}>
                    <Book weight="bold" size={30} />
                    {
                        isOpen &&
                        <h2 className="ml-2 font-bold text-lg md:block hidden">Your Library</h2>
                    }
                </button>
                {
                    isOpen &&
                    <Plus className="hover:text-white cursor-pointer md:block hidden" weight="bold" size={20} />
                }
            </div>
            <div>
                {
                    userData?.data.favorites.map(artist => 
                        <div className="flex p-2 rounded-lg hover:bg-neutral-800 group cursor-pointer" onClick={() => handlePlayArtist(artist._id)}>
                            <span className="flex items-center justify-center w-12 h-12 rounded-full bg-neutral-300 group-hover:bg-neutral-500 bg-cover" style={{backgroundImage: `url(${import.meta.env.VITE_API_URL}/global/image/${artist.image})`}}>
                                <Play className="hidden group-hover:block" size={20} weight="fill" />
                            </span>
                            {
                                isOpen &&
                                <div className="ml- md:block hidden">
                                    <p>{artist.name}</p>
                                    <p className="text-neutral-400 text-sm">Artist</p>
                                </div>
                            }
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default Library