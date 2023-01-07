import AuthRequired from '../src/components/AuthRequired'
import Nft from '../src/pages/Nft'

const NftPage = () => {
    return (
        <AuthRequired>
            <Nft />
        </AuthRequired>
    )
}
export default NftPage
