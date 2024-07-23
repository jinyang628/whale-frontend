import { SignInButton } from "@clerk/nextjs";
import { SignedOut } from '@clerk/clerk-react';

export default function LoginButton() {
    return (
        <SignedOut>
            <div className="fixed inset-0 flex items-center justify-center z-5">
                <div>
                    <h1 className="scroll-m-20 border-b pb-[10%] text-5xl font-semibold tracking-tight first:mt-0">
                        Welcome to Whale
                    </h1>
                    <div className="p-4 rounded-lg shadow-lg text-center border-8">
                        <SignInButton/>
                    </div>
                </div>
            </div>
        </SignedOut>
    );
}