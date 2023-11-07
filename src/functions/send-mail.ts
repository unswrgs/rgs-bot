import sgMail from "@sendgrid/mail";
import { config } from "../config";

export const sendVerificationEmail = (
    email: string,
    username: string,
    code: string
) => {
    sgMail.setApiKey(config.SENDGRID_API_KEY);

    const mailContent = `
  <div
    style="
      font-family: Helvetica, Arial, sans-serif;
      max-width: 500px;
      overflow: auto;
      line-height: 2;
    "
  >
    <div style="margin: 50px auto; width: 70%; padding: 20px 0">
      <div style="border-bottom: 1px solid #eee">
        <a
          href=""
          style="
            font-size: 1.4em;
            color: #00466a;
            text-decoration: none;
            font-weight: 600;
          "
          >UNSW Rhythm Game Society</a
        >
      </div>
      <p style="font-size: 1.1em">Hi ${username},</p>
      <p>
        Thank you for joining UNSW Rhythm Game Society. Use the following
        Verification code to gain access to the rest of the Discord Server.
      </p>
      <h2
        style="
          background: #00466a;
          margin: 0 auto;
          width: max-content;
          padding: 0 10px;
          color: #fff;
          border-radius: 4px;
        "
      >
        ${code}
      </h2>
      <p style="font-size: 0.9em">Regards,<br />Rhythm Game Society Team</p>
      <hr style="border: none; border-top: 1px solid #eee" />
      <div
        style="
          float: right;
          padding: 8px 0;
          color: #aaa;
          font-size: 0.8em;
          line-height: 1;
          font-weight: 300;
        "
      >
        <p>UNSW Rhythm Game Society</p>
        <p>Sydney</p>
        <p>Australia</p>
      </div>
    </div>
  </div>`;

    const msg = {
        to: email,
        from: "unsw.rhythmgamesoc.noreply@gmail.com",
        subject: "Verification Code for UNSW Rhythm Games Society",
        text: `Hi ${username} Your Verfication Code is ${code}`,
        html: mailContent,
    };
    sgMail
        .send(msg)
        .then(() => {
            console.log("Email sent to " + email);
        })
        .catch((error) => {
            console.error(error);
        });
};
