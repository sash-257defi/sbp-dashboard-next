import AuthRequired from '../src/components/AuthRequired'
import Wallet from '../src/pages/Wallet'
import Head from 'next/head'

const WalletPage = () => {
    return (
        <AuthRequired>
            <Head>
                <title>Wallet</title>
            </Head>
            <Wallet />
        </AuthRequired>
    )
}
export default WalletPage
