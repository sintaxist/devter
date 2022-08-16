// import '../../styles/globals.css'

export default function AppLayout({ children }) {
    return (
        <>
            <main>
                {children}
            </main>

            <style jsx global>{`
                html,
                body {
                  padding: 0;
                  margin: 0;
                  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
                    Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
                }
                
            `}</style>
        </>
    )
}