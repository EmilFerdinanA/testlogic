"use client";

import { useState } from "react";

import Image from "next/image";
import Link from "next/link";

import CompanyLogo from "@/assets/company-logo.png";
import Seacrh from "@/assets/search.svg";
import Setting from "@/assets/settings.svg";
import Bell from "@/assets/bell.svg";
import Avatar from "@/assets/Avatar.png";

const Navbar = () => {
  const [isShow, setShow] = useState(false);

  return (
    <section>
      <nav className="flex justify-between items-center px-6 sm:px-10 lg:px-28 py-5 border-b border-ternary z-50 sticky top-0 bg-white">
        <div className="flex items-center gap-7">
          <Link href={"/"}>
            <Image src={CompanyLogo} alt={"company logo"} priority />
          </Link>

          <ul className="hidden gap-4 font-semibold lg:flex">
            <Link href={"/"}>
              <li>Dashboard</li>
            </Link>
            <Link href={"/CRM"}>
              <li>CRM</li>
            </Link>
            <Link href={"/submission"}>
              <li>Submission</li>
            </Link>
            <Link href={"/commission"}>
              <li>Commission</li>
            </Link>
            <Link href={"/LMS"}>
              <li>LMS</li>
            </Link>
          </ul>
        </div>

        <div className="flex gap-4">
          <ul className="hidden lg:flex items-center gap-4">
            <li>
              <Image src={Seacrh} alt={"Seacrh"} />
            </li>
            <li>
              <Image src={Bell} alt={"Bell"} />
            </li>
            <li>
              <Image src={Setting} alt={"Setting"} />
            </li>
          </ul>
          <Image
            onClick={() => setShow((prev) => !prev)}
            src={Avatar}
            alt={"Avatar"}
          />
        </div>
      </nav>

      {isShow && (
        <ul className="lg:hidden absolute top-20 z-50 bg-white h-[80vh] flex flex-col w-full items-center justify-between py-16 rounded-b-3xl border-t border-gray-200 shadow-lg">
          <li className="font-semibold mb-2">
            <Link onClick={() => setShow((prev) => !prev)} href={"/"}>
              Dashboard
            </Link>
          </li>
          <li className="font-semibold mb-2">
            <Link onClick={() => setShow((prev) => !prev)} href={"/CRM"}>
              CRM
            </Link>
          </li>
          <li className="font-semibold mb-2">
            <Link onClick={() => setShow((prev) => !prev)} href={"/submission"}>
              Submission
            </Link>
          </li>
          <li className="font-semibold mb-2">
            <Link onClick={() => setShow((prev) => !prev)} href={"/commission"}>
              Commission
            </Link>
          </li>
          <li className="font-semibold mb-2">
            <Link onClick={() => setShow((prev) => !prev)} href={"/LMS"}>
              LMS
            </Link>
          </li>
        </ul>
      )}
    </section>
  );
};

export default Navbar;
