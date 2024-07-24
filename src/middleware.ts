import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Define public routes
const isPublicRoute = createRouteMatcher([
  "/sign-in(.*)",
  "/sign-up(.*)",
]);

export default clerkMiddleware((auth, req) => {
//   const { pathname } = req.nextUrl;
  // Allow access to public routes
  if (!isPublicRoute(req)) {
    auth().protect();
  }

//   if (pathname === "/") {
//     return NextResponse.redirect(new URL("/home", req.url));
//   }
//   return NextResponse.next();
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
