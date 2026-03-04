"use server"

import { userService } from "@/components/service/user.service"

export const studentProfileAction = async (name: string, image: string) => {
    return await userService.updateStudentProfile(name, image)
}