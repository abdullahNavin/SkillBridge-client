"use server"

import { categoryService } from "@/components/service/category.service"
import { revalidateTag } from "next/cache";

export const categoryAction = async () => {
    return await categoryService.getCategories();
}

export const deleteCategoryAction = async (categoryId: string) => {
    const res = await categoryService.deleteCategory(categoryId);
    if (res.data) {
        revalidateTag("categories", "max");
    }
    return res;
}

export const updateCategoryAction = async (categoryId: string, name: string, description: string) => {
    const res = await categoryService.updateCategory(categoryId, name, description);
    if (res.data) {
        revalidateTag("categories", "max");
    }
    return res;
}

export const createCategoryAction = async (name: string, description: string) => {
    const res = await categoryService.createCategory(name, description);
    if (res.data) {
        revalidateTag("categories", "max");
    }
    return res;
}