import AuthRequired from '../src/components/AuthRequired'
import Wallet from '../src/pages/Wallet'

const WalletPage = () => {
    return (
        <AuthRequired>
            <Wallet />
        </AuthRequired>
    )
}
export default WalletPage
