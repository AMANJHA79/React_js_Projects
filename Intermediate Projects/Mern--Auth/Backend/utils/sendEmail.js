import { transactionalEmailApi } from "../brevo/brevo.config.js";

const sendEmail = async (to, subject, htmlContent) => {
  const sender = {
    name: "Aman jha",
    email: "jhaa09156@gmail.com", // must be verified in Brevo
  };

  try {
    await transactionalEmailApi.sendTransacEmail({
      sender,
      to: [{ email: to }],
      subject,
      htmlContent,
    });

    console.log(`Email sent to ${to}`);
  } catch (error) {
    console.error("Email send failed:", error);
    throw error;
  }
};

export default sendEmail;
