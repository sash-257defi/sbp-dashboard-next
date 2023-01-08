import { findTokenByIdAndType } from '../../src/api-lib/db'
import { getMongoDb } from '../../src/api-lib/mongodb'
import { ForgetPasswordToken } from '../../src/pages/ForgetPassword'
import Head from 'next/head'

const ResetPasswordTokenPage = ({ valid, token }) => {
    return (
        <>
            <Head>
                <title>Forget password</title>
            </Head>
            <ForgetPasswordToken valid={valid} token={token} />
        </>
    )
}

export async function getServerSideProps(context) {
    const db = await getMongoDb()

    const tokenDoc = await findTokenByIdAndType(db, context.params.token, 'passwordReset')

    return { props: { token: context.params.token, valid: !!tokenDoc } }
}

export default ResetPasswordTokenPage
