import TutorProfileEditForm from "@/components/modules/TutorProfile/TutorProfile";
import { categoryService } from "@/components/service/category.service";
import { tutorProfileService } from "@/components/service/tutorProfile.service";


export default async function TutorProfilePage() {
    const res = await tutorProfileService.getTutorDashboard()

    if (res.error) {
        return <div className="text-red-500">{res.error}</div>
    }

    if (res.data?.message) {
        return <div className="text-yellow-500">{res.data?.message}</div>
    }

    const category = await categoryService.getCategories()

    return (
        <div>
            <TutorProfileEditForm categories={category.data} tutorData={res.data} />
        </div>
    );
}