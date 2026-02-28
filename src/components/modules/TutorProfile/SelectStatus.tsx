import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export enum BookingStatus {
    PENDING = "PENDING",
    CONFIRMED = "CONFIRMED",
    COMPLETED = "COMPLETED",
    CANCELLED = "CANCELLED",
}

export function SelectStatus({
    status,
    setStatus,
}: {
    status: string
    setStatus: (status: BookingStatus) => void
}) {
    const BookingStatus = [
        "PENDING",
        "CONFIRMED",
        "CANCELLED",
        "COMPLETED",
    ]
    return (
        <Select onValueChange={(value: BookingStatus) => setStatus(value)} defaultValue={status}>

            <SelectTrigger className="w-full max-w-48">
                <SelectValue placeholder="Select status" />
            </SelectTrigger>

            <SelectContent position="popper">
                <SelectGroup>
                    <SelectLabel>Status</SelectLabel>
                    {
                        BookingStatus.map((status: string, inx) => (
                            <SelectItem key={inx} value={status}>{status}</SelectItem>
                        ))
                    }
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}
