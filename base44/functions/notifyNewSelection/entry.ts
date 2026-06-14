import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

const CATEGORY_LABELS = {
  hygiene: "🧼 Hygiene",
  clothes: "👕 Clothes",
  feminine_hygiene: "🌸 Feminine Hygiene",
  school_clothes: "🏫 School Clothes",
};

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const body = await req.json();

    const selection = body.data;
    if (!selection) {
      return Response.json({ error: "No data provided" }, { status: 400 });
    }

    const childName = selection.child_name || "Unknown Student";
    const category = CATEGORY_LABELS[selection.category] || selection.category || "Unknown";
    const items = (selection.items || []).join(", ") || "None";
    const submittedAt = new Date().toLocaleString("en-US", { timeZone: "America/Denver" });

    const subject = `🛍️ New Request from ${childName} — ${category}`;
    const body_html = `
<h2>New OFA2DAMAX Request</h2>
<p><strong>Student:</strong> ${childName}</p>
<p><strong>Category:</strong> ${category}</p>
<p><strong>Items Requested:</strong> ${items}</p>
<p><strong>Submitted:</strong> ${submittedAt} (MT)</p>
<hr/>
<p><a href="https://app.base44.com">View in Command Center</a></p>
    `.trim();

    await base44.asServiceRole.integrations.Core.SendEmail({
      to: "ofa2damax@gmail.com",
      subject,
      body: body_html,
    });

    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});