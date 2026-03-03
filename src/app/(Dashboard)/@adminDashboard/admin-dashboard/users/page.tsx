import UserDeleteBtn from "@/components/modules/Admin/UserDeleteBtn";
import { adminDashboardService } from "@/components/service/adminDashboard.service";
import { DeleteIcon, Edit, Edit2, Edit2Icon } from "lucide-react";
import { MdDelete, MdDeleteForever } from "react-icons/md";

export default async function Allusers() {
    const { data, error } = await adminDashboardService.getAllUsers()

    if (error) {
        return (
            <div className="p-6 text-center">
                <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-4">
                    <h3 className="font-bold">Error Loading Users</h3>
                    <p className="text-sm">{error}</p>
                </div>
            </div>
        );
    }

    if (!data || data.length === 0) {
        return (
            <div className="p-6 text-center text-gray-500">
                No users found.
            </div>
        );
    }
    return (
        <div>
            {
                data?.map((user: { id: string; name: string; email: string; role: string }) => (
                    <div key={user.id} className="p-4 border rounded mb-2">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-lg font-semibold">{user.name}</h3>
                                <p className="text-sm ">{user.email}</p>
                            </div>
                            <div className="flex items-center space-x-4">
                                <span className={`w-20 text-center px-2 py-1 rounded-4xl text-sm ${user.role === 'ADMIN' && 'bg-blue-800'} ${user.role === 'STUDENT' && 'bg-green-800'} ${user.role === 'TUTOR' && 'bg-yellow-800'}`}>
                                    {user.role}
                                </span>
                                {
                                    user.role !== "ADMIN" && <div className="flex items-center space-x-2">
                                        <Edit className="hover:text-blue-500 cursor-pointer transition duration-300" />
                                        <UserDeleteBtn userId={user.id} />
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    );
}