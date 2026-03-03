"use server"

import { adminDashboardService } from "@/components/service/adminDashboard.service";
import { revalidateTag } from "next/cache";

export const deleteUser = async (userId: string) => {

    const res = await adminDashboardService.deleteUser(userId);
    if (res.data) {
        revalidateTag("admin-users", "max");
    }
    return res;
};