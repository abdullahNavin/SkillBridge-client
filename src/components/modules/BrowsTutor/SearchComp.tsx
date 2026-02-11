import { SelectCategory } from "./SelectCategory";
import { SelectRating } from "./SelectRating";
import { SelectPrice } from "./SelectPrice";

export default function SearchComp() {
    return (
        <div className=" my-8 dark:bg-[#151515] bg-gray-300">
            <div className="container mx-auto rounded-xl py-4 px-4">
                <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                    <input type="text" className="px-4 py-1.5 rounded-2xl border border-gray-600 outline-none dark:bg-[#151515] dark:text-white mb-6 md:mb-0 w-[70%] md:w-[40%] focus:w-[72%] md:focus:w-[50%] duration-500" placeholder="Search tutors..." />

                    <SelectCategory />
                    <SelectRating />
                    <SelectPrice />
                </div>
            </div>
        </div>
    );
}