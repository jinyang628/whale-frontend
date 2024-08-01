import Image from "next/image";

export default function LoadingBlur() {
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
              Preparing the ocean for your whale...
            </p>
          </div>
        </div>
    );
}