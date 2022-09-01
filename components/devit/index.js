import Avatar from "components/Avatar/index";

export default function Devit({ avatar, userName, content, createdAt, id }) {
    return (
        <>
            <article>
                <div>
                    <Avatar alt={userName} src={avatar} />
                </div>
                <section>
                    <header>
                        <strong>{userName}</strong>
                        <time>{createdAt}</time>
                    </header>
                    <p>{content}</p>
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
            `}</style>
        </>
    )
}