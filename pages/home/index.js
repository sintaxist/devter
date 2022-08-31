import AppLayout from "components/AppLayout";
import Devit from "components/devit";
import useUser from "hooks/useUser";
import { useEffect, useState } from "react";

export default function HomePage() {

    const [timeline, setTimeline] = useState([])
    const user = useUser()

    useEffect(() => {
        user && fetch('http://localhost:3000/api/statuses/home_timeline')
            .then(res => res.json())
            .then(setTimeline)
    }, [user])

    // console.log(user)

    return (
        <>
            <AppLayout>

                <header>
                    <h2>Inicio</h2>
                </header>

                <section>
                    {timeline.map(({ id, username, avatar, message }) => (
                        <Devit
                            key={id}
                            username={username}
                            avatar={avatar}
                            message={message}
                        />
                    )
                    )}
                </section>

                <nav>

                </nav>

            </AppLayout>

            <style jsx>{`
                header{
                    display: flex;
                    align-items: center;
                    width: 100%; 
                    position: sticky;
                    height: 49px;
                    border-bottom: 1px solid #eee;
                    background-color: #ffffffaa;
                    backdrop-filter: blur(5px);
                    top: -1px;
                }
                h2{
                    font-weight: 800;
                    font-size: 21px;
                    padding-left: 15px;
                }
                nav{
                    width: 100%;
                    position: sticky;
                    height: 49px;
                    bottom: 0;
                    border-top: 1px solid #eee;
                    background-color: #ffffff;
                }
            `}</style>
        </>
    )
}