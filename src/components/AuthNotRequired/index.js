import { useRouter } from 'next/router'
import { useCurrentUser } from '../../lib/user'

const AuthNotRequired = ({ children }) => {
    const router = useRouter()
    const { data: { user } = {} } = useCurrentUser()
    if (user === null) {
        return <div style={{ width: '100%' }}>{children}</div>
    }
    if (user) {
        if (router.pathname !== '/email-verify') {
            if (!user?.emailVerified) {
                router.push('/email-verify')
            } else {
                router.push('/dashboard')
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
export default AuthNotRequired
