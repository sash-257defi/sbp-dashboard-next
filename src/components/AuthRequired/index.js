import { useCurrentUser } from '../../lib/user'
import { useRouter } from 'next/router'

const AuthRequired = ({ children }) => {
    const router = useRouter()
    const { data: { user } = {} } = useCurrentUser()

    if (user === null) {
        router.replace('/login')
    }

    if (user) {
        if (router.pathname !== '/email-verify') {
            if (!user?.emailVerified) {
                router.replace('/email-verify')
            } else {
                return <div style={{ width: '100%' }}>{children}</div>
            }
        } else {
            if (user?.emailVerified) {
                router.replace('/dashboard')
            } else {
                return <div style={{ width: '100%' }}>{children}</div>
            }
        }
    }
}

export default AuthRequired
