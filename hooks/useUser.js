import { useEffect, useState } from "react"
import { listenAuthStateChanged } from "firebaseSesion/client"
import { useRouter } from "next/router"

export const USER_STATES = {
    NOT_LOGGED: null,
    NOT_KNOWN: undefined,
}

export default function useUser() {
    const [user, setUser] = useState(USER_STATES.NOT_KNOWN)
    const router = useRouter()

    useEffect(() => {
        listenAuthStateChanged(setUser)
        console.log(user)
    }, [])

    useEffect(() => {
        user === USER_STATES.NOT_LOGGED && router.push("/")
    }, [user])

    return user
}
