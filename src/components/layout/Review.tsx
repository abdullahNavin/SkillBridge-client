"use client"

import { reviewAction } from "@/actions/review.action"
import { BookingType2 } from "@/app/(Dashboard)/@studentDashboard/student-dashboard/page"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldGroup } from "@/components/ui/field"
import { Label } from "@/components/ui/label"
import { Star } from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import { toast } from "sonner"

export function Review({ session }: { session: BookingType2 }) {
    const [open, setOpen] = useState(false)
    const [rating, setRating] = useState(0)
    const [hovered, setHovered] = useState(0)

    const active = hovered || rating

    const handleReview = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (rating === 0) return

        const formData = new FormData(e.currentTarget)

        const reviewData = {
            tutorProfileId: session.tutorProfileId,
            comment: formData.get("review") as string,
            rating,
        }

        // console.log(reviewData)

        const res = await reviewAction(reviewData)

        if (res.error) {
            return toast.error(res.error.message)
        }
        if (res.data) {
            toast.success("Review submitted successfully!")
            setRating(0)
            setHovered(0)

            setOpen(false)
        }

    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">Leave a Review</Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-sm">
                <form onSubmit={handleReview}>
                    <DialogHeader>
                        <DialogTitle>Leave a Review</DialogTitle>
                        <DialogDescription>
                            <div className="flex items-center gap-3 p-2 rounded-xl shadow-sm bg-[#151515]">
                                <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0">
                                    <Image
                                        src={session.tutorImg}
                                        alt={session.tutorName}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-sm font-semibold">
                                        {session.tutorName}
                                    </span>
                                    <span className="text-xs text-gray-400">
                                        {session.tutorQualification}
                                    </span>
                                </div>
                            </div>
                        </DialogDescription>
                    </DialogHeader>

                    <FieldGroup className="mt-4">

                        <Field>
                            <div className="flex flex-col items-center gap-2 py-2">
                                <p className="text-sm font-medium text-gray-700">
                                    How was your session?
                                </p>

                                <div className="flex gap-2">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            key={star}
                                            type="button"
                                            onClick={() => setRating(star)}
                                            onMouseEnter={() => setHovered(star)}
                                            onMouseLeave={() => setHovered(0)}
                                            className="focus:outline-none transition-transform duration-150 hover:scale-125"
                                        >
                                            <Star
                                                size={32}
                                                className={`transition-colors duration-150 ${star <= active
                                                    ? "fill-yellow-500 stroke-yellow-500"
                                                    : "fill-gray-200 stroke-gray-200"
                                                    }`}
                                            />
                                        </button>
                                    ))}
                                </div>

                                <p className="text-xs text-gray-400">
                                    Tap a star to rate your experience
                                </p>
                            </div>
                        </Field>

                        {/* 📝 Written Review */}
                        <Field>
                            <Label htmlFor="review">Written Review</Label>
                            <textarea
                                id="review"
                                name="review"
                                placeholder="Your comment..."
                                rows={3}
                                required
                                className="w-full border rounded-md p-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </Field>

                    </FieldGroup>

                    <DialogFooter className="mt-4">
                        <DialogClose asChild>
                            <Button variant="outline" type="button">
                                Cancel
                            </Button>
                        </DialogClose>

                        <Button type="submit" disabled={rating === 0}>
                            Submit Review
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}