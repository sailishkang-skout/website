/** AWS web origin. Used when Vercel env is missing or not a real URL. */
export const AWS_WEB_ORIGIN = "https://ckoy6iywm0.execute-api.us-east-1.amazonaws.com";

function resolveWorkspaceOrigin(): string {
  const raw = String(process.env.NEXT_PUBLIC_WORKSPACE_URL ?? "").trim();
  if (!/^https?:\/\//i.test(raw)) return AWS_WEB_ORIGIN;
  try {
    const url = new URL(raw);
    if (/skoutai\.io$/i.test(url.hostname)) return AWS_WEB_ORIGIN;
    return url.origin;
  } catch {
    return AWS_WEB_ORIGIN;
  }
}

/** Product UI is served under /app on the marketing domain — never bounce to API Gateway. */
export const WORKSPACE_ORIGIN = resolveWorkspaceOrigin();

export const APP_PATH = "/app";

export const LOGIN_URL = "/app/signin";

export const WORKSPACE_URL = "/app";
