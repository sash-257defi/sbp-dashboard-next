import AuthRequired from '../src/components/AuthRequired'
import Dashboard from '../src/pages/Dashboard'

const DashboardPage = () => {
    return (
        <AuthRequired>
            <Dashboard />
        </AuthRequired>
    )
}
export default DashboardPage
