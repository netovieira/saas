import type { AuthUser } from '@features/authentication/entities/AuthUser'
import type { AuthCompany } from '@features/authentication/entities/AuthCompany'

export interface AuthenticatedUser extends AuthUser {
  company: AuthCompany
  id: string
  roles: []
}

