import { redirect } from "next/navigation";
import { WORKSPACE_ORIGIN } from "@/lib/constants";

/** Marketing-site entry for the product: https://www.skoutai.io/app */
export default function AppLoginRedirect() {
  redirect(`${WORKSPACE_ORIGIN}/`);
}
