import { categoryService } from "@/components/service/category.service"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

interface Category {
    id: string
    name: string
    description: string
}

export async function SelectCategory({ setCategory }: { setCategory: (category: string) => void }) {
    const categories = await categoryService.getCategories()
    // console.log(categories);
    return (
        <Select onValueChange={(value) => setCategory(value)}>
            <SelectTrigger className="w-[70%] md:max-w-48">
                <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent position="popper">
                <SelectGroup>
                    <SelectLabel>Categories</SelectLabel>
                    {
                        categories.data?.map((category: Category) => (
                            <SelectItem key={category.id} value={category.name}>{category.name}</SelectItem>
                        ))
                    }
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}
