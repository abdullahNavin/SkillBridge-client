"use server"

import { categoryService } from "@/components/service/category.service"
import { revalidateTag } from "next/cache";

export const categoryAction = async () => {
    return await categoryService.getCategories();
}

export const deleteCategoryAction = async (categoryId: string) => {
    const res = await categoryService.deleteCategory(categoryId);
    if (res.data) {
        revalidateTag("categories","max");
    }
    return res;
}