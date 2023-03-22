import Head from 'next/head'
import AuthRequired from '../src/components/AuthRequired'
import EmailVerify from '../src/pages/Auth/EmailVerify'

const EmailVerifyPage = () => {
    return (
        <AuthRequired checkEmailVerify={true}>
            <Head>
                <title>Email Verification</title>
            </Head>
            <EmailVerify />
        </AuthRequired>
    )
}
export default EmailVerifyPage
