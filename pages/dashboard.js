import AuthRequired from '../src/components/AuthRequired'
import Dashboard from '../src/pages/Dashboard'
import Head from 'next/head'

const DashboardPage = () => {
    return (
        <AuthRequired>
            <Head>
                <title>DashBoard</title>
            </Head>
            <Dashboard />
        </AuthRequired>
    )
}
export default DashboardPage
