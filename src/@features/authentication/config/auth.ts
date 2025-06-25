import type { NextAuthOptions } from 'next-auth'

import CredentialProvider from "next-auth/providers/credentials";

import { onSignIn } from '@features/authentication/use_cases/onSignIn'


export const
  authOptions: NextAuthOptions = {
  debug: true,
  providers: [
    CredentialProvider({
      credentials: {},
      name: "Credentials",
      type: "credentials",
      async authorize(credentials) {
        const { email, password } = credentials as { password: string, email: string };

        return await onSignIn({ email, password });
      }
    })
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  pages: {
    // signIn: "/login",
  },
  callbacks: {
    async jwt({ token } : { token: any }) {
      console.log('token', token);

      return token;
    },
    async session({ session } : { session: any } ) {
      return session;
    },
  }
};
