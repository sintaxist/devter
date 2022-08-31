import AppLayout from "components/AppLayout";
import Button from "components/Button";
import useUser from "hooks/useUser";

export default function C0mposeTweet() {
    const user = useUser()
    return (
        <>
            <AppLayout>
                <form>
                    <textarea placeholder='¿Qué esta pasando?'></textarea>
                    <div>
                        <Button>Devitear</Button>
                    </div>
                </form>
            </AppLayout>
            <style jsx>{`
                textarea{
                    border: 0;
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
            `}</style>
        </>
    )
}