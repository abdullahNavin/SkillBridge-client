"use server"

import { userService } from "@/components/service/user.service"

export const getSessionAction = async () => {
    return await userService.getSession()
}