import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Define public routes
const isPublicRoute = createRouteMatcher([
  "/",
  "/creation",
  "/sign-in(.*)", 
  "/sign-up(.*)"
]);

export default clerkMiddleware((auth, req) => {
  // Allow access to public routes
  if (!isPublicRoute(req)) {
    auth().protect();
  }


  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
