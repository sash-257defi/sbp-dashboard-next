import AuthRequired from '../src/components/AuthRequired'
import Exchange from '../src/pages/Exchange'
import Head from 'next/head'

const ExchangePage = () => {
    return (
        <AuthRequired>
            <Head>
                <title>Exchange</title>
            </Head>
            <Exchange />
        </AuthRequired>
    )
}
export default ExchangePage
