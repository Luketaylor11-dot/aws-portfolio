export { COOKIE_NAME, ONE_YEAR_MS } from "@shared/const";

/** CV PDF — file must live in `public/` (e.g. copy from `resources/Luke Taylor CV 2026.pdf` when updating). */
export const CV_DOWNLOAD_URL = "/Luke-Taylor-CV-2026.pdf" as const;
export const CV_DOWNLOAD_FILENAME = "Luke-Taylor-CV-2026.pdf" as const;

/**
 * Floating Bedrock knowledge assistant.
 * Default: **on** (so production builds without `.env` still show it).
 * Set `VITE_ENABLE_KNOWLEDGE_ASSISTANT=false` before `npm run build` to hide.
 */
export const ENABLE_KNOWLEDGE_ASSISTANT =
  import.meta.env.VITE_ENABLE_KNOWLEDGE_ASSISTANT !== "false";

// Generate login URL at runtime so redirect URI reflects the current origin.
export const getLoginUrl = () => {
  const oauthPortalUrl = import.meta.env.VITE_OAUTH_PORTAL_URL;
  const appId = import.meta.env.VITE_APP_ID;
  const redirectUri = `${window.location.origin}/api/oauth/callback`;
  const state = btoa(redirectUri);

  const url = new URL(`${oauthPortalUrl}/app-auth`);
  url.searchParams.set("appId", appId);
  url.searchParams.set("redirectUri", redirectUri);
  url.searchParams.set("state", state);
  url.searchParams.set("type", "signIn");

  return url.toString();
};
