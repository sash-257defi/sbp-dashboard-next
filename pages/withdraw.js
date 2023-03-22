import AuthRequired from '../src/components/AuthRequired'
import Withdraw from '../src/pages/Withdraw'
import Head from 'next/head'

const WithdrawPage = () => {
    return (
        <AuthRequired>
            <Head>
                <title>WithDraw</title>
            </Head>
            <Withdraw />
        </AuthRequired>
    )
}
export default WithdrawPage
