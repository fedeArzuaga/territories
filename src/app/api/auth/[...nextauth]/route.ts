import { prisma } from "@/lib/prisma";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const userFromDatabase = await prisma.user.findUnique({
            where: {
                email: credentials?.email
            }
        });
        
        if ( (credentials?.email === userFromDatabase?.email) && userFromDatabase?.password && credentials?.password ) {
            const isPasswordValid = await bcrypt.compare( credentials?.password, userFromDatabase?.password );
            if ( isPasswordValid ) {
                return {
                    ...userFromDatabase,
                    passwordHash: undefined
                };
            }
        }

        return null;
      }
    })
  ],
  pages: {
    signIn: '/auth/signin', // Custom login page
  }
}

const handler = NextAuth( authOptions );

export { handler as GET, handler as POST };