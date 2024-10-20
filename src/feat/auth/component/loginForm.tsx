import { GoogleLogo, SpotifyLogo } from "phosphor-react"

const LoginForm = () => {
    const login = () => {
        window.open(`${import.meta.env.VITE_API_URL}/auth/google/callback`, "_self")
    }

    return (
        <div className="max-w-2xl w-full p-8 bg-[rgb(18,18,18)] rounded-xl flex flex-col items-center">
            <SpotifyLogo className="rotate-12 mb-2" size={50} weight="fill" />
            <h1 className="font-extrabold text-3xl mb-8">Log in to Spotify</h1>
            <button className="w-80 p-2 flex items-center justify-center border border-neutral-500 hover:border-white rounded-3xl" onClick={login}>
                <GoogleLogo className="mr-8" size={30} weight="bold" />
                <p className="font-bold">Continue with Google</p>
            </button>
        </div>
    )
}

export default LoginForm
