"use server"

import { PayloadType } from "@/components/modules/TutorProfile/TutorProfile"
import { tutorProfileService } from "@/components/service/tutorProfile.service"

export const updateTutorProfile = async (profileData: PayloadType) => {
    return await tutorProfileService.updateTutorProfile(profileData)
}