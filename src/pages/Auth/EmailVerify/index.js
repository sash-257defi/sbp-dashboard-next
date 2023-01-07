import { Spacer, Wrapper } from '../../../components/Layout'
import styles from '../Auth.module.css'
import InputBox from '../../../components/Input/InputBox'
import { Button } from '../../../components/Button'
import { useCurrentUser } from '../../../lib/user'
import { useEffect, useState } from 'react'
import { fetcher } from '../../../lib/fetch'
import toast from 'react-hot-toast'
import { useRouter } from 'next/router'
const EmailVerify = () => {
    const router = useRouter()
    const { data: { user } = {} } = useCurrentUser()
    const [email, setEmail] = useState('')
    const [status, setStatus] = useState()
    useEffect(() => {
        if (user) {
            setEmail(user?.email)
        }
    }, [user])
    const onSubmit = async () => {
        try {
            setStatus('loading')
            await fetcher('/api/user/email/verify', {
                method: 'POST',
                headers: {
                    Accept: 'application/json, text/plain, */*',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: user.email }),
            }).then((res) => {
                console.log('Response received', res)
            })
            toast.success(
                'An email has been sent to your mailbox. Follow the instruction to verify your email.',
            )
            setStatus('success')
            router.replace('/feed')
        } catch (e) {
            toast.error(e.message)
            setStatus('')
        }
    }
    const emailHandler = (e) => {
        if (!user) {
            setEmail(e.target.value)
        }
    }
    return (
        <Wrapper className={styles.root}>
            <div className={styles.main}>
                <div className={styles.main_sub}>
                    <h1 className={styles.title}>Email Verification</h1>
                    <form>
                        <InputBox
                            htmlType="email"
                            autoComplete="email"
                            size="large"
                            required
                            label={'Email Address'}
                            onChange={emailHandler}
                            value={email}
                        />
                        <Spacer size={0.5} axis="vertical" />
                        <Button
                            htmlType="submit"
                            className={styles.submit}
                            loading={status === 'loading'}
                            type="success"
                            size="large"
                            disabled={status === 'success'}
                            onClick={onSubmit}
                        >
                            Verify
                        </Button>
                    </form>
                </div>
            </div>
        </Wrapper>
    )
}
export default EmailVerify
