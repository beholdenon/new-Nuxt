import CredentialsProvider from 'next-auth/providers/credentials'
import { NuxtAuthHandler } from '#auth'
import { users } from "../../dbModels";


export default NuxtAuthHandler({
  // A secret string you define, to ensure correct encryption
  secret: 'my-secret',
  pages: {
    // Change the default behavior to use `/login` as the path for the sign-in page
    signIn: '/login'
  },
  callbacks: {
    // Callback when the JWT is created / updated, see https://next-auth.js.org/configuration/callbacks#jwt-callback
    jwt: async ({token, user}) => {
      const isSignIn = user ? true : false;
      if (isSignIn) {
        token.jwt = user ? (user as any).access_token || '' : '';
        token.id = user ? user.id || '' : '';
        token.role = user ? (user as any).role || '' : '';
        token.email = user ? (user as any).email || '' : '';
      }
      return Promise.resolve(token);
    },
    // Callback whenever session is checked, see https://next-auth.js.org/configuration/callbacks#session-callback
    session: async ({session, token}) => {
      (session as any).user.role = token.role;
      (session as any).user.uid = token.id;
      (session as any).user.email = token.email;
      return Promise.resolve(session);
    },
  },
  providers: [
    CredentialsProvider.default({
      name: 'Credentials',
      credentials: {
        email: { label: "Email" },
        password: {  label: "Password", type: "password" }
      },
      async authorize (credentials: any) {
        if (!credentials.email || !credentials.password) {
            return null;
        }

        const userData = await users.findOne({
            email: credentials.email.toLowerCase(),
          });
          if (userData) {
            const isPasswordValid = await userData.verifyPasswordSync(credentials.password);

            console.log(isPasswordValid);
            if (isPasswordValid) {
                console.log("Password Valid");

                return await {
                    name: userData.firstName + ' ' + userData.lastName,
                    email: userData.email,
                    role: userData.role,
                    id: userData._id
                }
              } else {
                return null;
              }
          }

      }
    })
  ]
})