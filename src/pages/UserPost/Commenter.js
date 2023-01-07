import { Avatar } from '../../components/Avatar'
import { Button } from '../../components/Button'
import { Container } from '../../components/Layout'
import { LoadingDots } from '../../components/LoadingDots'
import { Text, TextLink } from '../../components/Text'
import { useCommentPages } from '../../lib/comment'
import { fetcher } from '../../lib/fetch'
import { useCurrentUser } from '../../lib/user'
import Link from 'next/link'
import { useState } from 'react'
import toast from 'react-hot-toast'
import styles from './Commenter.module.css'
import InputBox from '../../components/Input/InputBox'

const CommenterInner = ({ user, post }) => {
    const [isLoading, setIsLoading] = useState(false)
    const [content, setContent] = useState('')

    const { mutate } = useCommentPages({ postId: post._id })
    const onSubmit = async (e) => {
        e.preventDefault()
        try {
            setIsLoading(true)
            await fetcher(`/api/posts/${post._id}/comments`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ content: content }),
            })
            toast.success('You have added a comment')
            setContent('')
            // refresh post lists
            mutate()
        } catch (e) {
            toast.error(e.message)
        } finally {
            setIsLoading(false)
        }
    }
    return (
        <form onSubmit={onSubmit}>
            <Container className={styles.poster}>
                <Avatar size={40} username={user.username} url={user.profilePicture} />
                <InputBox
                    className={styles.input}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    label="Add your comment"
                    size={'small'}
                />
                <Button type="success" loading={isLoading}>
                    Comment
                </Button>
            </Container>
        </form>
    )
}

const Commenter = ({ post }) => {
    const { data, error } = useCurrentUser()
    const loading = !data && !error

    return (
        <div className={styles.root}>
            <h3 className={styles.heading}>
                Replying to{' '}
                <Link href={`/user/${post.creator.username}`} passHref>
                    <TextLink color="link">@{post.creator.username}</TextLink>
                </Link>
            </h3>
            {loading ? (
                <LoadingDots>Loading</LoadingDots>
            ) : data?.user ? (
                <CommenterInner post={post} user={data.user} />
            ) : (
                <Text color="secondary">
                    Please{' '}
                    <Link href="/login" passHref>
                        <TextLink color="link" variant="highlight">
                            sign in
                        </TextLink>
                    </Link>{' '}
                    to comment
                </Text>
            )}
        </div>
    )
}

export default Commenter
