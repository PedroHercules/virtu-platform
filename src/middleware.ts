import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { dashboardRoutes } from "./routes/dashboard";
import { authRoutes } from "./routes/auth";
import { COOKIES } from "./utils/cookies";

function isTokenExpired(expiresIn: number | string | undefined) {
  if (!expiresIn) return true;
  const expirationTime =
    typeof expiresIn === "number" ? expiresIn : parseInt(expiresIn, 10);

  const currentTimestamp = Math.floor(Date.now()) / 1000; // Convert to seconds
  return currentTimestamp >= expirationTime;
}

export async function middleware(request: NextRequest) {
  try {
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });

    // Verificar primeiro se é a página de login
    if (request.nextUrl.pathname === "/auth/login") {
      // Se tiver token válido, redirecionar para dashboard
      if (
        token &&
        token.expiresIn &&
        !isTokenExpired(token.expiresIn as number)
      ) {
        return NextResponse.redirect(
          new URL(dashboardRoutes.dashboard, request.url)
        );
      }
      // Se não tiver token ou token expirado, permite acessar o login
      return NextResponse.next();
    }

    // Para outras rotas protegidas
    if (
      !token ||
      !token.expiresIn ||
      isTokenExpired(token.expiresIn as number)
    ) {
      if (token) {
        // Se tem token mas está expirado, limpar cookies
        const response = NextResponse.redirect(
          new URL(authRoutes.login, request.url)
        );
        response.cookies.delete(COOKIES.SESSION_TOKEN);
        response.cookies.delete(COOKIES.CSRF_TOKEN);
        return response;
      }
      // Se não tem token
      return NextResponse.redirect(new URL(authRoutes.login, request.url));
    }

    // Redirecionar rota raiz para dashboard
    if (request.nextUrl.pathname === "/") {
      return NextResponse.redirect(
        new URL(dashboardRoutes.dashboard, request.url)
      );
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Error in middleware:", error);
    // If there's an error getting the token, redirect to the login page
    return NextResponse.redirect(new URL(authRoutes.login, request.url));
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     * - auth (auth routes)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|auth).*)",
    "/auth/login", // Adicionar matcher específico para a página de login
  ],
};
