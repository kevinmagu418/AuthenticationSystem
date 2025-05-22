// types/next-auth.d.ts


declare module "next-auth" {
  interface User {
    phoneNumber?: string | null;
  }

  interface Session {
    user: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      phoneNumber?: string | null;
    };
  }
}
