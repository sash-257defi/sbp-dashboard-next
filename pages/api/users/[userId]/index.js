import { findUserById } from '../../../../src/api-lib/db'
import { getMongoDb } from '../../../../src/api-lib/mongodb'
import { ncOpts } from '../../../../src/api-lib/nc'
import nc from 'next-connect'

const handler = nc(ncOpts)

handler.get(async (req, res) => {
    const db = await getMongoDb()
    const user = await findUserById(db, req.query.userId)
    res.json({ user })
})

export default handler
