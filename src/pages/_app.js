import '../styles/globals.css'
import 'tailwindcss/tailwind.css'
import { SessionProvider } from "next-auth/react"
import { UserProvider } from '../dados/usersContext'
import '../styles/frameAnime.css'
function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <UserProvider>
        < Component {...pageProps} />
      </UserProvider>
    </SessionProvider>
  )
}

export default MyApp