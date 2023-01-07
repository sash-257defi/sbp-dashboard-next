import { Avatar } from '../Avatar'
import { Button, ButtonLink } from '../Button'
// import { ThemeSwitcher } from '@/components/ThemeSwitcher';
import { fetcher } from '../../lib/fetch'
import { useCurrentUser } from '../../lib/user'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import Container from './Container'
import styles from './Nav.module.css'
import Spacer from './Spacer'
import Wrapper from './Wrapper'
import logo_img from '../../../public/images/logo.png'
import menu_img from '../../../public/images/menu.svg'
import cancel_img from '../../../public/images/cancel.svg'
import Image from 'next/image'
import { firstLetterUppercase } from '../../util/stringHelper'

const UserMenu = ({ user, mutate }) => {
    const menuRef = useRef()
    const avatarRef = useRef()

    const [visible, setVisible] = useState(false)

    const router = useRouter()
    useEffect(() => {
        const onRouteChangeComplete = () => setVisible(false)
        router.events.on('routeChangeComplete', onRouteChangeComplete)
        return () => router.events.off('routeChangeComplete', onRouteChangeComplete)
    })

    useEffect(() => {
        // detect outside click to close menu
        const onMouseDown = (event) => {
            if (
                !menuRef.current.contains(event.target) &&
                !avatarRef.current.contains(event.target)
            ) {
                setVisible(false)
            }
        }
        document.addEventListener('mousedown', onMouseDown)
        return () => {
            document.removeEventListener('mousedown', onMouseDown)
        }
    }, [])

    const onSignOut = useCallback(async () => {
        try {
            await fetcher('/api/auth', {
                method: 'DELETE',
            })
            toast.success('You have been signed out')
            mutate({ user: null })
            router.replace('/')
        } catch (e) {
            toast.error(e.message)
        }
    }, [mutate, router])

    return (
        <div className={styles.user}>
            <button className={styles.trigger} ref={avatarRef} onClick={() => setVisible(!visible)}>
                <Avatar size={32} username={user.username} url={user.profilePicture} />
            </button>
            <div ref={menuRef} role="menu" aria-hidden={visible} className={styles.popover}>
                {visible && (
                    <div className={styles.menu}>
                        <Link passHref href={`/user/${user.username}`}>
                            <a className={styles.item}>Profile</a>
                        </Link>
                        <Link passHref href="/settings">
                            <a className={styles.item}>Settngs</a>
                        </Link>
                        <button onClick={onSignOut} className={styles.item}>
                            Sign out
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

const Nav = () => {
    const { data: { user } = {}, mutate } = useCurrentUser()

    const [navDrawerOpen, setNavDrawerOpen] = useState(false)

    const router = useRouter()

    const toggleNavDrawer = () => {
        setNavDrawerOpen(!navDrawerOpen)
    }

    const onSignOut = useCallback(async () => {
        try {
            await fetcher('/api/auth', {
                method: 'DELETE',
            })
            toast.success('You have been signed out')
            mutate({ user: null })
            router.replace('/')
        } catch (e) {
            toast.error(e.message)
        }
    }, [mutate, router])

    const navClickHandler = (path) => {
        toggleNavDrawer()
        switch (path) {
            case 'profile':
                router.push(`/user/${user.username}`)
                break
            case 'settings':
                router.push('/settings')
                break
            case 'Sign out':
                onSignOut()
                break
            default:
                router.push(`/${path}`)
        }
    }

    return (
        <div>
            <nav className={styles.nav}>
                <Wrapper className={styles.wrapper}>
                    <Container
                        className={styles.content}
                        alignItems="center"
                        justifyContent="space-between"
                    >
                        <Link href="/dashboard">
                            <a className={styles.logo}>
                                <Image src={logo_img} alt={''} width={170} height={26} />
                            </a>
                        </Link>
                        <div className={styles.rightContainer}>
                            <Container>
                                {user ? (
                                    <>
                                        <UserMenu user={user} mutate={mutate} />
                                    </>
                                ) : (
                                    <>
                                        <Link passHref href="/login">
                                            <ButtonLink
                                                size="small"
                                                type="success"
                                                variant="ghost"
                                                color="link"
                                            >
                                                Log in
                                            </ButtonLink>
                                        </Link>
                                        <Spacer axis="horizontal" size={0.25} />
                                        <Link passHref href="/sign-up">
                                            <Button size="small" type="success">
                                                Sign Up
                                            </Button>
                                        </Link>
                                    </>
                                )}
                            </Container>
                        </div>
                        {user ? (
                            <div className={styles.menuButton}>
                                <Image
                                    src={menu_img}
                                    width={25}
                                    height={25}
                                    onClick={toggleNavDrawer}
                                />
                            </div>
                        ) : null}
                    </Container>
                </Wrapper>
            </nav>
            {navDrawerOpen ? (
                <div className={styles.drawerContainer}>
                    <div className={styles.drawerClose}>
                        <Image src={cancel_img} width={20} height={20} onClick={toggleNavDrawer} />
                    </div>
                    <div className={styles.drawerNav}>
                        {['claim', 'wallet', 'nft', 'withdraw', 'buy', 'exchange'].map((item) => {
                            return (
                                <p
                                    className={
                                        router?.pathname === `/${item}`
                                            ? styles.isActive
                                            : styles.navItem
                                    }
                                    key={item}
                                    onClick={() => navClickHandler(item)}
                                >
                                    {firstLetterUppercase(item)}
                                </p>
                            )
                        })}
                        <div style={{ width: '100%', height: 1, background: '#FFFFFF' }} />
                        {['profile', 'settings', 'Sign out'].map((item) => {
                            return (
                                <p
                                    className={
                                        router?.pathname === `/${item}`
                                            ? styles.isActive
                                            : item === 'profile' &&
                                              router.pathname.includes('/user/')
                                            ? styles.isActive
                                            : styles.navItem
                                    }
                                    key={item}
                                    onClick={() => navClickHandler(item)}
                                >
                                    {firstLetterUppercase(item)}
                                </p>
                            )
                        })}
                    </div>
                </div>
            ) : null}
        </div>
    )
}

export default Nav
