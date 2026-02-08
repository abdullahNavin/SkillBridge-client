import Link from "next/link";
import { HiCheckBadge } from "react-icons/hi2";

export default function HeroSection() {
    return (
        <div className="h-[80vh] flex flex-col items-center justify-center gap-2 px-4 md:px-0 text-center">
            <p className="text-gray-300 text-center py-1 px-2 bg-gray-800 rounded-2xl flex items-center gap-2"><HiCheckBadge className="text-gray-500" /> TRUSTED BY 5000+ STUDENTS</p>

            <h1 className="text-6xl font-bold dark:text-white mt-4 capitalize flex flex-col justify-center items-center gap-3">Bridge the gap between <span><span className="text-gray-500">learning</span> and <span className="text-blue-400">mastery</span></span></h1>

            <div className="flex justify-center items-center">
                <p className="text-gray-400 mt-4 md:w-[70%]">Connect with world-calss tutors and accelerate your professional growth with personallized 1-on-1 session tailored to you career goals. </p>
            </div>

            <div>
                <button className="bg-black text-gray-200 border border-gray-700 font-bold px-6 py-3 rounded-md mt-8 hover:bg-gray-700 transition-colors cursor-pointer">Get Started</button>

                <button className="bg-gray-700 text-white px-6 py-3 rounded-md mt-8 ml-4 hover:bg-gray-600 transition-colors font-bold cursor-pointer"><Link href="/browse-tutors">Browse Tutors</Link></button>
            </div>
        </div>
    );
}