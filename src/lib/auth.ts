import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { db } from "~/server/db"
import { uploadAvatar } from "./userAvatar"
export const { handlers, signIn, signOut, auth} = NextAuth({providers: [Google],

  callbacks: {
    async signIn({ user }) {
      if (!user.email) return false;

      let existingUser = await db.user.findUnique({
        where: { email: user.email },
      });

      if (!existingUser) {

        existingUser = await db.user.create({
          data: {
            name: user.name!,
            email: user.email!,
            avatar: "", 
          },
        });

     
        if (user?.image) {
          try {
            const s3Url = await uploadAvatar(existingUser.id, user.image);
            
            await db.user.update({
              where: { id: existingUser.id },
              data: { avatar: s3Url },
            });
          } catch (err) {
            console.error("Avatar upload failed", err);
          }
        }
      }

      return true;
    },

    async session({ session }) {
      if (session.user?.email) {
        const dbUser = await db.user.findUnique({
          where: { email: session.user.email },
        });
        if (dbUser) {
          session.user.id = dbUser.id;
          session.user.image = dbUser.avatar;
        }
      }
      return session;
    },
  },
})