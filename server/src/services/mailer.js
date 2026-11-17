// Sends the owner's login code with Resend (https://resend.com).
const RESEND_ENDPOINT = 'https://api.resend.com/emails';

export const mailConfigured = Boolean(process.env.RESEND_API_KEY);

export async function sendLoginCode(to, code) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM ?? 'Mahadharshni Herblab <onboarding@resend.dev>';
  if (!apiKey) throw new Error('RESEND_API_KEY is not set in server/.env');

  const res = await fetch(RESEND_ENDPOINT, {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from,
      to: [to],
      subject: `Herblab owner login code: ${code}`,
      html: `
        <div style="font-family:system-ui,sans-serif;color:#28301C;line-height:1.6">
          <h2 style="color:#323D25">Mahadharshni Herblab – owner login</h2>
          <p>Your one-time login code is:</p>
          <p style="font-size:32px;letter-spacing:8px;font-weight:700;color:#9A7E3B">${code}</p>
          <p>The code expires in 10 minutes. If you did not try to sign in, someone else may have your password – change it.</p>
        </div>`
    })
  });

  if (!res.ok) {
    const detail = (await res.text()).slice(0, 400);
    throw new Error(`Resend rejected the message (${res.status}): ${detail}`);
  }
}
