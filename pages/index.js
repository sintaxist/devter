import { useEffect } from 'react'
import Head from 'next/head'

import AppLayout from 'components/AppLayout'
import Button from 'components/Button'
import GitHub from 'components/Icons/github'
import Logo from 'components/Icons/logo'

import styles from 'styles/Home.module.scss'
import { colors } from 'styles/theme'

import { loginWithGitHub } from 'firebaseSesion/client'

import { useRouter } from 'next/router'
import useUser, { USER_STATES } from 'hooks/useUser'


export default function Home() {
  const user = useUser()
  const router = useRouter()

  useEffect(() => {
    user && router.replace("/home")
  }, [user])

  const handleClick = () => {
    loginWithGitHub().catch((err) => {
      console.log(err)
    })
  }

  return (
    <>
      <Head>
        <title>Devter</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AppLayout>
        <section>
          <Logo width='100' />
          <h1 className={styles.title}>Devter</h1>
          <h2>
            Talk about development
            <br />
            with developers 👨🏻‍💻 👩🏻‍💻
          </h2>
          <div>
            {/* <Button onClick={handleClick}>
              <GitHub width={24} height={24} />
              Login with GitHub
            </Button> */}
            {user === USER_STATES.NOT_LOGGED && (
              <Button onClick={handleClick}>
                <GitHub width={24} height={24} />
                Login with GitHub
              </Button>
            )}
            {user === USER_STATES.NOT_KNOWN && <img src="/spinner.gif" />}
          </div>
        </section>
      </AppLayout>

      <style jsx>{`
        img {
          width: 120px;
        }

        section {
          display: grid;
          height: 100%;
          place-content: center;
          place-items: center;
        }

        div {
          margin-top: 16px;
        }

        h1 {
          color: ${colors.primary};
          font-weight: 800;
          font-size: 32px;
          margin-bottom: 16px;
          text-align: center;
        }

        h2 {
          color: ${colors.secondary};
          font-size: 21px;
          margin: 0;
        }
        span{
          font-weight: bold;
          color: ${colors.primary};
        }
      `}</style>
    </>
  )
}
