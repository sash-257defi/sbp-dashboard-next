import Login from '../src/pages/Auth/Login'
import Head from 'next/head'
import AuthNotRequired from '../src/components/AuthNotRequired'

const LoginPage = () => {
    return (
        <AuthNotRequired>
            <Head>
                <title>Login</title>
            </Head>
            <Login />
        </AuthNotRequired>
    )
}

export default LoginPage
