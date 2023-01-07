import { Settings } from '../src/pages/Settings'
import Head from 'next/head'
import AuthRequired from '../src/components/AuthRequired'

const SettingPage = () => {
    return (
        <AuthRequired>
            <Head>
                <title>Settings</title>
            </Head>
            <Settings />
        </AuthRequired>
    )
}

export default SettingPage
