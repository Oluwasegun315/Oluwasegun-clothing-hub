import { redirect } from "next/navigation";

/** Legacy URL — account dashboard lives at /account */
export default function ProfileRedirect() {
  redirect("/account");
}
