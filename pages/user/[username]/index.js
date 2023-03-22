import React from 'react'
import { findUserByUsername } from '../../../src/api-lib/db'
import { getMongoDb } from '../../../src/api-lib/mongodb'
import { User } from '../../../src/pages/User'
import Head from 'next/head'
import AuthRequired from '../../../src/components/AuthRequired'

export default function UserPage({ user }) {
    return (
        <AuthRequired>
            <Head>
                <title>
                    {user.name} (@{user.username})
                </title>
            </Head>
            <User user={user} />
        </AuthRequired>
    )
}

export async function getServerSideProps(context) {
    const db = await getMongoDb()

    const user = await findUserByUsername(db, context.params.username)
    if (!user) {
        return {
            notFound: true,
        }
    }
    user._id = String(user._id)
    return { props: { user } }
}
