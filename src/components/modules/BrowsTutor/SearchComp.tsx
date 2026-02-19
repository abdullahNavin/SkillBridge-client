"use client"

import { SelectCategory } from "./SelectCategory";
import { SelectRating } from "./SelectRating";
import { SelectPrice } from "./SelectPrice";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";

interface Category {
    id: string
    name: string
    description: string
}

export default function SearchComp({ categories }: { categories: Category[] }) {

    const [category, setCategory] = useState("")
    const [rating, setRating] = useState("")
    const [price, setPrice] = useState("")
    const [search, setSearch] = useState("")

    const router = useRouter()

    // console.log(category, rating, price, search);
    const query = new URLSearchParams()

    const handleFilter = () => {
        if (category) query.set("category_id", category)
        if (rating) query.set("rating", rating)
        if (price) query.set("price", price)
        if (search) query.set("search", search)

        router.push(`/browse-tutors?${query.toString()}`)
    }

    return (
        <div className=" my-8 dark:bg-[#151515] bg-gray-300">
            <div className="container mx-auto rounded-xl py-4 px-4">
                <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                    <input type="text" className="px-4 py-1.5 rounded-2xl border border-gray-600 outline-none dark:bg-[#151515] dark:text-white mb-6 md:mb-0 w-[60%] md:w-[40%] focus:w-[72%] md:focus:w-[50%] duration-500" placeholder="Search tutors..." value={search} onChange={(e) => setSearch(e.target.value)} />

                    <SelectCategory categories={categories} setCategory={setCategory} />
                    <SelectRating setRating={setRating} />
                    <SelectPrice setPrice={setPrice} />

                    {/* <Button onClick={handleFilter} variant={"outline"} className="px-4 hover:bg-[#151515] dark:hover:bg-gray-700 cursor-pointer py-2 rounded-lg">Search</Button> */}

                    <Button
                        onClick={handleFilter}
                        variant="outline"
                        className="
                            group relative overflow-hidden
                            px-6 py-2.5 rounded-lg
                            border border-zinc-300 dark:border-zinc-600
                            bg-white dark:bg-zinc-900
                            text-zinc-800 dark:text-zinc-100
                            font-medium tracking-wide text-sm
                            shadow-sm
                            transition-all duration-300 ease-out
                            hover:border-zinc-800 dark:hover:border-zinc-300
                            hover:shadow-md hover:-translate-y-0.5
                            active:translate-y-0 active:shadow-sm
                            cursor-pointer"
                    >
                        <span
                            className="
                                    absolute inset-0 -translate-x-full
                                    bg-gradient-to-r from-transparent via-white/20 to-transparent
                                    group-hover:translate-x-full
                                    transition-transform duration-700 ease-in-out
                                    pointer-events-none"
                        />


                        <span className="relative flex items-center gap-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="15"
                                height="15"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="transition-transform duration-300 group-hover:scale-110"
                            >
                                <circle cx="11" cy="11" r="8" />
                                <line x1="21" y1="21" x2="16.65" y2="16.65" />
                            </svg>
                            Search
                        </span>
                    </Button>

                </div>
            </div>
        </div>
    );
}