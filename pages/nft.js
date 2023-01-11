import AuthRequired from '../src/components/AuthRequired'
import Nft from '../src/pages/Nft'
import Head from 'next/head'

const NftPage = () => {
    return (
        <AuthRequired>
            <Head>
                <title>Nft</title>
            </Head>
            <Nft />
        </AuthRequired>
    )
}
export default NftPage
