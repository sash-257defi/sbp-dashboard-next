import Head from 'next/head'
import EmailVerify from '@/page-components/Auth/EmailVerify'
import { useCurrentUser } from '@/lib/user'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const EmailVerifyPage = () => {
    const { data: { user } = {} } = useCurrentUser()
    const router = useRouter()
    const [isUser, setIsUser] = useState(false)
    useEffect(() => {
        if (user === null) {
            router.replace('/')
        } else {
            if (user) {
                if (user?.emailVerified) {
                    router.replace('/feed')
                } else {
                    setIsUser(true)
                }
            }
        }
    }, [user, router])
    if (!isUser) return null
    return (
        user && (
            <>
                <Head>
                    <title>Email Verification</title>
                </Head>
                <EmailVerify />
            </>
        )
    )
}
export default EmailVerifyPage
