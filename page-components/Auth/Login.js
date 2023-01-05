import { Button } from '@/components/Button'
import { ButtonLink } from '@/components/Button/Button'
import { Spacer, Wrapper } from '@/components/Layout'
import { TextLink } from '@/components/Text'
import { fetcher } from '@/lib/fetch'
import { useCurrentUser } from '@/lib/user'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import styles from './Auth.module.css'
import InputBox from '@/components/Input/InputBox'

const Login = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isEmailError, setIsEmailError] = useState(false)
    const { data: { user } = {}, mutate, isValidating } = useCurrentUser()
    const router = useRouter()
    const [isUser, setIsUser] = useState(false)
    useEffect(() => {
        if (isValidating) return
        if (user) {
            router.replace('/feed')
        } else {
            setIsUser(true)
        }
    }, [user, router, isValidating])
    const onSubmit = async (event) => {
        setIsLoading(true)
        event.preventDefault()
        try {
            const data = {
                email,
                password,
            }
            const response = await fetcher('/api/auth', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            })
            mutate({ user: response.user }, false)
            toast.success('You have been logged in.')
            setEmail('')
            setPassword('')
        } catch (e) {
            toast.error('Incorrect email or password.')
        } finally {
            setIsLoading(false)
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
                setIsEmailError(false)
                setEmail(value)
            } else {
                setEmail(value)
                setIsEmailError(true)
            }
        } else {
            setIsEmailError(false)
            setEmail('')
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
    if (!isUser) return null
    return (
        <Wrapper className={styles.root}>
            <div className={styles.main}>
                <div className={styles.main_sub}>
                    <h1 className={styles.title}>Login</h1>
                    <form onSubmit={onSubmit}>
                        <InputBox
                            htmlType="email"
                            autoComplete="email"
                            size="large"
                            required
                            label={'Email Address'}
                            onChange={emailHandler}
                            value={email}
                            error={isEmailError}
                            errorMessage="Enter Valid Email Address"
                        />
                        <Spacer size={0.5} axis="vertical" />
                        <InputBox
                            htmlType="password"
                            autoComplete="current-password"
                            size="large"
                            required
                            label={'Password'}
                            error={isError}
                            errorMessage="Password length must be at least 7 characters"
                            value={password}
                            onChange={passwordHandler}
                        />
                        <Spacer size={0.5} axis="vertical" />
                        <Button
                            htmlType="submit"
                            className={styles.submit}
                            type="success"
                            size="large"
                            loading={isLoading}
                        >
                            Log in
                        </Button>
                        <Spacer size={0.25} axis="vertical" />
                    </form>
                    <div className={styles.FormLinks}>
                        <Link href="/forget-password" passHref>
                            Forgot password?
                        </Link>
                        <Link href="/sign-up" passHref>
                            <TextLink color="link" variant="highlight">
                                Don&apos;t have an account? Sign Up
                            </TextLink>
                        </Link>
                    </div>
                </div>
            </div>
        </Wrapper>
    )
}

export default Login
