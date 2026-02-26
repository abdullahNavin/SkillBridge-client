"use server"

import { ReviewDataType, reviewService } from "@/components/service/review.service"

export const reviewAction = async (ReviewData: ReviewDataType) => {
    return await reviewService.createReview(ReviewData)
}