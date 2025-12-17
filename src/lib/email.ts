import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function sendResumeDownloadNotification(data: {
  ipAddress: string;
  country?: string;
  location?: string;
  userAgent?: string;
  downloadedAt: Date;
}) {
  const contactEmail = process.env.CONTACT_EMAIL || "ollololl.ollooloo@gmail.com";
  
  if (!resend) {
    return { success: false, error: "RESEND_API_KEY not configured" };
  }

  try {
    const { data: emailData, error } = await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>",
      to: contactEmail,
      subject: "Resume Downloaded",
      html: `
        <h2>Resume Download Notification</h2>
        <p>Someone downloaded your resume!</p>
        <ul>
          <li><strong>IP Address:</strong> ${data.ipAddress}</li>
          <li><strong>Country:</strong> ${data.country || "Unknown"}</li>
          <li><strong>Location:</strong> ${data.location || "Unknown"}</li>
          <li><strong>User Agent:</strong> ${data.userAgent || "Unknown"}</li>
          <li><strong>Downloaded At:</strong> ${data.downloadedAt.toISOString()}</li>
        </ul>
      `,
    });

    if (error) {
      return { success: false, error };
    }

    return { success: true, data: emailData };
  } catch (error) {
    return { success: false, error };
  }
}

export async function sendContactFormEmail(data: {
  name: string;
  email: string;
  message: string;
  ipAddress?: string;
  country?: string;
}) {
  const contactEmail = process.env.CONTACT_EMAIL || "ollololl.ollooloo@gmail.com";
  
  if (!resend) {
    return { success: false, error: "RESEND_API_KEY not configured" };
  }

  try {
    const { data: emailData, error } = await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>",
      to: contactEmail,
      replyTo: data.email,
      subject: `New Contact Form Message from ${data.name}`,
      html: `
        <h2>New Contact Form Message</h2>
        <p><strong>From:</strong> ${data.name} (${data.email})</p>
        ${data.country ? `<p><strong>Location:</strong> ${data.country}</p>` : ""}
        <hr />
        <h3>Message:</h3>
        <p style="white-space: pre-wrap;">${data.message}</p>
        <hr />
        <p style="color: #666; font-size: 12px;">
          IP Address: ${data.ipAddress || "Unknown"}
        </p>
      `,
    });

    if (error) {
      return { success: false, error };
    }

    return { success: true, data: emailData };
  } catch (error) {
    return { success: false, error };
  }
}
