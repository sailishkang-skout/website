import { redirect } from "next/navigation";
import { WORKSPACE_ORIGIN } from "@/lib/constants";

export default function AppPathRedirect({ params }: { params: { path: string[] } }) {
  const suffix = params.path.map(encodeURIComponent).join("/");
  redirect(`${WORKSPACE_ORIGIN}/${suffix}`);
}
