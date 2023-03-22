import { ValidateProps } from '../../../src/api-lib/constants'
import { findUserByUsername, updateUserById } from '../../../src/api-lib/db'
import { auths, validateBody } from '../../../src/api-lib/middlewares'
import { getMongoDb } from '../../../src/api-lib/mongodb'
import { ncOpts } from '../../../src/api-lib/nc'
import { slugUsername } from '../../../src/lib/user'
import { v2 as cloudinary } from 'cloudinary'
import multer from 'multer'
import nc from 'next-connect'
const storage = multer.memoryStorage()
const upload = multer(storage)
const handler = nc(ncOpts)

if (process.env.CLOUDINARY_URL) {
    const {
        hostname: cloud_name,
        username: api_key,
        password: api_secret,
    } = new URL(process.env.CLOUDINARY_URL)

    cloudinary.config({
        cloud_name,
        api_key,
        api_secret,
    })
}

handler.use(...auths)

handler.get(async (req, res) => {
    if (!req.user) return res.json({ user: null })
    return res.json({ user: req.user })
})

handler.patch(
    upload.single('profilePicture'),
    validateBody({
        type: 'object',
        properties: {
            username: ValidateProps.user.username,
            name: ValidateProps.user.name,
            bio: ValidateProps.user.bio,
        },
        additionalProperties: true,
    }),
    async (req, res) => {
        if (!req.user) {
            req.status(401).end()
            return
        }

        const db = await getMongoDb()

        let profilePicture
        if (req.body.profilePicture) {
            const image = await cloudinary.uploader.upload(req.body.profilePicture, {
                width: 512,
                height: 512,
                crop: 'fill',
            })
            profilePicture = image.secure_url
        }
        const { name, bio } = req.body

        let username

        if (req.body.username) {
            username = slugUsername(req.body.username)
            if (username !== req.user.username && (await findUserByUsername(db, username))) {
                res.status(403).json({ error: { message: 'The username has already been taken.' } })
                return
            }
        }

        const user = await updateUserById(db, req.user._id, {
            ...(username && { username }),
            ...(name && { name }),
            ...(typeof bio === 'string' && { bio }),
            ...(profilePicture && { profilePicture }),
        })

        res.json({ user })
    },
)

export const config = {
    api: {
        bodyParser: false,
    },
}

export default handler
