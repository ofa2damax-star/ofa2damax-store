import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

function buildEmail(to, childName, items) {
  const itemList = items.map(item => `  • ${item}`).join('\n');
  const body = [
    `Hi there!`,
    ``,
    `Great news — your order for ${childName} has been marked as PICKED UP / DELIVERED! 🎉`,
    ``,
    `Items delivered:`,
    itemList,
    ``,
    `Thank you for being part of the OFA2DAMAX family. Go Cougars! 🐆`,
    ``,
    `— OFA2DAMAX Team`,
    `   Kearns High School`,
    `   📞 (801) 529-8857 | ofa2damax@gmail.com`,
  ].join('\n');

  const subject = `Your order for ${childName} is ready! 📦`;

  // Build RFC 2822 message
  const message = [
    `From: OFA2DAMAX <ofa2damax@gmail.com>`,
    `To: ${to}`,
    `Subject: ${subject}`,
    `MIME-Version: 1.0`,
    `Content-Type: text/plain; charset=UTF-8`,
    ``,
    body,
  ].join('\r\n');

  // Base64url encode
  return btoa(unescape(encodeURIComponent(message)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    const { submissionId, childName, items, recipientEmail } = await req.json();

    if (!recipientEmail) {
      return Response.json({ error: 'No email address found for this student.' }, { status: 400 });
    }

    const { accessToken } = await base44.asServiceRole.connectors.getConnection('gmail');

    const raw = buildEmail(recipientEmail, childName, items);

    const res = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/messages/send', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ raw }),
    });

    if (!res.ok) {
      const err = await res.text();
      return Response.json({ error: err }, { status: 500 });
    }

    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});