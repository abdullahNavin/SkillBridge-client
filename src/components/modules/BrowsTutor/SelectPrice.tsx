import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export function SelectPrice({ setPrice }: { setPrice: (price: string) => void }) {
    return (
        <Select onValueChange={(value) => setPrice(value)}>
            <SelectTrigger className="w-[70%] md:max-w-48">
                <SelectValue placeholder="Select a price range" />
            </SelectTrigger>
            <SelectContent position="popper">
                <SelectGroup>
                    <SelectLabel>Price Range</SelectLabel>
                    <SelectItem value="20">Under $20</SelectItem>
                    <SelectItem value="50">$20 - $50</SelectItem>
                    <SelectItem value="100">$50 - $100</SelectItem>
                    <SelectItem value="101">$100+</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}
