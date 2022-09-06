import { useEffect, useState } from "react";
import AppLayout from "components/AppLayout";
import Button from "components/Button";
import useUser from "hooks/useUser";
import { addDevit, uploadImage } from "firebaseSesion/client";
import { useRouter } from "next/router";
import Head from "next/head";
import { colors } from "styles/theme";
import Avatar from "components/Avatar";

const COMPOSE_STATES = {
    USER_NOT_KNOWN: 0,
    LOADING: 1,
    SUCCESS: 2,
    ERROR: -1
}

const DRAG_IMAGE_STATES = {
    ERRROR: -1,
    NONE: 0,
    DRAG_OVER: 1,
    UPLOADING: 2,
    COMPLETE: 3
}

export default function ComposeTweet() {
    const [message, setMessage] = useState("")
    const [status, setStatus] = useState(COMPOSE_STATES.USER_NOT_KNOWN)

    const [drag, setDrag] = useState(DRAG_IMAGE_STATES.NONE)
    const [task, setTask] = useState(null)
    const [imgUrl, setImgUrl] = useState(null)

    const user = useUser()
    const router = useRouter()

    useEffect(() => {
        if (task) {
            let onProgress = () => { }
            let onError = () => { }
            let onComplete = () => {
                console.log('On Complete')
                task.snapshot.ref.getDownloadURL().then(setImgUrl)
            }

            task.on('state_changed', onError, onProgress, onComplete)
        }
    }, [task])

    const handleChange = (event) => {
        const { value } = event.target
        setMessage(value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        setStatus(COMPOSE_STATES.LOADING)
        addDevit({
            avatar: user.avatar,
            content: message,
            userId: user.uid,
            userName: user.username,
            img: imgUrl,
        }).then(() => {
            router.push('/home')
        }).catch((err) => {
            console.error(err)
            setStatus(COMPOSE_STATES.ERROR)
        })
    }

    const handleDragEnter = (event) => {
        event.preventDefault()
        setDrag(DRAG_IMAGE_STATES.DRAG_OVER)
    }

    const handleDragLeave = (event) => {
        event.preventDefault()
        setDrag(DRAG_IMAGE_STATES.NONE)
    }

    const handleDrop = (event) => {
        event.preventDefault()
        setDrag(DRAG_IMAGE_STATES.NONE)
        const file = event.dataTransfer.files[0]

        const task = uploadImage(file)
        setTask(task)
    }

    const isButtonDisabled = !message.length || status === COMPOSE_STATES.LOADING

    return (
        <>
            <AppLayout>
                <Head>
                    <title>Crear un Devit | Devter</title>
                </Head>
                <section className="form-container">
                    {user &&
                        <section className="avatar-container">
                            <Avatar src={user.avatar} />
                        </section>
                    }
                    <form onSubmit={handleSubmit}>
                        <textarea
                            onDragEnter={handleDragEnter}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                            onChange={handleChange}
                            placeholder='¿Qué esta pasando?'
                            value={message}
                        ></textarea>
                        {imgUrl &&
                            <section className="remove-img">
                                <button onClick={() => setImgUrl(null)}>x</button>
                                <img src={imgUrl} />
                            </section>
                        }
                        <div>
                            <Button disabled={isButtonDisabled}>Devitear</Button>
                        </div>
                    </form>
                </section>
            </AppLayout>
            <style jsx>{`
                form{
                    padding: 10px;
                }
                .remove-img{
                    position: relative;
                    width: 160px;
                    height: 160px;
                    border-radius: 10px;
                    overflow: hidden;
                }
                .remove-img:before{
                    content: '';
                    width: 100%;
                    height: 100%;
                    background: ${colors.primary};
                    position: absolute;
                    opacity: 0;
                    transition: opacity .3s;
                }
                .remove-img:hover:before{
                    opacity: .3;
                }
                .form-container{
                    display: flex;
                    align-items: flex-start;
                }
                .avatar-container{
                    padding-top: 20px;
                    padding-left: 10px;
                }
                button{
                    position: absolute;
                    background: rgba(0,0,0,.6);
                    font.size: 24px;
                    width: 36px;
                    height: 36px;
                    top: 15px;
                    position: absolute;
                    right: 15px;
                    border: 0;
                    border-radius: 100px;
                    color: ${colors.white};
                    cursor: pointer;
                    outline: none;
                }
                textarea{
                    border: ${drag === DRAG_IMAGE_STATES.DRAG_OVER ? '3px dashed #09f' : "3px solid transparent"};
                    border-radius: 10px;
                    padding: 15px;
                    resize: none;
                    font-size: 21px;
                    width: 100%;
                    outline: 0;
                    min-height: 200px;
                }
                div{
                    padding: 15px;
                }
                img{
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
            `}</style>
        </>
    )
}