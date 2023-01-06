import { createToken } from '@/api-lib/db'
import { CONFIG as MAIL_CONFIG, sendMail } from '@/api-lib/mail'
import { auths } from '@/api-lib/middlewares'
import { getMongoDb } from '@/api-lib/mongodb'
import { ncOpts } from '@/api-lib/nc'
import nc from 'next-connect'
import { EmailTemplates } from '@/page-components/Auth/emailTemplates'

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
    await sendMail({
        to: req.user.email,
        from: MAIL_CONFIG.from,
        subject: `Verification Email for ${process.env.WEB_URI}`,
        html: data,
    })

    res.status(204).end()
})

export default handler
