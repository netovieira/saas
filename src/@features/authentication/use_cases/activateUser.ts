'use server'
import type { AuthUser } from '@features/authentication/entities/AuthUser'
import { getUserId } from '@features/authentication/use_cases/getUserId'


export interface ActivateUserResponse {
  message: string,
  isSuccess: boolean,
  data: AuthUser | null
}


export async function activateUser() : Promise<ActivateUserResponse>  {

  const userId = await getUserId()


  const _ = await fetch(`${process.env.NEXT_PUBLIC_ESM_API_URL}/User/${userId}/activate`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", "Internal-Key": process.env.NEXT_PUBLIC_INTERNAL_KEY ?? "NEXT_PUBLIC_INTERNAL_KEY IS EMPTY" },
  })

  const response: ActivateUserResponse = (await _.json()) as ActivateUserResponse

  console.log('response', response)

  return response
}
