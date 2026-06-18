export function adminReplyTemplate(name: string, replyBody: string): string {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

  const paragraphs = replyBody
    .split("\n")
    .map((line) =>
      line.trim()
        ? `<p style="margin:0 0 16px;color:#374151;font-size:15px;line-height:1.75;">${line}</p>`
        : `<p style="margin:0 0 8px;">&nbsp;</p>`,
    )
    .join("");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Message from Skout AI</title>
  <!--[if mso]>
  <noscript><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml></noscript>
  <![endif]-->
</head>
<body style="margin:0;padding:0;background-color:#f3f4f6;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;">

  <!-- Preheader (hidden) -->
  <div style="display:none;max-height:0;overflow:hidden;mso-hide:all;">
    A message from the Skout AI team just for you, ${name}. &#8203;&#65279;&#8203;&#65279;&#8203;&#65279;
  </div>

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"
    style="background-color:#f3f4f6;padding:48px 16px;">
    <tr>
      <td align="center">

        <!-- Outer card -->
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0"
          style="max-width:600px;width:100%;background:#ffffff;border-radius:20px;overflow:hidden;
                 box-shadow:0 1px 3px rgba(0,0,0,0.06),0 8px 32px rgba(0,0,0,0.06);">

          <!-- ── TOP ACCENT BAR ── -->
          <tr>
            <td style="background:linear-gradient(90deg,#6366f1 0%,#8b5cf6 50%,#a78bfa 100%);height:4px;font-size:0;line-height:0;">&nbsp;</td>
          </tr>

          <!-- ── HEADER ── -->
          <tr>
            <td style="padding:40px 48px 32px;">

              <!-- Logo row -->
              <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td>
                    <a href="${appUrl}" style="text-decoration:none;display:inline-block;">
                      <img src="${appUrl}/logo.png" alt="Skout AI" height="32"
                        style="display:block;border:0;height:32px;" />
                    </a>
                  </td>
                </tr>
              </table>

              <!-- Greeting -->
              <h1 style="margin:32px 0 0;font-family:'Segoe UI',Helvetica,Arial,sans-serif;
                          font-size:24px;font-weight:700;color:#111827;letter-spacing:-0.3px;
                          line-height:1.3;">
                Hi ${name},
              </h1>
              <p style="margin:8px 0 0;font-family:'Segoe UI',Helvetica,Arial,sans-serif;
                         font-size:14px;color:#9ca3af;letter-spacing:0.1px;">
                A message from the Skout AI team
              </p>

            </td>
          </tr>

          <!-- ── DIVIDER ── -->
          <tr>
            <td style="padding:0 48px;">
              <div style="height:1px;background:#f3f4f6;"></div>
            </td>
          </tr>

          <!-- ── BODY ── -->
          <tr>
            <td style="padding:32px 48px 40px;font-family:'Segoe UI',Helvetica,Arial,sans-serif;">
              ${paragraphs}
            </td>
          </tr>

          <!-- ── SIGNATURE ── -->
          <tr>
            <td style="padding:0 48px 40px;">

              <table role="presentation" cellpadding="0" cellspacing="0" border="0"
                style="border-top:1px solid #f3f4f6;padding-top:24px;width:100%;">
                <tr>
                  <td>
                    <p style="margin:0;font-family:'Segoe UI',Helvetica,Arial,sans-serif;
                               font-size:14px;font-weight:600;color:#111827;">
                      The Skout AI Team
                    </p>
                    <p style="margin:4px 0 0;font-family:'Segoe UI',Helvetica,Arial,sans-serif;
                               font-size:13px;color:#6b7280;">
                      <a href="mailto:info@skoutai.io"
                        style="color:#6366f1;text-decoration:none;">info@skoutai.io</a>
                      &nbsp;·&nbsp;
                      <a href="${appUrl}"
                        style="color:#6366f1;text-decoration:none;">skoutai.io</a>
                    </p>
                  </td>
                  <td align="right" style="vertical-align:middle;">
                    <a href="https://linkedin.com/company/skoutai"
                      style="font-family:'Segoe UI',Helvetica,Arial,sans-serif;font-size:12px;
                             color:#6366f1;text-decoration:none;">LinkedIn</a>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- ── FOOTER ── -->
          <tr>
            <td style="background:#f9fafb;border-top:1px solid #f3f4f6;padding:20px 48px;
                        border-radius:0 0 20px 20px;">
              <p style="margin:0;font-family:'Segoe UI',Helvetica,Arial,sans-serif;
                         font-size:11px;color:#9ca3af;text-align:center;line-height:1.7;">
                You're receiving this email because you submitted a contact form at
                <a href="${appUrl}" style="color:#6366f1;text-decoration:none;">skoutai.io</a>.
                <br />
                © ${new Date().getFullYear()} Skout AI. All rights reserved.
              </p>
            </td>
          </tr>

        </table>
        <!-- /Outer card -->

      </td>
    </tr>
  </table>

</body>
</html>`;
}
