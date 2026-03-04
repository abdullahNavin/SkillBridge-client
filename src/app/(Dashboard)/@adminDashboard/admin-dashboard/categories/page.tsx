"use client"

import { categoryAction, deleteCategoryAction } from "@/actions/category.action";
import { AddCategory } from "@/components/modules/category/AddCategory";
import { EditModal } from "@/components/modules/category/EditModal";
import { Button } from "@/components/ui/button";
import { DialogTrigger } from "@/components/ui/dialog";
import { Edit } from "lucide-react";
import { useEffect, useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { toast } from "sonner";

export default function ManageCategories() {
    const [data, setData] = useState([]);

    useEffect(() => {
        categoryAction()
            .then((res) => res.data)
            .then((data) => {
                setData(data)
            })

    }, []);

    const handleCategoryDelete = async (categoryId: string) => {
        const { data, error } = await deleteCategoryAction(categoryId);
        ;
        if (error) {
            toast.error("Failed to delete category: " + error);
        }
        if (data) {
            toast.success("Category deleted successfully");
            setData((prevData) => prevData.filter((category: { id: string }) => category.id !== categoryId));
        }
    }

    return (
        <div>
            {
                data?.map((category: { id: string; name: string, description: string }) => (
                    <div key={category.id} className="p-4 border rounded mb-2 flex items-center justify-between">
                        <h3 className="text-lg font-semibold">{category.name}</h3>
                        <div className="flex items-center space-x-2 mt-2">
                            <EditModal category={category} />

                            <MdDeleteOutline
                                onClick={() => handleCategoryDelete(category.id)}
                                className="hover:text-red-500 cursor-pointer transition duration-300 text-2xl" />
                        </div>
                    </div>
                ))
            }
            <AddCategory />
        </div>
    );
}