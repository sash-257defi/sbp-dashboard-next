import Login from '../src/pages/Auth/Login'
import AuthNotRequired from '../src/components/AuthNotRequired'
import Head from 'next/head'
const IndexPage = () => {
    return (
        <AuthNotRequired>
            <Head>
                <title>Login</title>
            </Head>
            <Login />
        </AuthNotRequired>
    )
}

export default IndexPage
