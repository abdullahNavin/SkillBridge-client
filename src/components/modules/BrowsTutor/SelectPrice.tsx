import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export function SelectPrice() {
    return (
        <Select>
            <SelectTrigger className="w-[70%] md:max-w-48">
                <SelectValue placeholder="Select a price range" />
            </SelectTrigger>
            <SelectContent position="popper">
                <SelectGroup>
                    <SelectLabel>Price Range</SelectLabel>
                    <SelectItem value="apple">Under $20</SelectItem>
                    <SelectItem value="banana">$20 - $50</SelectItem>
                    <SelectItem value="blueberry">$50 - $100</SelectItem>
                    <SelectItem value="grapes">$100+</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}
