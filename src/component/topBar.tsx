import { House, MagnifyingGlass, SpotifyLogo } from "phosphor-react"
import DropDown from "./dropdown"
import { useCallback, useEffect, useState } from "react"
import logout from "@/feat/auth/api/logout"
import { useNavigate } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import getUserData from "@/feat/auth/api/getUserData"
import { useAppAction, useAppStore } from "@/store/app"
import lodash from "lodash"

const TopBar = () => {
    const [focus, setFocus] = useState(false)
    const navigate = useNavigate()
    const { artist, search } = useAppStore(state => state)
    const { setArtist, setSearch } = useAppAction()

    const { data: userData, error } = useQuery({
        queryKey: ["user-data"],
        queryFn: () => getUserData(),
        retry: 0
    })

    const debouncedSetSearch = useCallback(
        lodash.debounce((query: string) => setSearch(query), 500),
        [],
      )

    useEffect(() => {
        if ((error as any)?.status == 401 || (error as any)?.status == 403) {
            navigate("/login")
        }
    }, [error])

    return (
        <div className="w-full flex justify-between items-center p-4">
            <SpotifyLogo className="rotate-12 mb-2 hidden md:block" size={46} weight="fill" />
            <div className="flex text-neutral-400">
                <span className="w-10 h-10 md:w-12 md:h-12 bg-neutral-800 flex items-center justify-center rounded-full hover:scale-110 cursor-pointer" onClick={() => {
                    setArtist(undefined)
                    setSearch("")
                }}>
                    {
                        (artist || search != "") ?
                            <House className="scale-75 md:scale-100" size={30}/>
                            :
                            <House className="scale-75 md:scale-100 text-white" size={30} weight="fill"/>
                    }
                </span>
                <div className={`flex items-center ml-2 bg-neutral-800 rounded-3xl px-4 ${focus && "border-2 border-white"}`}>
                    <MagnifyingGlass className={`${focus && "text-white"} scale-75 md:scale-100`} size={30}/>
                    <input className="ml-3 w-52 md:w-60 outline-none bg-transparent text-white" type="text" onFocus={() =>setFocus(true)} onBlur={() => setFocus(false)} onChange={(e) => debouncedSetSearch(e.target.value)} placeholder="What do you want to play?"/>
                </div>
            </div>
            <DropDown
                className="w-48"
                trigger={
                    <span className="w-10 h-10 md:w-12 md:h-12 box-border flex justify-center items-center bg-red-300 border-8 border-neutral-500 rounded-full hover:scale-110 cursor-pointer">
                        {userData?.data.displayName[0].toUpperCase()}
                    </span>
                }
                options={[
                    <button className="w-full p-2 hover:bg-neutral-600 text-start" onClick={async () => {
                        try {
                            await logout()
                            navigate("/login")
                        } catch(e){
                            console.log(e)
                        }
                    }}>
                        Logout
                    </button>
                ]}
            />
        </div>
    )
}

export default TopBar