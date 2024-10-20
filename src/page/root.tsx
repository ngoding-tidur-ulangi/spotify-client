import TopBar from "@/component/topBar"
import ArtistProfile from "@/feat/artist/component/artistProfile"
import Explorer from "@/feat/explorer/component/explorer"
import Library from "@/feat/library/component/library"
import Player from "@/feat/player/component/player"
import Queue from "@/feat/queue/component/queue"
import Search from "@/feat/search/component/search"
import { useAppStore } from "@/store/app"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const Root = () => {
    const navigate = useNavigate()
    const { isQueueOpen, queue, artist, search } = useAppStore((state) => state)

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');

        if (token) {
            localStorage.setItem('token', token);
            navigate('/');
        }
    }, [navigate])

    return (
        <div className="w-screen h-screen box-border bg-black text-white flex flex-col justify-between">
            <TopBar/>
            <div className={`flex justify-between px-2 gap-2 ${ queue.length > 0 ? "max-h-[80%]" : "max-h-[90%]"}`}>
                <Library/>
                {
                    artist ? 
                        <ArtistProfile/>
                        :
                        search != "" ?
                            <Search/>
                            :
                            <Explorer/>
                }
                {
                    isQueueOpen &&
                        <Queue/>
                }
            </div>
            {
                queue.length > 0 &&
                    <Player/>
            }
        </div>
    )
}

export default Root