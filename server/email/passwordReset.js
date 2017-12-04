const passwordReset = url => (`
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta http-equiv="content-type" content="text/html; charset=utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0;">
 	<meta name="format-detection" content="telephone=no"/>
	<style>
/* Reset styles */ 
body { margin: 0; padding: 0; min-width: 100%; width: 100% !important; height: 100% !important;}
body, table, td, div, p, a { -webkit-font-smoothing: antialiased; text-size-adjust: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; line-height: 100%; }
table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-collapse: collapse !important; border-spacing: 0; }
img { border: 0; line-height: 100%; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; }
#outlook a { padding: 0; }
.ReadMsgBody { width: 100%; } .ExternalClass { width: 100%; }
.ExternalClass, .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td, .ExternalClass div { line-height: 100%; }

/* Rounded corners for advanced mail clients only */ 
@media all and (min-width: 560px) {
	.container { border-radius: 8px; -webkit-border-radius: 8px; -moz-border-radius: 8px; -khtml-border-radius: 8px;}
}

/* Set color for auto links (addresses, dates, etc.) */ 
a, a:hover {
	color: #127DB3;
}
.footer a, .footer a:hover {
	color: #999999;
}

 	</style>
</head>

<!-- BODY -->
<body topmargin="0" rightmargin="0" bottommargin="0" leftmargin="0" marginwidth="0" marginheight="0" width="100%" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; width: 100%; height: 100%; -webkit-font-smoothing: antialiased; text-size-adjust: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; line-height: 100%;
	background-color: #F0F0F0;
	color: #000000;"
	bgcolor="#F0F0F0"
	text="#000000">

<!-- SECTION / BACKGROUND -->
<table width="100%" align="center" border="0" cellpadding="0" cellspacing="0" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; width: 100%;" class="background"><tr><td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0;"
	bgcolor="#F0F0F0">

<!-- WRAPPER -->
<table border="0" cellpadding="0" cellspacing="0" align="center"
	width="560" style="border-collapse: collapse; border-spacing: 0; padding: 0; width: inherit;
	max-width: 560px;" class="wrapper">

	<tr>
		<td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%;
			padding-top: 20px;
			padding-bottom: 20px;">

			<!-- LOGO -->
			<a target="_blank" style="text-decoration: none;"
				href="https://github.com/gaeduron/Matcha"><img border="0" vspace="0" hspace="0"
				src="https://lh3.googleusercontent.com/prJEQhsLoHvLCxkCp5NNDoWfXj73jGczZLJlk3SjuzunR_9szTSqO9M9QEz-2kklTJYGM-zYUgvGT0Fm2EiZuk4yp6aArQxle251XOnarbXPAwSpuxH4J0TklcFFLahnDQdqmzoc3K3Luam20q37fNyr6MBCluvcIPuRww3glhBYHMaC4OPlNzE2cSl_JqHTi5kvke2nwRWGlRQFnnQRPGeoVMN0GPe9AwCjRuZL-LWjcoiiUnuWnZLUbY0B1l9cQx6DMRrLN8WKfU0L1vNKOsL0vqrFG26jRtmcLMFP8p8iKtV1TErxDohrV_SO9Ay1HxdBSANXw3jTvYN4dopnQz2dYjjYlFlRntdacVcE8Iqh4djpMvCK2ILzuzxSmj_ujPM49ckLqw_YrPf5HW7SE85ok_EQFhp5NN1Jkh65IaPsdBAIhiKnbssCLLkun4TCX6AzriIj6n_dJWLsKpuK1lHrCSOZR1A-hRCZyA5_tkWjcY2PaQF1VXuFHNmcq-EdonGyf3vb-a8Si9U5FyjIgIl5IngZOcNMFaRg-UElSnUm9RQJkckKTuu47xMw-eDj=w1239-h1366"
				width="100"
				alt="Logo" title="Logo" style="
				color: #000000;
				font-size: 10px; margin: 0; padding: 0; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; border: none; display: block; border-radius: 50px" /></a>

		</td>
	</tr>

<!-- End of WRAPPER -->
</table>

<!-- WRAPPER / CONTEINER -->
<table border="0" cellpadding="0" cellspacing="0" align="center"
	bgcolor="#FFFFFF"
	width="560" style="border-collapse: collapse; border-spacing: 0; padding: 0; width: inherit;
	max-width: 560px;" class="container">

	<!-- HEADER -->
	<tr>
		<td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%; font-size: 24px; font-weight: bold; line-height: 130%;
			padding-top: 25px;
			color: #000000;
			font-family: sans-serif;" class="header">
				Matcha - Password Reset Request
		</td>
	</tr>
	
	<!-- PARAGRAPH -->
	<tr>
		<td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%; font-size: 17px; font-weight: 400; line-height: 160%;
			padding-top: 25px; 
			color: #000000;
			font-family: sans-serif;" class="paragraph">
			To reset your password, click the following link and follow the instructions.
		</td>
	</tr>
	<tr>
		<td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%;
			padding-top: 25px;
			padding-bottom: 5px;" class="button"><a
			href="${url}" target="_blank" style="text-decoration: none;">
				<table border="0" cellpadding="0" cellspacing="0" align="center" style="max-width: 240px; min-width: 120px; border-collapse: collapse; border-spacing: 0; padding: 0;"><tr><td align="center" valign="middle" style="padding: 12px 24px; margin: 0; text-decoration: none; border-collapse: collapse; border-spacing: 0; border-radius: 4px; -webkit-border-radius: 4px; -moz-border-radius: 4px; -khtml-border-radius: 4px;"
					bgcolor="#E7136F"><a target="_blank" style="text-decoration: none;
					color: #FFFFFF; font-family: sans-serif; font-size: 17px; font-weight: 400; line-height: 120%;"
					href="${url}">
						Reset Password
					</a>
			</td></tr></table></a>
		</td>
	</tr>

	<!-- FOOTER -->
	<tr>
		<td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%; font-size: 13px; font-weight: 400; line-height: 150%;
			padding-top: 20px;
			padding-bottom: 20px;
			color: #999999;
			font-family: sans-serif;" class="footer">

				This email template was sent to you by Matcha.com

		</td>
	</tr>

<!-- End of WRAPPER -->
</table>

<!-- End of SECTION / BACKGROUND -->
</td></tr></table>

</body>
</html>
`);

module.exports = passwordReset;
