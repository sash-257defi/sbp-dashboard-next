import AuthRequired from '../src/components/AuthRequired'
import Buy from '../src/pages/Buy'

const BuyPage = () => {
    return (
        <AuthRequired>
            <Buy />
        </AuthRequired>
    )
}
export default BuyPage
