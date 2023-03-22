import AuthRequired from '../src/components/AuthRequired'
import Buy from '../src/pages/Buy'
import Head from 'next/head'

const BuyPage = () => {
    return (
        <AuthRequired>
            <Head>
                <title>Buy</title>
            </Head>
            <Buy />
        </AuthRequired>
    )
}
export default BuyPage
