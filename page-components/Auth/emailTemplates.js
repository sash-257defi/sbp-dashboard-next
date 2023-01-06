export const EmailTemplates = (
  token,
  userName
) => `<div style="width:100%;height:100%;background:#eeeeee;">
<table border="0" cellpadding="0" width="100%">
	<tbody>
		<tr>
			<td bgcolor="#eeeeee" align="center" style="padding: 40px 15px;">
				<table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px;">
					<tbody>
						<tr>
               <td bgcolor="#000000" align="center" style="padding: 70px 30px 30px; background-color: #000000 !important;">
                  <a href="#">
                      <img src="https://sash-257defi.github.io/sbpm-media/sbp-logo.png" width="200" border="0" style="display: block;" alt="SellBuyPlay"/>
                  </a>
                  <p style="padding: 60px 3% 0px;margin: 0px 20px 20px !important;font-family: 'IBM Plex Sans', Arial, sans-serif; font-size: 16px; color: #ffffff;">Hello ${userName}</p>
                  <p style="padding-left: 3%; padding-right: 3%; font-family: 'IBM Plex Sans', Arial, sans-serif; font-size: 36px; line-height: 1.25 ; color: #ffffff; font-weight: 600;">Welcome to SellBuyPlay Community!</p>
                </td>
            </tr>
						<tr>
                <td bgcolor="#ffffff" align="center" style="padding: 40px 30px 10px 30px;">
                    <p style="font-family: 'IBM Plex Sans', Arial, sans-serif; color: #000000; font-size: 16px; font-weight: normal; line-height: 24px; margin: 0px;">Please click the link below to verify your email</p>
                </td>
            </tr>
						<tr>
                <td bgcolor="#ffffff" align="center" style="padding: 20px 30px 40px; color: #333333; font-family: 'IBM Plex Sans', Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px;">
                     <a href="${process.env.WEB_URI}/verify-email/${token._id}" style="text-decoration: none;text-align: center;line-height: 24px;padding: 5px 15px;display: inline-block;font-weight: 500;font-family: 'IBM Plex Sans', Arial, sans-serif;font-size: 14px;border-radius: 4px;overflow: visible;border: 0;color: #ffffff;background: #ed2228;cursor: pointer">
                        <span>Verify Email</span>
                     </a>
                </td>
            </tr>
					</tbody>
				</table >
			</td>
		</tr>
		<tr>
       <td bgcolor="#eeeeee" align="center" style="padding: 0 10px;">
           <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px;">
               <tbody>
                   <tr>
            	         <td align="center" style="padding: 0 20px 20px; color: #ffffff; font-family: 'IBM Plex Sans', Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; line-height: 18px;">
                          <p style="margin: 0;">
                              <a href="#" style="text-decoration: none;padding:0 3px">
                                <img src="https://sash-257defi.github.io/sbpm-media/twitter-dark.png" width="32" alt="SellBuyPlay on Twitter" title="SellBuyPlay on Twitter"/>
                              </a>
                              <a href="#" style="text-decoration: none;padding:0 3px">
                                <img src="https://sash-257defi.github.io/sbpm-media/facebook-dark.png" width="32" alt="SellBuyPlay on Facebook" title="SellBuyPlay on facebook"/>
                              </a>
                              <a href="#" style="text-decoration: none;padding:0 3px">
                                <img src="https://sash-257defi.github.io/sbpm-media/instagram-dark.png" width="32" alt="SellBuyPlay on Instagram" title="SellBuyPlay on Instagram"/>
                              </a>
                              <a href="#" style="text-decoration: none;padding:0 3px">
                                <img src="https://sash-257defi.github.io/sbpm-media/reddit-dark.png" width="32" alt="SellBuyPlay on Reddit" title="SellBuyPlay on Reddit"/>
                              </a>
                              <a href="#" style="text-decoration: none;padding:0 3px">
                                <img src="https://sash-257defi.github.io/sbpm-media/telegram-dark.png" width="32" alt="SellBuyPlay on Telegram" title="SellBuyPlay on Telegram"/>
                              </a>
                              <a href="#" style="text-decoration: none;padding:0 3px">
                                <img src="https://sash-257defi.github.io/sbpm-media/youtube-dark.png" width="32" alt="SellBuyPlay on Youtube" title="SellBuyPlay on Youtube"/>
                              </a>
                          </p>
                       </td>
                   </tr>
                   <tr>
                      <td align="center" valign="top" style="padding: 0 30px 40px;">
                          <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px;" width="100%">
                              <tbody>
                                  <tr>
                                      <td bgcolor="#eeeeee" align="center" style="padding: 18px 0 0;color: #646464;font-family: 'IBM Plex Sans', Arial, sans-serif;font-size: 12px;font-weight: 500;line-height: 16px;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;">
                                          <p style="font-family: 'IBM Plex Sans', Arial, sans-serif; color: #646464; font-size: 12px; font-weight: 500; line-height: 16px; margin: 0px 0px 5px;">
                                          © 2023 SellBuyPlay | All rights reserved.
                                          </p>
                                          <p style="font-family: 'IBM Plex Sans', Arial, sans-serif; color: #646464; font-size: 12px; font-weight: 500; line-height: 16px; margin: 5px 0px 0px;">
                                              <a href="#" style="color: #ed2228 !important;padding:0 5px">Privacy</a>|
                                              <a href="#" style="color: #ed2228 !important;padding:0 5px">Terms and conditions</a>|
                                              <a href="#" style="color: #ed2228 !important;padding:0 5px">Whitepaper</a>
                                          </p>
                                      </td>
                                  </tr>
                              </tbody>
                          </table>
                      </td>
                   </tr>
                </tbody>
           </table>
       </td>
    </tr>
	</tbody>
</tabel>
</div>`;
