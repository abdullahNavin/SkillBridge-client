"use server"

import { categoryService } from "@/components/service/category.service"

export const categoryAction = async () => {
    return await categoryService.getCategories();
}