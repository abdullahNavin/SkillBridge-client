"use server"

import { tutorProfileService } from "@/components/service/tutorProfile.service"

export const getTutorProfileData = async () => {
    return await tutorProfileService.getTutorDashboard()
}

export const createTutorProfile = async (Profiledata: { name: string; userId: string; }) => {
    return await tutorProfileService.createTutorProfile(Profiledata)
}