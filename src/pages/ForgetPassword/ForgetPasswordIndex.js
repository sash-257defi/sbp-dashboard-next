import { Button } from '../../components/Button'
import { ButtonLink } from '../../components/Button/Button'
import { Spacer, Wrapper } from '../../components/Layout'
import { Text } from '../../components/Text'
import { fetcher } from '../../lib/fetch'
import Link from 'next/link'
import { useState } from 'react'
import toast from 'react-hot-toast'
import styles from './ForgetPassword.module.css'
import InputBox from '../../components/Input/InputBox'

const ForgetPasswordIndex = () => {
    // 'loading' || 'success'
    const [status, setStatus] = useState()
    const [email, setEmail] = useState('')
    const [emailAddress, setEmailAddress] = useState('')
    const [isError, setIsError] = useState(false)
    const onSubmit = async (e) => {
        e.preventDefault()
        try {
            setStatus('loading')
            await fetcher('/api/user/password/reset', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: emailAddress,
                }),
            })
            setEmail(emailAddress)
            setStatus('success')
            setEmailAddress('')
        } catch (e) {
            toast.error(e.message)
            setStatus(undefined)
        }
    }
    const validateEmail = (email) => {
        return email.match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        )
    }
    const emailHandler = (e) => {
        const value = e.target.value
        if (value) {
            if (validateEmail(value)) {
                setIsError(false)
                setEmailAddress(value)
            } else {
                setEmailAddress(value)
                setIsError(true)
            }
        } else {
            setIsError(false)
            setEmailAddress('')
        }
    }
    return (
        <Wrapper className={styles.root}>
            <div className={styles.main}>
                <div className={styles.main_sub}>
                    {status === 'success' ? (
                        <>
                            <h1 className={styles.title}>Check your inbox</h1>
                            <p className={styles.subtitle}>
                                An email has been sent{' '}
                                <Text as="span" color="link">
                                    {email}
                                </Text>
                                . Please follow the link in that email to reset your password.
                            </p>
                        </>
                    ) : (
                        <>
                            <h1 className={styles.title}>Forget Password</h1>
                            <p className={styles.subtitle}>
                                Enter the email address associated with your account, and we&apos;ll
                                send you a link to reset your password.
                            </p>
                            <Spacer size={1} />
                            <form onSubmit={onSubmit}>
                                <InputBox
                                    htmlType="email"
                                    autoComplete="email"
                                    label={'Email Address'}
                                    size="large"
                                    required
                                    value={emailAddress}
                                    onChange={emailHandler}
                                    error={isError}
                                    errorMessage="Enter Valid Email Address"
                                />
                                <Spacer size={0.5} axis="vertical" />
                                <Button
                                    htmlType="submit"
                                    className={styles.submit}
                                    type="success"
                                    size="large"
                                    loading={status === 'loading'}
                                >
                                    Continue
                                </Button>
                            </form>
                        </>
                    )}
                    <Spacer size={0.25} axis="vertical" />
                    <Link href="/" passHref>
                        <ButtonLink type="success" size="large" variant="ghost">
                            Return to login
                        </ButtonLink>
                    </Link>
                </div>
            </div>
        </Wrapper>
    )
}

export default ForgetPasswordIndex
