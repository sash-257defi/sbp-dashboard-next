import SignUp from '../src/pages/Auth/SignUp'
import Head from 'next/head'
import AuthNotRequired from '../src/components/AuthNotRequired'

const SignupPage = () => {
    return (
        <AuthNotRequired>
            <Head>
                <title>Sign up</title>
            </Head>
            <SignUp />
        </AuthNotRequired>
    )
}

export default SignupPage
