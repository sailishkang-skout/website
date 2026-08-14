/** Public product workspace (API Gateway + web UI today). */
export const WORKSPACE_ORIGIN = (
  process.env.NEXT_PUBLIC_WORKSPACE_URL ||
  "https://ckoy6iywm0.execute-api.us-east-1.amazonaws.com"
).replace(/\/$/, "");

/** Same-origin login path on skoutai.io — redirects into the workspace. */
export const APP_PATH = "/app";

export const LOGIN_URL = APP_PATH;

export const WORKSPACE_URL = APP_PATH;
