'use server'

import type { AuthUser } from '@features/authentication/entities/AuthUser'
import { getUserId } from '@features/authentication/use_cases/getUserId'


export interface ChangePasswordResponse {
  message: string,
  isSuccess: boolean,
  data: AuthUser | null
}


export async function changePassword(oldPassword: string, newPassword: string) : Promise<ChangePasswordResponse>  {

  const userId = getUserId();


  const _ = await fetch(`${process.env.NEXT_PUBLIC_ESM_API_URL}/User/${userId}/password?oldPassword=${oldPassword}&newPassword=${newPassword}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", "Internal-Key": process.env.NEXT_PUBLIC_INTERNAL_KEY ?? "NEXT_PUBLIC_INTERNAL_KEY IS EMPTY" },
  })

  const response: ChangePasswordResponse = (await _.json()) as ChangePasswordResponse

  console.log('response', response)

  return response
}
