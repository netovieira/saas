import jwt from 'jsonwebtoken'

import { getTokenJWT } from '@features/authentication/use_cases/getTokenJWT'

export async function getUserId() {
  const jwtToken = await getTokenJWT() ?? "";

  const decoded = jwt.decode(jwtToken)

  return (decoded as any).UserId

}
