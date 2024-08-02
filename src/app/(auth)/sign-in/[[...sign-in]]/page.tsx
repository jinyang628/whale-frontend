"use client";
import { SignIn } from "@clerk/nextjs";
import { useTheme } from "next-themes";
import { dark } from "@clerk/themes";

const SignInPage = () => {
  const { resolvedTheme } = useTheme();
  return (
    <SignIn
      signUpUrl="/sign-up"
      appearance={{
        baseTheme: resolvedTheme === "dark" ? dark : undefined,
      }}
    />
  );
};

export default SignInPage;
