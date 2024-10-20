import { useMutation, useQuery } from "@tanstack/react-query"
import { Play } from "phosphor-react"
import getSongs from "../api/getSongs"
import getArtists from "../api/getArtists"
import getSongsByArtist from "../api/getSongsByArtist"
import { useAppAction } from "@/store/app"
import getRelatedSongs from "../api/getRelatedSongs"
import getUserData from "@/feat/auth/api/getUserData"

const Explorer = () => {
    const { setQueue, setIsQueueOpen, setIndex, setArtist } = useAppAction()

    const { data: songs } = useQuery({
        queryKey: ["get-songs"],
        queryFn: () => getSongs(),
        refetchOnWindowFocus: false
    })

    const { mutateAsync: getSongsByArtistMutation } = useMutation({
        mutationFn: getSongsByArtist
    })

    const { data: artists } = useQuery({
        queryKey: ["get-artists"],
        queryFn: () => getArtists(),
        retry: 0,
        refetchOnWindowFocus: false
    })

    const { data: recommendations } = useQuery({
        queryKey: ["recommendations"],
        queryFn: () => getRelatedSongs(),
        retry: 0,
        refetchOnWindowFocus: false
    })

    const { data: userData } = useQuery({
        queryKey: ["user-data"],
        queryFn: () => getUserData()
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
        <div className="w-full min-w-48 h-full rounded-lg p-4 py-16 bg-gradient-to-b from-neutral-600 via-neutral-900 via-40% to-neutral-900 flex flex-col gap-12 overflow-y-scroll">
            <div className="flex flex-wrap gap-2">
                {
                    userData?.data.histories.map(song =>
                        <div className="flex items-center rounded-md group overflow-hidden grow bg-[rgba(200,200,200,0.2)] hover:bg-[rgba(200,200,200,0.4)] min-w-32 md:min-w-80 relative cursor-pointer">
                            <span className="flex items-center justify-center w-10 h-10 md:w-16 md:h-16 bg-neutral-300 bg-cover" style={{ backgroundImage: `url(${import.meta.env.VITE_API_URL}/global/image/${song.image})` }}></span>
                            <p className="font-bold text-md md:text-lg ml-2 truncate ...">{song.title}</p>
                            <button className="w-10 h-10 rounded-full group-hover:flex justify-center items-center absolute bg-green-500 right-2 hidden hover:scale-110" onClick={() => {
                                setQueue([song])
                                setIndex(0)
                                setIsQueueOpen(true)
                            }}>
                                <Play weight="fill" className="text-black" />
                            </button>
                        </div>
                    )
                }
            </div>
            {
                recommendations && recommendations.data.length > 0 &&
                <div>
                    <h2 className="text-2xl font-bold">For You</h2>
                    <div className="h-[26rem] md:h-72 overflow-y-hidden flex justify-between flex-wrap gap-y-5">
                        {
                            recommendations?.data.map(song => {
                                const imageUrl = `${import.meta.env.VITE_API_URL}/global/image/${song.image}`
                                return (
                                    <div className="p-2 rounded-md hover:bg-neutral-800 cursor-pointer group max-w-36 md:max-w-52">
                                        <span className="block relative w-32 h-32 md:w-48 md:h-48 rounded-md bg-neutral-500 bg-cover" style={{ backgroundImage: `url(${imageUrl})` }}>
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
            }
            <div>
                <h2 className="text-2xl font-bold">Songs</h2>
                <div className="h-[26rem] md:h-72 overflow-y-hidden flex justify-between flex-wrap gap-y-5">
                    {
                        songs?.data.map(song => {
                            const imageUrl = `${import.meta.env.VITE_API_URL}/global/image/${song.image}`
                            return (
                                <div className="p-2 rounded-md hover:bg-neutral-800 cursor-pointer group max-w-36 md:max-w-52">
                                    <span className="block relative w-32 h-32 md:w-48 md:h-48 rounded-md bg-neutral-500 bg-cover" style={{ backgroundImage: `url(${imageUrl})` }}>
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
            <div>
                <h2 className="text-2xl font-bold">Artists</h2>
                <div className="h-[24rem] md:h-64 overflow-y-hidden flex justify-between flex-wrap gap-y-5">
                    {
                        artists?.data.map(artist => {
                            const imageUrl = `${import.meta.env.VITE_API_URL}/global/image/${artist.image}`
                            return (
                                <div className="p-2 rounded-md hover:bg-neutral-800 cursor-pointer group max-w-36 md:max-w-52">
                                    <span className="block relative w-32 h-32 md:w-48 md:h-48 rounded-full bg-neutral-500 bg-cover" style={{ backgroundImage: `url(${imageUrl})` }}>
                                        <button className="w-10 h-10 rounded-full group-hover:flex justify-center items-center absolute bg-green-500 right-2 bottom-2 hidden hover:scale-110" onClick={() => handlePlayArtist(artist._id)}>
                                            <Play weight="fill" className="text-black" />
                                        </button>
                                    </span>
                                    <p className="px-1 mt-2 font-bold text-lg truncate ... hover:underline" onClick={() => setArtist(artist)}>{artist.name}</p>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Explorer