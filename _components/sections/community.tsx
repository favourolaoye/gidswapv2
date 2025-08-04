import React from 'react'
import { FaFacebookF, FaTelegramPlane } from 'react-icons/fa';
import { AiOutlineDiscord } from "react-icons/ai"
import { BsTwitterX } from "react-icons/bs";
import Link from 'next/link';
export default function Community() {
    return (
        <div className="flex justify-center mb-10">
            <div className="border border-gray-400 rounded-xl w-[90%] flex justify-center p-3 md:w-[80%] dark:border dark:border-gray-600">
                <div className=" flex flex-col space-y-20  rounded-xl p-3">
                    <h3 className='flex flex-col gap-1 text-5xl font-semibold text-center'>
                        <span className="text-3xl text-gray-600 dark:text-white/80 sm:text-[2.5rem] md:text-[3.5rem] lg:text-[4rem]">
                            Join & Connect {" "}
                        </span>
                        <span className="text-[2rem] font-bold sm:text-[3.25rem] md:text-[4rem]">
                            with our Global Community
                        </span>
                    </h3>

                    <div className="flex justify-around">
                        <Link href="https://www.x.com/gidswap_">
                            <div className="w-[3.5rem] h-[3.5rem] rounded-[50%] bg-blue-400/90 flex items-center justify-center">
                                <BsTwitterX size={30} />
                            </div>
                        </Link>
                        <Link href="https://www.facebook.com/gidswap">
                            <div className="w-[3.5rem] h-[3.5rem] rounded-[50%] bg-blue-400/90 flex items-center justify-center">
                                <FaFacebookF size={30} />
                            </div></Link>
                        <Link href="https://www.instagram.com/gidswap">
                            <div className="w-[3.5rem] h-[3.5rem] rounded-[50%] bg-blue-400/90 flex items-center justify-center">
                                <AiOutlineDiscord size={30} />
                            </div>
                        </Link>
                        <Link href="#">
                            <div className="w-[3.5rem] h-[3.5rem] rounded-[50%] bg-blue-400/90 flex items-center justify-center">
                                <FaTelegramPlane size={30} />
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
