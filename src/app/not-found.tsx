"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import ArrowLeft from "@/assets/arrow-left.svg";

export default function NotFound() {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  return (
    <section className="mx-6 sm:mx-10 lg:mx-28 flex flex-col gap-3 h-[100vh] justify-center">
      <h3 className="text-primary2 font-semibold">404 error</h3>
      <h2 className="text-5xl sm:text-6xl text-gray/900 font-semibold mb-3">
        We can’t find that page
      </h2>
      <p className="text-gray/600 text-xl mb-9">
        Sorry, the page you are looking for doesn`t exist or has been moved.
      </p>
      <div className="flex gap-3">
        <button
          onClick={handleGoBack}
          className="flex gap-3 px-7 text-lg font-semibold py-4 text-gray-700 border border-grey-300 rounded-lg shadow-sm items-center"
        >
          <span>
            <Image src={ArrowLeft} alt={"ArrowLeft"} />
          </span>
          Go Back
        </button>
        <Link
          href={"/"}
          className="px-3 sm:px-7 py-4 text-lg text-white border font-semibold border-primary2 bg-primary2 rounded-lg shadow-sm text-center"
        >
          Take me home
        </Link>
      </div>
    </section>
  );
}
