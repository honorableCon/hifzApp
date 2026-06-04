import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";

const { auth } = NextAuth({
  providers: [], // on laisse vide ici pour ne pas charger bcrypt dans l'edge runtime
  callbacks: {
    authorized({ request: { nextUrl }, auth }) {
      const isLoggedIn = !!auth?.user;
      const isAuthRoute = nextUrl.pathname.startsWith("/api/auth");
      const isLoginRoute = nextUrl.pathname === "/login" || nextUrl.pathname === "/register";
      const isPublicRoute = ["/", "/community"].includes(nextUrl.pathname);

      if (isAuthRoute) return true;
      if (isLoginRoute) {
        if (isLoggedIn) return Response.redirect(new URL("/dashboard", nextUrl));
        return true;
      }
      
      if (!isLoggedIn && !isPublicRoute) {
        return Response.redirect(new URL("/login", nextUrl));
      }
      
      return true;
    },
  },
});

export default auth;

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
