import AuthRequired from '../src/components/AuthRequired'
import Claim from '../src/pages/Claim'
import Head from 'next/head'

const ClaimPage = () => {
    return (
        <AuthRequired>
            <Head>
                <title>Claim</title>
            </Head>
            <Claim />
        </AuthRequired>
    )
}
export default ClaimPage
