import { cookies } from "next/headers";

// TODO: need to remove this because server action is taking care of this
export async function GET() {
  const cookieStore = cookies();
  cookieStore.delete("userData");
  cookieStore.delete("token");

  return new Response(null, {
    status: 200,
  });
}
