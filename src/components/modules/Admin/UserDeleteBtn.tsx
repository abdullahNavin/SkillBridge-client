"use client"

import { deleteUser } from "@/actions/admin.action";
import { MdDelete } from "react-icons/md";
import { toast } from "sonner";

export default function UserDeleteBtn({ userId }: { userId: string }) {
    const handleUserDelete = async (userId: string) => {
        const res = await deleteUser(userId)
        if (res.error) {
            toast.error("Failed to delete user: " + res.error);
        }
        if (res.data) {
            toast.success("User deleted successfully");
        }
    }
    return (
        <div>
            <MdDelete onClick={() => handleUserDelete(userId)} className="hover:text-red-500 text-2xl transition duration-300 cursor-pointer" />
        </div>
    );
}