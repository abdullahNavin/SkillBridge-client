import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export function SelectRating({ setRating }: { setRating: (rating: string) => void }) {
    return (
        <Select onValueChange={(value) => setRating(value)}>
            <SelectTrigger className="w-[70%] md:max-w-48">
                <SelectValue placeholder="Select a rating" />
            </SelectTrigger>
            <SelectContent position="popper">
                <SelectGroup>
                    <SelectLabel>Rating</SelectLabel>
                    <SelectItem value=" ">All</SelectItem>
                    <SelectItem value="2.5">2.5</SelectItem>
                    <SelectItem value="3.0">3.0</SelectItem>
                    <SelectItem value="3.5">3.5</SelectItem>
                    <SelectItem value="4.0">4.0</SelectItem>
                    <SelectItem value="4.5">4.5</SelectItem>
                    <SelectItem value="5.0">5.0</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}
