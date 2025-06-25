'use server'

import { signIn } from 'next-auth/react'

import type { AuthUser } from '@features/authentication/entities/AuthUser'



export interface OnSignUpProps extends Omit<AuthUser, 'id'> {
  autoLogin?: boolean,
}

export interface OnSignUpResponse {
  message: string,
  isSuccess: boolean,
  data: AuthUser | null
}

export async function onSignUp({ email, password, autoLogin = true }: OnSignUpProps) : Promise<OnSignUpResponse>  {


  const _ = await fetch(`${process.env.NEXT_PUBLIC_ESM_API_URL}/User`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  })

  const response: OnSignUpResponse = (await _.json()) as OnSignUpResponse

  if (response.isSuccess) {
    response.data = {
      id: _.headers.get('Location') as string,
      email,
      password,
    }

    if (autoLogin) await signIn("credentials", {
      email: email,
      password: password,
      redirect: false,
    });

  }

  return response
}
