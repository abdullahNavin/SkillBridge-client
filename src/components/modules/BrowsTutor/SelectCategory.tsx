"use client"

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export interface Category {
    id: string
    name: string
    description: string
}

export function SelectCategory({ setCategory, categories }: { setCategory: (category: string) => void, categories: Category[] }) {


    const allOption = { id: " ", name: "All Categories", description: "" }
    categories = [allOption, ...categories]


    return (
        <Select onValueChange={(value) => setCategory(value)}>
            <SelectTrigger className="w-[70%] md:max-w-48">
                <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent position="popper">
                <SelectGroup>
                    <SelectLabel>Categories</SelectLabel>
                    {
                        categories.map((category: Category) => (
                            <SelectItem key={category.id} value={category.id}>{category.name}</SelectItem>
                        ))
                    }
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}
