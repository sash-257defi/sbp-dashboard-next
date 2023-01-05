import { createToken } from '@/api-lib/db';
import { CONFIG as MAIL_CONFIG, sendMail } from '@/api-lib/mail';
import { auths } from '@/api-lib/middlewares';
import { getMongoDb } from '@/api-lib/mongodb';
import { ncOpts } from '@/api-lib/nc';
import nc from 'next-connect';

const handler = nc(ncOpts);

handler.use(...auths);

handler.post(async (req, res) => {
  if (!req.user) {
    res.json(401).end();
    return;
  }

  const db = await getMongoDb();

  const token = await createToken(db, {
    creatorId: req.user._id,
    type: 'emailVerify',
    expireAt: new Date(Date.now() + 1000 * 60 * 60 * 24),
  });

  await sendMail({
    to: req.user.email,
    from: MAIL_CONFIG.from,
    subject: `Verification Email for ${process.env.WEB_URI}`,
    html: `
      <div style="width:100%;padding:20px;height:100%;text-align: center;background:#000;">
          <div style="width:400px;border:1px solid #3e3e3e;border-radius:10px;padding:10px;margin: auto;color:white">
              <div style="text-align:center">
                  <img src="https://sash-257defi.github.io/sbpm-media/sbp-logo.png" alt="Red dot" width="100px" />
              </div>
              <h1 style="font-size: 21px;margin-top: 10px;margin-bottom: 10px;">Welcome to SellBuyPlay Community</h1>
              <p>Please follow <a href="${process.env.WEB_URI}/verify-email/${token._id}">this link</a> to confirm your email.</p>
          </div>
      </div>
      `,
  });

  res.status(204).end();
});

export default handler;
