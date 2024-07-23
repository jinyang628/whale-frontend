import { SignInButton } from "@clerk/nextjs";
import { SignedOut } from '@clerk/clerk-react';

export default function LoginButton() {
    return (
        <SignedOut>
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-5">
            <div className="bg-white p-4 rounded-lg shadow-lg text-center">
                <SignInButton/>
            </div>
            </div>
        </SignedOut>
    );
}