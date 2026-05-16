type MediaItem = { url: string; type: "image" | "video" };

export async function sendStoryAlert(story: {
  name: string;
  email?: string;
  title: string;
  mission: string;
  narrative: string;
  media: MediaItem[];          
}) {
  const mediaHtml = story.media.length > 0 ? `
    <div style="margin:24px 0">
      <p style="color:#64748b;font-size:11px;font-family:monospace;
                text-transform:uppercase;letter-spacing:0.2em;margin-bottom:12px">
        Attachments (${story.media.length})
      </p>
      <div style="display:flex;flex-wrap:wrap;gap:10px">
        ${story.media.map((m) =>
          m.type === "image"
            ? `<a href="${m.url}" target="_blank" style="display:block;text-decoration:none">
                <img
                  src="${m.url}"
                  width="180"
                  style="height:120px;object-fit:cover;border-radius:8px;
                         border:1px solid rgba(255,255,255,0.08);display:block"
                  alt="Submitted image"
                />
               </a>`
            : `<a href="${m.url}" target="_blank"
                  style="display:flex;align-items:center;justify-content:center;
                         width:180px;height:120px;background:#0f172a;border-radius:8px;
                         border:1px solid rgba(56,189,248,0.15);text-decoration:none;
                         flex-direction:column;gap:8px">
                <span style="font-size:28px">🎬</span>
                <span style="color:#38bdf8;font-size:10px;font-family:monospace;
                             text-transform:uppercase;letter-spacing:0.1em">
                  View Video
                </span>
               </a>`
        ).join("")}
      </div>
    </div>
  ` : "";

  await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "api-key": process.env.BREVO_API_KEY!,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      sender: { name: "Eternal Mission", email: "vjoshii822@gmail.com" },
      to: [{ email: "thechallengermemories@gmail.com", name: "Vivek" }],
      subject: `New Story — "${story.title}"`,
      htmlContent: `
        <div style="font-family:sans-serif;max-width:600px;margin:auto;
                    background:#0a0f1d;color:#e2e8f0;padding:32px;border-radius:12px">
          <h2 style="color:#38bdf8;margin-bottom:4px">New Archive Entry</h2>
          <p style="color:#64748b;font-size:12px;margin-top:0">
            Mission: ${story.mission.toUpperCase()}
          </p>

          <table style="width:100%;border-collapse:collapse;margin:24px 0">
            <tr>
              <td style="color:#64748b;padding:8px 0;font-size:12px;width:120px">FROM</td>
              <td style="color:#e2e8f0">${story.name}</td>
            </tr>
            <tr>
              <td style="color:#64748b;padding:8px 0;font-size:12px">EMAIL</td>
              <td style="color:#e2e8f0">${story.email || "—"}</td>
            </tr>
            <tr>
              <td style="color:#64748b;padding:8px 0;font-size:12px">TITLE</td>
              <td style="color:#e2e8f0">${story.title}</td>
            </tr>
          </table>

          <div style="background:#0f172a;border-left:3px solid #38bdf8;
                      padding:16px;border-radius:4px;margin-bottom:24px">
            <p style="color:#94a3b8;font-size:13px;line-height:1.6;margin:0">
              ${story.narrative.slice(0, 300)}${story.narrative.length > 300 ? "…" : ""}
            </p>
          </div>

          ${mediaHtml}
        </div>
      `,
    }),
  });
}