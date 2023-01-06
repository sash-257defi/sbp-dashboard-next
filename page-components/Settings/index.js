import { Avatar } from '@/components/Avatar'
import { Button } from '@/components/Button'
import { Spacer } from '@/components/Layout'
import Wrapper from '@/components/Layout/Wrapper'
import { fetcher } from '@/lib/fetch'
import { useCurrentUser } from '@/lib/user'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import styles from './Settings.module.css'
import TextareaBox from '@/components/Input/TextAreaBox'
import InputBox from '@/components/Input/InputBox'

const Auth = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [isOldError, setIsOldError] = useState(false)
    const [isNewError, setIsNewError] = useState(false)
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')

    const onSubmit = async (e) => {
        e.preventDefault()
        try {
            setIsLoading(true)
            await fetcher('/api/user/password', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    oldPassword: oldPassword,
                    newPassword: newPassword,
                }),
            })
            toast.success('Your password has been updated')
        } catch (e) {
            toast.error(e.message)
        } finally {
            setIsLoading(false)
            setOldPassword('')
            setNewPassword('')
        }
    }
    const oldPasswordHandler = (e) => {
        const value = e.target.value
        if (value) {
            if (value?.length >= 7) {
                setIsOldError(false)
                setOldPassword(value)
            } else {
                setOldPassword(value)
                setIsOldError(true)
            }
        } else {
            setIsOldError(false)
            setOldPassword('')
        }
    }
    const newPasswordHandler = (e) => {
        const value = e.target.value
        if (value) {
            if (value?.length >= 7) {
                setIsNewError(false)
                setNewPassword(value)
            } else {
                setNewPassword(value)
                setIsNewError(true)
            }
        } else {
            setIsNewError(false)
            setNewPassword('')
        }
    }
    return (
        <section className={styles.card}>
            <h4 className={styles.sectionTitle}>Password</h4>
            <form onSubmit={onSubmit}>
                <InputBox
                    htmlType="password"
                    autoComplete="current-password"
                    value={oldPassword}
                    onChange={oldPasswordHandler}
                    label="Old Password"
                    error={isOldError}
                    errorMessage="Password length must be at least 7 characters"
                    size={'large'}
                />
                <Spacer size={0.5} axis="vertical" />
                <InputBox
                    htmlType="password"
                    autoComplete="new-password"
                    label="New Password"
                    value={newPassword}
                    onChange={newPasswordHandler}
                    error={isNewError}
                    errorMessage="Password length must be at least 7 characters"
                    size={'large'}
                />
                <Spacer size={0.5} axis="vertical" />
                <Button
                    htmlType="submit"
                    className={styles.submit}
                    type="success"
                    loading={isLoading}
                >
                    Save
                </Button>
            </form>
        </section>
    )
}

const AboutYou = ({ user, mutate }) => {
    const profilePictureRef = useRef()
    const [userName, setUserName] = useState('')
    const [name, setName] = useState('')
    const [bio, setBio] = useState('')

    const [avatarHref, setAvatarHref] = useState(user.profilePicture)
    const onAvatarChange = useCallback((e) => {
        const file = e.currentTarget.files?.[0]
        if (!file) return
        const reader = new FileReader()
        reader.onload = (l) => {
            setAvatarHref(l.currentTarget.result)
        }
        reader.readAsDataURL(file)
    }, [])

    const [isLoading, setIsLoading] = useState(false)

    const onSubmit = async (e) => {
        e.preventDefault()
        try {
            setIsLoading(true)
            const formData = new FormData()
            formData.append('username', userName)
            formData.append('name', name)
            formData.append('bio', bio)
            if (profilePictureRef.current.files[0]) {
                formData.append('profilePicture', profilePictureRef.current.files[0])
            }
            const response = await fetcher('/api/user', {
                method: 'PATCH',
                body: formData,
            })
            mutate({ user: response.user }, false)
            toast.success('Your profile has been updated')
        } catch (e) {
            toast.error(e.message)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        setUserName(user.username)
        setName(user.name)
        setBio(user.bio)
        profilePictureRef.current.value = ''
        setAvatarHref(user.profilePicture)
    }, [user])

    return (
        <section className={styles.card}>
            <h4 className={styles.sectionTitle}>About You</h4>
            <form onSubmit={onSubmit}>
                <InputBox
                    label="Your Username"
                    size={'large'}
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                />
                <Spacer size={1} axis="vertical" />
                <InputBox
                    label="Your Name"
                    size={'large'}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <Spacer size={1} axis="vertical" />
                <TextareaBox
                    label="Your Bio"
                    size={'large'}
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                />
                <Spacer size={1} axis="vertical" />
                <span className={styles.label}>Your Avatar</span>
                <div className={styles.avatar}>
                    <Avatar size={96} username={user.username} url={avatarHref} />
                    <input
                        aria-label="Your Avatar"
                        type="file"
                        accept="image/*"
                        ref={profilePictureRef}
                        onChange={onAvatarChange}
                    />
                </div>
                <Spacer size={0.5} axis="vertical" />
                <Button
                    htmlType="submit"
                    className={styles.submit}
                    type="success"
                    loading={isLoading}
                >
                    Save
                </Button>
            </form>
        </section>
    )
}

export const Settings = () => {
    const { data, error, mutate } = useCurrentUser()
    const router = useRouter()
    useEffect(() => {
        if (!data && !error) return
        if (!data.user) {
            router.replace('/login')
        }
    }, [router, data, error])
    return (
        <Wrapper className={styles.wrapper}>
            <Spacer size={2} axis="vertical" />
            {data?.user ? (
                <>
                    <AboutYou user={data.user} mutate={mutate} />
                    <Auth user={data.user} />
                </>
            ) : null}
        </Wrapper>
    )
}
