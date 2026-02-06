// Email service via Resend API

export async function sendOtpEmail(email, code, apiKey) {
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      from: 'OSI Trainer <noreply@ositrainer.com>',
      to: [email],
      subject: `Your verification code: ${code}`,
      html: `
        <div style="font-family: sans-serif; max-width: 400px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #3b82f6;">OSI Trainer</h2>
          <p>Your verification code is:</p>
          <div style="font-size: 32px; font-weight: bold; letter-spacing: 4px; text-align: center; padding: 20px; background: #f1f5f9; border-radius: 8px; margin: 16px 0;">
            ${code}
          </div>
          <p style="color: #64748b; font-size: 14px;">This code expires in 5 minutes. If you didn't request this, please ignore this email.</p>
        </div>
      `
    })
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Email send failed: ${response.status} ${err}`);
  }

  return true;
}
