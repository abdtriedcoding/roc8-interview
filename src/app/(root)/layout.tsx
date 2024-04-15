import { redirect } from "next/navigation";
import { getSession } from "~/app/actions/auth";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  const user = session?.user;
  if (!user) redirect("/login");

  return <>{children}</>;
}
