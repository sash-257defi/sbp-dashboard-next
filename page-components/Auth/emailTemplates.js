export const EmailTemplates = (
  token
) => ` <div style="width:100%;padding:20px;height:100%;text-align: center;background:#000;">
    <div style="width:400px;border:1px solid #3e3e3e;border-radius:10px;padding:10px;margin: auto;color:white">
      <div style="text-align:center">
        <img
          src="https://sash-257defi.github.io/sbpm-media/sbp-logo.png"
          alt="Red dot"
          width="100px"
        />
      </div>
      <h1 style="font-size: 21px;margin-top: 10px;margin-bottom: 10px;">
        Welcome to SellBuyPlay Community
      </h1>
      <p>
        Please follow
        <a href="${process.env.WEB_URI}/verify-email/${token._id}">this link</a>
        to confirm your email.
      </p>
    </div>
  </div>`;
