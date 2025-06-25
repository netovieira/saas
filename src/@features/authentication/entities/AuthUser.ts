export interface AuthUser {
  id: string;
  name?: string;
  password: string;
  email: string;

  firstAccess?: boolean;
}
