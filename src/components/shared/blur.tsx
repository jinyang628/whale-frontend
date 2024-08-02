import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type BlurProps = {
    showAuth?: boolean;
};

export default function Blur({ showAuth }: BlurProps) {
    return (
        <div className="absolute inset-0 flex items-center justify-center bg-white dark:bg-black bg-opacity-90 z-50">
          <div className="text-center">
            <div className="relative w-64 h-64 mx-auto mb-4">
              <Image
                src="/assistant.jpg"
                alt="Loading"
                layout="fill"
                objectFit="contain"
              />
            </div>
            
            <p className="text-lg font-semibold">
              {showAuth ? "It looks like you are enjoying Whale! Please sign in to continue :)" : "Preparing the ocean for your whale..."}
            </p>

            {showAuth && (
              <div className="pt-4">
                <Button asChild>
                  <Link href="/sign-in">Sign In</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
    );
}