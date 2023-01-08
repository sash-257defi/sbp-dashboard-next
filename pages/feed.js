import { Feed } from '../src/pages/Feed'
import Head from 'next/head'
import AuthRequired from '../src/components/AuthRequired'
const FeedPage = () => {
    return (
        <AuthRequired>
            <Head>
                <title>Feed</title>
            </Head>
            <Feed />
        </AuthRequired>
    )
}

export default FeedPage
