import { ForgetPasswordIndex } from '../../src/pages/ForgetPassword'
import Head from 'next/head'
import AuthNotRequired from '../../src/components/AuthNotRequired'

const ForgetPasswordPage = () => {
    return (
        <AuthNotRequired>
            <Head>
                <title>Forget password</title>
            </Head>
            <ForgetPasswordIndex />
        </AuthNotRequired>
    )
}

export default ForgetPasswordPage
