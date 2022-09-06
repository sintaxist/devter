import AppLayout from "components/AppLayout";
import Devit from "components/devit";
import Create from "components/Icons/Create";
import Home from "components/Icons/Home";
import Search from "components/Icons/Search";
import { fetchLatestDevits } from "firebaseSesion/client";
import useUser from "hooks/useUser";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import { colors } from "styles/theme";

export default function HomePage() {

    const [timeline, setTimeline] = useState([])
    const user = useUser()

    useEffect(() => {
        user &&
            fetchLatestDevits().then(setTimeline)
    }, [user])

    // console.log(user)

    return (
        <>
            <AppLayout>
                <Head>
                    <title>Inicio | Devter</title>
                </Head>
                <header>
                    <h2>Inicio</h2>
                </header>

                <section>
                    {timeline.map(({ id, userName, avatar, content, createdAt, userId, img }) => (
                        <Devit
                            key={id}
                            id={id}
                            img={img}
                            createdAt={createdAt}
                            userName={userName}
                            avatar={avatar}
                            content={content}
                            userId={userId}
                        />
                    )
                    )}
                </section>

                <nav>
                    <Link href="/compose/tweet">
                        <a>
                            <Home width={32} height={32} stroke='#09f' />
                        </a>
                    </Link>
                    <Link href="/compose/tweet">
                        <a>
                            <Search width={32} height={32} stroke='#09f' />
                        </a>
                    </Link>
                    <Link href="/compose/tweet">
                        <a>
                            <Create width={32} height={32} stroke='#09f' />
                        </a>
                    </Link>
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
                section{
                    flex: 1;
                }
                h2{
                    font-weight: 800;
                    font-size: 21px;
                    padding-left: 15px;
                }
                nav{
                    display: flex;
                    width: 100%;
                    position: sticky;
                    height: 49px;
                    min-height: 49px;
                    bottom: 0;
                    border-top: 1px solid #eee;
                    background-color: #ffffff;
                }
                nav a{
                    height: 100%;
                    align-items: center;
                    display: flex;
                    flex: 1 1 auto;
                    justify-content: center;
                    transition: all .3s;
                }
                nav a:hover{
                    background: #88DADA22;
                }
                nav a:hover > :global(svg){
                    stroke: ${colors.primary};
                }
            `}</style>
        </>
    )
}