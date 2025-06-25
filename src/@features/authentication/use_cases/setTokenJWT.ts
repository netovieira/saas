import { cookies } from "next/headers";

export async function setTokenJWT(token: string) {
  const cookieStore = await cookies();

  cookieStore.set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 30 * 24 * 60 * 60, // 30 dias
  });

  console.log("🔍 Cookie salvo:", token);
}
