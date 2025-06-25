'use server'

import type { AuthUser } from '@features/authentication/entities/AuthUser'
import { InvalidCredentialsError } from '@features/authentication/errors/invalid_credentials_error'
import { setTokenJWT } from '@features/authentication/use_cases/setTokenJWT'

// {
//   "UserId": "01969d7c-8719-7399-93ad-042ee75d5244",
//   "nbf": 1746577082,
//   "exp": 1746580682,
//   "iat": 1746577082,
//   "iss": "ESM",
//   "aud": "ESM"
// }

export interface onLoginProps extends Omit<AuthUser, 'id'> {
}

export async function onSignIn({ email, password }: onLoginProps) : Promise<AuthUser>  {
  const res = await fetch(`${process.env.NEXT_PUBLIC_ESM_API_URL}/Account/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res)  {
    throw new Error("Failed to get account!");
  }

  if (res.status === 200) {
    const data = await res.json();


    await setTokenJWT(data.data.token)

    return {
      id: data.UserId,
      firstAccess: !data.data.displayName,
    } as AuthUser;
  }

  throw new InvalidCredentialsError(res.status);
}
