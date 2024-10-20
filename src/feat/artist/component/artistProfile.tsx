import getUserData from "@/feat/auth/api/getUserData"
import getSongsByArtist from "@/feat/explorer/api/getSongsByArtist"
import { useAppAction, useAppStore } from "@/store/app"
import { useMutation, useQuery } from "@tanstack/react-query"
import { Heart, Play } from "phosphor-react"
import updateFavorite from "../api/updateFavorite"

const ArtistProfile = () => {
    const { setQueue, setIndex, setIsQueueOpen } = useAppAction()
    const { artist } = useAppStore(state => state)

    const { data: songs, isSuccess } = useQuery({
        queryKey: ["get-songs", artist?._id],
        queryFn: () => getSongsByArtist(artist?._id || "")
    })

    const { data: userData, refetch } = useQuery({
        queryKey: ["user-data"],
        queryFn: () => getUserData()
    })

    const { mutateAsync: updateFavoriteMutation } = useMutation({
        mutationFn: updateFavorite
    })

    return (
        <div className="w-full min-w-48 h-full rounded-lg bg-gradient-to-b from-neutral-600 via-neutral-900 via-40% to-neutral-900 flex flex-col gap-8 overflow-y-scroll">
            <div className="w-full h-96 bg-cover bg-slate-50 flex items-end p-8" style={{backgroundImage: `url(${import.meta.env.VITE_API_URL}/global/image/${artist?.image})`}}>
                <h2 className="text-white font-black text-6xl">{artist?.name}</h2>
            </div>
            {
                isSuccess &&
                <div className="flex gap-4 items-center pl-6">
                    <button className="w-16 h-16 rounded-full flex justify-center items-center bg-green-500 right-2 hover:scale-110" onClick={() => {
                        setQueue(songs.data)
                        setIndex(0)
                        setIsQueueOpen(true)
                    }}>
                        <Play weight="fill" size={32} className="text-black" />
                    </button>
                    {
                        userData && artist && (
                            userData.data.favorites.map(fav => fav._id).includes(artist._id) ?
                                <Heart size={32} weight="fill" className="cursor-pointer hover:opacity-70 text-red-600" onClick={async () => {
                                        try {
                                            await updateFavoriteMutation(
                                                userData.data.favorites
                                                    .map(fav => fav._id)
                                                    .filter(fav => fav != artist?._id)
                                                )
                                                refetch()
                                        } catch (error) {
                                            console.log(error)
                                        }
                                    }
                                }/>
                                :
                                <Heart size={32} weight="regular" className="cursor-pointer hover:opacity-70" onClick={async () => {
                                    try {
                                        await updateFavoriteMutation([...userData.data.favorites.map(fav => fav._id), artist._id])
                                        refetch()
                                    } catch (error) {
                                        console.log(error)
                                    }
                                }
                            }/>
                        )
                    }
                </div>
            }
            {
                isSuccess &&
                <div className="mb-32">
                    <h2 className="text-lg font-bold mb-2 mt-8 ml-2">Songs</h2>
                    {
                        songs.data.map((song, i) => {
                            const imageUrl = `${import.meta.env.VITE_API_URL}/global/image/${song.image}`
                            return (
                                <div className="flex p-2 rounded-lg hover:bg-neutral-800 group cursor-pointer" onClick={() => {
                                    setQueue(songs.data)
                                    setIndex(i)
                                }}>
                                    <span className="flex items-center justify-center w-12 h-12 rounded-md bg-neutral-300 group-hover:bg-neutral-500 bg-cover" style={{ backgroundImage: `url(${imageUrl})` }}>
                                        <Play className="hidden group-hover:block" size={20} weight="fill" />
                                    </span>
                                    <div className="ml-2 max-w-72">
                                        <p className="truncate ...">{song.title}</p>
                                        <p className="text-neutral-400 text-sm truncate ...">{song.artists.map((artist, i) => i == 0 ? artist.name : `, ${artist.name}`)}</p>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            }
        </div>
    )
}

export default ArtistProfile