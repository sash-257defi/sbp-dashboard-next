import { Button } from '@/components/Button'
import { ButtonLink } from '@/components/Button/Button'
import { Spacer, Wrapper } from '@/components/Layout'
import { fetcher } from '@/lib/fetch'
import Link from 'next/link'
import { useState } from 'react'
import toast from 'react-hot-toast'
import styles from './ForgetPassword.module.css'
import InputBox from '@/components/Input/InputBox'

const NewPassword = ({ token }) => {
    // 'loading' | 'success'
    const [status, setStatus] = useState()
    const [isError, setIsError] = useState(false)
    const [password, setPassword] = useState('')
    const onSubmit = async (event) => {
        event.preventDefault()
        setStatus('loading')
        try {
            await fetcher('/api/user/password/reset', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    token,
                    password: password,
                }),
            })
            setStatus('success')
            setPassword('')
        } catch (e) {
            toast.error(e.message)
            setStatus(undefined)
        }
    }
    const passwordHandler = (e) => {
        const value = e.target.value
        if (value) {
            if (value?.length >= 7) {
                setIsError(false)
                setPassword(value)
            } else {
                setPassword(value)
                setIsError(true)
            }
        } else {
            setIsError(false)
            setPassword('')
        }
    }
    return (
        <div className={styles.main}>
            <div className={styles.main_sub}>
                <h1 className={styles.title}>Reset Password</h1>
                {status === 'success' ? (
                    <>
                        <p className={styles.subtitle}>
                            Your password has been updated successfully.
                        </p>
                    </>
                ) : (
                    <>
                        <p className={styles.subtitle}>Enter a new password for your account</p>
                        <Spacer size={1} />
                        <form onSubmit={onSubmit}>
                            <InputBox
                                htmlType="password"
                                autoComplete="new-password"
                                label={'New Password'}
                                size="large"
                                required
                                value={password}
                                onChange={passwordHandler}
                                error={isError}
                                errorMessage="Password length must be at least 7 characters"
                            />
                            <Spacer size={0.5} axis="vertical" />
                            <Button
                                htmlType="submit"
                                className={styles.submit}
                                type="success"
                                size="large"
                            >
                                Reset Password
                            </Button>
                        </form>
                    </>
                )}
                <Spacer size={0.25} axis="vertical" />
                <Link href="/login" passHref>
                    <ButtonLink type="success" size="large" variant="ghost">
                        Return to login
                    </ButtonLink>
                </Link>
            </div>
        </div>
    )
}

const BadLink = () => {
    return (
        <div className={styles.main}>
            <h1 className={styles.title}>Invalid Link</h1>
            <p className={styles.subtitle}>
                It looks like you may have clicked on an invalid link. Please close this window and
                try again.
            </p>
            <Spacer size={1} />
            <Link href="/login" passHref>
                <ButtonLink type="success" size="large" variant="ghost">
                    Return to login
                </ButtonLink>
            </Link>
        </div>
    )
}

const ForgetPasswordToken = ({ valid, token }) => {
    return (
        <Wrapper className={styles.root}>
            {valid ? <NewPassword token={token} /> : <BadLink />}
        </Wrapper>
    )
}

export default ForgetPasswordToken
