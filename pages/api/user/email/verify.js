import { createToken } from '../../../../src/api-lib/db'
import { CONFIG as MAIL_CONFIG, sendMail } from '../../../../src/api-lib/mail'
import { auths } from '../../../../src/api-lib/middlewares'
import { getMongoDb } from '../../../../src/api-lib/mongodb'
import { ncOpts } from '../../../../src/api-lib/nc'
import nc from 'next-connect'
import { EmailTemplates } from '../../../../src/pages/Auth/emailTemplates'

const handler = nc(ncOpts)

handler.use(...auths)

handler.post(async (req, res) => {
    if (!req.user) {
        res.json(401).end()
        return
    }

    const db = await getMongoDb()

    const token = await createToken(db, {
        creatorId: req.user._id,
        type: 'emailVerify',
        expireAt: new Date(Date.now() + 1000 * 60 * 60 * 24),
    })
    const data = EmailTemplates(token, req.user.username)
    console.log('Data =>', data)
    await sendMail({
        to: req.user.email,
        from: MAIL_CONFIG.from,
        subject: `Verification Email for ${process.env.WEB_URI}`,
        html: data,
    })

    res.status(204).end()
})

export default handler
