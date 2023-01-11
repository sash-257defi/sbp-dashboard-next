import { useCurrentUser } from '../../lib/user'
import { useRouter } from 'next/router'

const AuthRequired = ({ children }) => {
    const router = useRouter()
    const { data: { user } = {} } = useCurrentUser()

    if (user === null) {
        router.push('/')
    }

    if (user) {
        if (router.pathname !== '/email-verify') {
            if (!user?.emailVerified) {
                router.push('/email-verify')
            } else {
                return <div style={{ width: '100%' }}>{children}</div>
            }
        } else {
            if (user?.emailVerified) {
                router.push('/dashboard')
            } else {
                return <div style={{ width: '100%' }}>{children}</div>
            }
        }
    }
}

export default AuthRequired
