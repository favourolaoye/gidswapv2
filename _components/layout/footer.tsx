"use client";

import React from "react";
import { AnimatedSection } from "@/src/components/ui/animate-section";
import Image from "next/image";
import { FaFacebookF, FaInstagram, FaTelegramPlane } from "react-icons/fa";
import {BsTwitterX} from "react-icons/bs"
import Link from "next/link";
import { useTheme } from "next-themes";

export default function Footer() {
  const date = new Date().getFullYear();


  return (
    <footer className="relative flex flex-col justify-between mx-auto w-full max-w-6xl px-5 py-5 min-h-[200px] bg-blue-900/90 backdrop-blur-sm">
      <div className="flex justify-between">
        <div className="w-fit">
          <Image
            src="/images/Gidswaplogo.png"
            width={100}
            height={100}
            className="object-contain"
            priority
            alt="gidswap logo"
          />
        </div>
        <div className="flex align-center">
          <div className="flex justify-between gap-5">
            <Link href="https://www.x.com/gidswap_">
              <div className="w-[2rem] h-[2rem] rounded-[50%] bg-transparent backdrop-blur-sm flex items-center justify-center">
                <BsTwitterX size={20} />
              </div>
            </Link>
            <Link href="https://www.facebook.com/gidswap">
            <div className="w-[2rem] h-[2rem] rounded-[50%] bg-transparent backdrop-blur-sm flex items-center justify-center">
              <FaFacebookF size={20} />
            </div>
            </Link>
            <Link href="https://www.instagram.com/gidswap">
            <div className="w-[2rem] h-[2rem] rounded-[50%] bg-transparent backdrop-blur-sm flex items-center justify-center">
              <FaInstagram size={20} />
            </div>
            </Link>
            <Link href="https://api.whatsapp.com/send?phone=2349038958941">
            <div className="w-[2rem] h-[2rem] rounded-[50%] bg-transparent backdrop-blur-sm flex items-center justify-center">
              <FaWhatsapp size={20} />
            </div>
            </Link>
          </div>
        </div>
      </div>
      <div className="border-t-2 border-gray-400 py-3">
        <p className="text-gray-400">Copyright &copy;{date} - All rights reserved</p>
      </div>
    </footer>
  );
}
