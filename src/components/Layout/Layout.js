import Head from 'next/head'
import Footer from './Footer'
import styles from './Layout.module.css'
import Nav from './Nav'
import SideBarPage from '../SideBar'
import { useCurrentUser } from '../../lib/user'

const Layout = ({ children }) => {
    const { data: { user } = {} } = useCurrentUser()
    return (
        <>
            <Head>
                <title>SellBuyPlay Token Presale</title>
                <meta
                    key="viewport"
                    name="viewport"
                    content="width=device-width, initial-scale=1, shrink-to-fit=no"
                />
                <meta name="description" content="SellBuyPlay Token Presale" />
                <meta property="og:title" content="SellBuyPlay Token Presale" />
                <meta property="og:description" content="SellBuyPlay Token Presale" />
                <meta
                    property="og:image"
                    content="https://sash-257defi.github.io/sbpm-media/sbp-logo.png"
                />
            </Head>
            <Nav />
            {user && user?.emailVerified ? (
                <SideBarPage>
                    <div className={styles.main}>{children}</div>
                    <Footer />
                </SideBarPage>
            ) : (
                <div className={styles.mainSecond}>
                    <div className={styles.main} style={{ justifyContent: 'center' }}>
                        {children}
                    </div>
                    <Footer />
                </div>
            )}
        </>
    )
}

export default Layout
