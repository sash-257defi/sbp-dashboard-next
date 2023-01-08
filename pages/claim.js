import AuthRequired from '../src/components/AuthRequired'
import Claim from '../src/pages/Claim'

const ClaimPage = () => {
    return (
        <AuthRequired>
            <Claim />
        </AuthRequired>
    )
}
export default ClaimPage
