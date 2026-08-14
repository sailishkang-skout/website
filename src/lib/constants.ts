/** Product UI is served under /app on the marketing domain. */
export const WORKSPACE_ORIGIN = (
  process.env.NEXT_PUBLIC_WORKSPACE_URL ||
  "https://ckoy6iywm0.execute-api.us-east-1.amazonaws.com"
).replace(/\/$/, "");

export const APP_PATH = "/app";

export const LOGIN_URL = "/app/login";

export const WORKSPACE_URL = "/app";
