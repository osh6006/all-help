import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/signIn",
    error: "/",
  },
});

export const config = {
  matcher: ["/users/:path*", "/conversations/:path*"],
};
