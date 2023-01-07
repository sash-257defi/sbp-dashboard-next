import AuthRequired from '../src/components/AuthRequired'
import Withdraw from '../src/pages/Withdraw'

const WithdrawPage = () => {
    return (
        <AuthRequired>
            <Withdraw />
        </AuthRequired>
    )
}
export default WithdrawPage
