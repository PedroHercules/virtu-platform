export type LoginResponse = {
  id: string;
  token: string;
  expiresIn: number;
  username: string;
  email: string;
};

export type UserSession = {
  id: string;
  username: string;
  token: string;
  email: string;
  expires: string | number;
};

declare module "next-auth" {
  interface Session {
    user?: UserSession;
  }
}
