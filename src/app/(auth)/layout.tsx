import { redirect } from "next/navigation";
import { getSession } from "~/app/actions/auth";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  if (session?.user) redirect("/");

  return <>{children}</>;
}
