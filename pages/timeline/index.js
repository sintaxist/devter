import Link from 'next/link'
import AppLayout from '../../components/AppLayout'

export default function Timeline ({userName}){
    return (
        <AppLayout>
            <h1>This is the Timeline of {userName}</h1>
             <Link href='/'>Go home</Link>
        </AppLayout>
     )
}


//Solo dentro de componentes de tipo pagina

Timeline.getInitialProps = () => {
    return fetch('http://localhost:3000/api/hello')
    .then(res => res.json())
}
// Timeline.getInitialProps = () => {
//     return fetch('http://localhost:3000/api/hello')
//     .then(res => res.json())
//     .then(response => {
//         // console.log(response)
//         const {userName} = response
//         return {userName}
//     })
// }


// Timeline.getInitialProps = () => {
//     return {userName: 'Alejandro'}
// }