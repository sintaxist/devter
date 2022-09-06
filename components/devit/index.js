import Avatar from "components/Avatar/index";
import useTimeAgo from "hooks/useTimeAgo";
import useDateTimeFormat from "hooks/useDateTimeFormat";

export default function Devit({ avatar, userName, content, createdAt, img, id }) {
    const timeago = useTimeAgo(createdAt)
    const createdAtFormated = useDateTimeFormat(createdAt)
    return (
        <>
            <article>
                <div>
                    <Avatar alt={userName} src={avatar} />
                </div>
                <section>
                    <header>
                        <strong>{userName}</strong>
                        <span> · </span>
                        <time title={createdAtFormated}>{timeago}</time>
                    </header>
                    <p>{content}</p>
                    {img && <img src={img} />}
                </section>
            </article>
            <style jsx>{`
                article{
                    display: flex;
                    padding: 10px 15px;
                    border-bottom: 1px solid #eee;
                }
                div{
                    padding-right: 10px;
                }
                p{
                    margin: 0;
                    line-height: 1.3125;
                }
                img{
                    width: 100%;
                    border-radius: 10px;
                    height: auto;
                    margin-top: 10px;
                }
                time{
                    color: #555;
                    font-size: 14px;
                }
            `}</style>
        </>
    )
}