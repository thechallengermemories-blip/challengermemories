import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

type MediaItem = { url: string; type: "image" | "video" };

export async function sendStoryAlert(story: {
  name: string;
  email?: string;
  title: string;
  mission: string;
  narrative: string;
  media: MediaItem[];
}) {
  const missionColor  = story.mission === "challenger" ? "#1d4ed8" : "#7c3aed";
  const missionBg     = story.mission === "challenger" ? "#eff6ff" : "#f5f3ff";
  const missionBorder = story.mission === "challenger" ? "#bfdbfe" : "#ddd6fe";

  const mediaSection = story.media.length > 0 ? `
    <tr><td style="padding:0 40px 32px">
      <p style="margin:0 0 14px;font-size:11px;font-weight:700;letter-spacing:0.12em;
                text-transform:uppercase;color:#94a3b8">
        Attachments &nbsp;·&nbsp; ${story.media.length} file${story.media.length > 1 ? "s" : ""}
      </p>
      <table cellpadding="0" cellspacing="0" border="0" width="100%"><tr>
        ${story.media.map((m) =>
          m.type === "image"
            ? `<td style="padding-right:10px;vertical-align:top;width:160px">
                <a href="${m.url}" target="_blank" style="display:block;text-decoration:none">
                  <img src="${m.url}" width="150" height="100"
                    style="display:block;border-radius:10px;object-fit:cover;
                           border:1px solid #e2e8f0" alt="Attachment" />
                </a>
               </td>`
            : `<td style="padding-right:10px;vertical-align:top;width:160px">
                <a href="${m.url}" target="_blank"
                   style="display:block;width:150px;height:100px;text-decoration:none;
                          background:#0f172a;border-radius:10px;border:1px solid #1e293b;
                          text-align:center;padding-top:28px;box-sizing:border-box">
                  <span style="font-size:26px;display:block;margin-bottom:6px">🎬</span>
                  <span style="font-size:10px;font-weight:700;letter-spacing:0.1em;
                               color:#38bdf8;text-transform:uppercase">Play video</span>
                </a>
               </td>`
        ).join("")}
      </tr></table>
    </td></tr>` : "";

  const html = `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif">

<table cellpadding="0" cellspacing="0" border="0" width="100%"
       style="background:#f1f5f9;padding:40px 0">
  <tr><td align="center">
    <table cellpadding="0" cellspacing="0" border="0" width="600"
           style="max-width:600px;width:100%">

      <!-- ── TOP BAR ── -->
      <tr><td style="background:${missionColor};border-radius:16px 16px 0 0;
                     padding:28px 40px;text-align:center">
        <p style="margin:0 0 4px;font-size:11px;font-weight:700;letter-spacing:0.2em;
                  text-transform:uppercase;color:rgba(255,255,255,0.65)">
          Eternal Mission · Admin Alert
        </p>
        <h1 style="margin:0;font-size:22px;font-weight:700;color:#ffffff;line-height:1.3">
          New Story Submitted
        </h1>
      </td></tr>

      <!-- ── BODY CARD ── -->
      <tr><td style="background:#ffffff;padding:0">

        <table cellpadding="0" cellspacing="0" border="0" width="100%">
          <tr><td style="padding:28px 40px 0">
            <span style="display:inline-block;background:${missionBg};color:${missionColor};
                         border:1px solid ${missionBorder};border-radius:100px;
                         font-size:11px;font-weight:700;letter-spacing:0.12em;
                         text-transform:uppercase;padding:5px 14px">
              ✦ &nbsp;${story.mission} Protocol
            </span>
          </td></tr>

          <tr><td style="padding:16px 40px 24px">
            <h2 style="margin:0;font-size:26px;font-weight:700;color:#0f172a;line-height:1.25">
              ${story.title}
            </h2>
          </td></tr>

          <tr><td style="padding:0 40px">
            <div style="height:1px;background:#e2e8f0"></div>
          </td></tr>

          <tr><td style="padding:24px 40px">
            <table cellpadding="0" cellspacing="0" border="0" width="100%">
              <tr>
                <td style="vertical-align:top;width:52px">
                  <div style="width:44px;height:44px;border-radius:50%;
                              background:${missionBg};border:2px solid ${missionBorder};
                              text-align:center;line-height:40px;
                              font-size:16px;font-weight:700;color:${missionColor}">
                    ${story.name.charAt(0).toUpperCase()}
                  </div>
                </td>
                <td style="vertical-align:top;padding-left:12px">
                  <p style="margin:0;font-size:16px;font-weight:700;color:#0f172a">
                    ${story.name}
                  </p>
                  <p style="margin:4px 0 0;font-size:13px;color:#64748b">
                    ${story.email || "No email provided"}
                  </p>
                </td>
                <td style="vertical-align:top;text-align:right">
                  <p style="margin:0;font-size:12px;color:#94a3b8">
                    ${new Date().toLocaleDateString("en-US", { month:"long", day:"numeric", year:"numeric" })}
                  </p>
                </td>
              </tr>
            </table>
          </td></tr>

          <tr><td style="padding:0 40px">
            <div style="height:1px;background:#e2e8f0"></div>
          </td></tr>

          <tr><td style="padding:24px 40px">
            <p style="margin:0 0 10px;font-size:11px;font-weight:700;letter-spacing:0.12em;
                      text-transform:uppercase;color:#94a3b8">The Narrative</p>
            <div style="background:#f8fafc;border-left:3px solid ${missionColor};
                        border-radius:0 10px 10px 0;padding:18px 20px">
              <p style="margin:0;font-size:15px;line-height:1.75;color:#334155">
                ${story.narrative.slice(0, 400)}${story.narrative.length > 400 ? `
                <span style="color:#94a3b8">… <a href="#" style="color:${missionColor};
                  text-decoration:none;font-weight:600">read more in dashboard</a></span>` : ""}
              </p>
            </div>
          </td></tr>

          ${story.media.length > 0 ? `
          <tr><td style="padding:0 40px">
            <div style="height:1px;background:#e2e8f0"></div>
          </td></tr>` : ""}

          ${mediaSection}

          <tr><td style="padding:0 40px">
            <div style="height:1px;background:#e2e8f0"></div>
          </td></tr>

          <tr><td style="padding:28px 40px 36px;text-align:center">
            <p style="margin:0 0 20px;font-size:13px;color:#64748b">
              Review and approve this submission from your admin dashboard.
            </p>
            <a href="https://challengerdashboard.vercel.app"
               style="display:inline-block;background:${missionColor};color:#ffffff;
                      text-decoration:none;font-size:14px;font-weight:700;
                      letter-spacing:0.04em;padding:14px 32px;border-radius:10px">
              Open Admin Dashboard →
            </a>
          </td></tr>

        </table>
      </td></tr>

      <!-- ── FOOTER ── -->
      <tr><td style="background:#f8fafc;border:1px solid #e2e8f0;
                     border-radius:0 0 16px 16px;padding:20px 40px;text-align:center">
        <p style="margin:0;font-size:12px;color:#94a3b8;line-height:1.6">
          This is an automated alert from Eternal Mission.<br>
          Sent only to authorized administrators.
        </p>
      </td></tr>

    </table>
  </td></tr>
</table>

</body>
</html>`;

  // ── Resend replaces Brevo from here ──
  const { error } = await resend.emails.send({
    from: "Eternal Mission <onboarding@resend.dev>",
    to: ["thechallengermemories@gmail.com"],
    subject: `🚀 New Story — "${story.title}" awaits review`,
    html,
  });

  if (error) {
    throw new Error(`Resend error: ${error.message}`);
  }
}