'use server'

import type { AuthUser } from '@features/authentication/entities/AuthUser'
import { getUserId } from '@features/authentication/use_cases/getUserId'


export interface SetNameResponse {
  message: string,
  isSuccess: boolean,
  data: AuthUser | null
}


export async function setName(newName: string) : Promise<SetNameResponse>  {

  const userId = getUserId();

  const firstName = newName.split(' ')[0]
  const lastName = newName.split(' ').slice(1).join(' ')


  const _ = await fetch(`${process.env.NEXT_PUBLIC_ESM_API_URL}/User/${userId}/setName`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", "Internal-Key": process.env.NEXT_PUBLIC_INTERNAL_KEY ?? "NEXT_PUBLIC_INTERNAL_KEY IS EMPTY" },
    body: JSON.stringify({ firstName, lastName }),
  })

  const response: SetNameResponse = (await _.json()) as SetNameResponse

  console.log('response', response)

  return response
}
