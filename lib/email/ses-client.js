const AWS = require("aws-sdk");

const config = require("../config");

require("dotenv").config();

const createVerifyEmail = require("./templates/verifyEmail");
const resendVerifyEmail = require("./templates/resendVerify");
const createPasswordReset = require("./templates/passwordRecover");

AWS.config.update({
	accessKeyId: config.aws.key,
	secretAccessKey: config.aws.secret,
	region: config.aws.ses.region,
});

const ses = new AWS.SES({ apiVersion: "2010-12-01" });

const myMail = (to, subject, message, from) => {
	const params = {
		Destination: {
			ToAddresses: [to],
		},
		Message: {
			Body: {
				Html: {
					Charset: "UTF-8",
					Data: message,
				},
				/* replace Html attribute with the following if you want to send plain text emails.
                Text: {
                    Charset: "UTF-8",
                    Data: message
                }
             */
			},
			Subject: {
				Charset: "UTF-8",
				Data: subject,
			},
		},
		ReturnPath: from ? from : config.aws.ses.from.default,
		Source: from ? from : config.aws.ses.from.default,
	};

	ses.sendEmail(params, (err, data) => {
		if (err) {
			return console.log(err, err.stack);
		} else {
			console.log("Email sent.", data);
		}
	});
};

module.exports = { createVerifyEmail, resendVerifyEmail, createPasswordReset, myMail };
