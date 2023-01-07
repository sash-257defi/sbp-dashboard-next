import AuthRequired from '../src/components/AuthRequired'
import Exchange from '../src/pages/Exchange'

const ExchangePage = () => {
    return (
        <AuthRequired>
            <Exchange />
        </AuthRequired>
    )
}
export default ExchangePage
