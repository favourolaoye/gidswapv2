// "use client";

// import React from "react";
// import { AnimatedSection } from "@/src/components/ui/animate-section";
// import Image from "next/image";
// import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";
// import {BsTwitterX} from "react-icons/bs"
// import Link from "next/link";
// import { useTheme } from "next-themes";

// export default function Footer() {
//   const date = new Date().getFullYear();

//   return (
//     <footer className="relative flex flex-col justify-between mx-auto w-full max-w-6xl px-5 py-5 min-h-[200px] bg-blue-900/90 backdrop-blur-sm">
//       <div className="flex justify-between">
//         <div className="w-fit">
//           <Image
//             src="/images/Gidswaplogo.png"
//             width={100}
//             height={100}
//             className="object-contain"
//             priority
//             alt="gidswap logo"
//           />
//         </div>
//         <div className="flex align-center">
//           <div className="flex justify-between gap-5">
//             <Link href="https://www.x.com/gidswap_">
//               <div className="w-[2rem] h-[2rem] rounded-[50%] bg-transparent backdrop-blur-sm flex items-center justify-center">
//                 <BsTwitterX size={20} />
//               </div>
//             </Link>
//             <Link href="https://www.facebook.com/gidswap">
//             <div className="w-[2rem] h-[2rem] rounded-[50%] bg-transparent backdrop-blur-sm flex items-center justify-center">
//               <FaFacebookF size={20} />
//             </div>
//             </Link>
//             <Link href="https://www.instagram.com/gidswap">
//             <div className="w-[2rem] h-[2rem] rounded-[50%] bg-transparent backdrop-blur-sm flex items-center justify-center">
//               <FaInstagram size={20} />
//             </div>
//             </Link>
//             <Link href="https://api.whatsapp.com/send?phone=2349038958941">
//             <div className="w-[2rem] h-[2rem] rounded-[50%] bg-transparent backdrop-blur-sm flex items-center justify-center">
//               <FaWhatsapp size={20} />
//             </div>
//             </Link>
//           </div>
//         </div>
//       </div>
//       <div className="border-t-2 border-gray-400 py-3">
//         <p className="text-gray-400">Copyright &copy;{date} - All rights reserved</p>
//       </div>
//     </footer>
//   );
// }

"use client";

import React from "react";
import Image from "next/image";
import { Instagram, Linkedin, Moon, Sun, Twitter } from "lucide-react";
import { useTheme } from "next-themes";
import { MdOutlineEmail } from "react-icons/md";

import { FaInstagram, FaTiktok, FaWhatsapp } from "react-icons/fa";
import Link from "next/link";
export default function Footer() {
  const date = new Date().getFullYear();
  function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    return (
      <div className="hidden sm:flex h-11 items-center justify-between gap-2 rounded-full bg-gray-100 dark:bg-neutral-800 p-1 transition-all w-full">
        <button
          onClick={() => setTheme("system")}
          className={`flex cursor-pointer items-center justify-center rounded-full transition-colors h-9 px-4 ${
            theme === "system" ? "bg-white dark:bg-neutral-700" : ""
          }`}
          title="Switch to auto mode"
        >
          <span className="text-sm font-medium text-gray-400 dark:text-white/50">
            Auto
          </span>
        </button>
        <button
          onClick={() => setTheme("light")}
          className={`flex cursor-pointer items-center justify-center rounded-full transition-colors h-9 w-9 ${
            theme === "light" ? "bg-white dark:bg-neutral-700" : ""
          }`}
          title="Switch to light mode"
        >
          <Sun className="size-5 text-gray-400 dark:text-white/50" />
        </button>
        <button
          onClick={() => setTheme("dark")}
          className={`flex cursor-pointer items-center justify-center rounded-full transition-colors h-9 w-9 ${
            theme === "dark" ? "bg-white dark:bg-neutral-700" : ""
          }`}
          title="Switch to dark mode"
        >
          <Moon className="size-5 text-gray-400 dark:text-white/50" />
        </button>
      </div>
    );
  }

  return (
    // <footer className="relative flex flex-col justify-between mx-auto w-full max-w-6xl px-5 py-5 min-h-[200px] bg-blue-900/90 backdrop-blur-sm">
    <footer className="relative flex flex-col justify-between mx-auto w-full px-5 py-5 min-h-[200px] bg-blue-900/90 backdrop-blur-sm">
      <div className="relative flex flex-col justify-between mx-auto w-full max-w-6xl">
        <div className="flex justify-between">
          <div className="w-fit">
            <Image
              src="/images/gidsfull.png"
              width={100}
              height={100}
              className="object-contain"
              priority
              alt="gidswap logo"
            />
          </div>
          <div className="flex align-center">
            <div className="flex justify-between gap-5">
              <Link href="https://www.tiktok.com/gidswap_">
                <div className="w-[2rem] h-[2rem] rounded-[50%] bg-transparent backdrop-blur-sm flex items-center justify-center">
                  <FaTiktok size={20} />
                </div>
              </Link>
              <Link href="mailto:support@gidswap.com">
                <div className="w-[2rem] h-[2rem] rounded-[50%] bg-transparent backdrop-blur-sm flex items-center justify-center">
                  <MdOutlineEmail size={25} />
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
      </div>

      <p className="absolute bottom-8 text-xs font-medium">
        <span className="text-gray-500 dark:text-white/50">
          © {date} All rights reserved
        </span>{" "}
        <a
          href="https://paycrest.io"
          target="_blank"
          rel="noopener noreferrer"
          className="text-neutral-900 hover:underline dark:text-white/80"
        >
          Gidswap
        </a>
      </p>
    </footer>
  );
}
